"use server";

import jwt from "jsonwebtoken";
import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { JWT_SECRET } from "@/lib/jwt-secret";
import { readAuthToken } from "@/lib/read-auth-token";
import { setAuthCookie } from "@/lib/set-auth-cookie";
import { EmailService } from "@/lib/email";

/* ---------- Like/Unlike Actions ---------- */
export async function toggleLikeProfileAction(profileId: string) {
  try {
    const payload = await getPayload({ config });

    const token = await readAuthToken();
    if (!token) throw new Error("Unauthenticated");

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      userId = decoded.id;
    } catch (error) {
      throw new Error("Invalid token");
    }

    // Get current user to check existing likes
    const currentUser = await payload.findByID({
      collection: "users",
      id: userId,
      depth: 0,
    });

    const currentLikes = (currentUser.likedProfiles as string[]) || [];
    const isLiked = currentLikes.includes(profileId);

    let updatedLikes: string[];
    if (isLiked) {
      // Unlike: remove the profile ID
      updatedLikes = currentLikes.filter(id => id !== profileId);
    } else {
      // Like: add the profile ID
      updatedLikes = [...currentLikes, profileId];
    }

    // Update user's liked profiles
    const updated = await payload.update({
      collection: "users",
      id: userId,
      data: {
        likedProfiles: updatedLikes,
      },
    });

    // If this is a new like (not an unlike), create a notification for the liked user
    if (!isLiked) {
      try {
        // Get the current user's info for the notification
        const currentUser = await payload.findByID({
          collection: "users",
          id: userId,
          depth: 0,
        });

        // Create notification for the liked user
        await payload.create({
          collection: "notifications",
          data: {
            user: profileId,
            type: "profile_like",
            title: "Someone liked your profile! ❤️",
            message: `${currentUser.fullName || "Someone"} liked your profile. Check out their profile too!`,
            fromUser: userId,
            isRead: false,
            actionUrl: `/profile/${userId}`,
            metadata: {
              likedBy: currentUser.fullName || "Unknown",
              likedByImage: currentUser.profileImage || null,
            },
          },
        });

        // Send email notification to the liked user
        try {
          const likedUser = await payload.findByID({
            collection: "users",
            id: profileId,
            depth: 0,
          });

          // Check if user has email notifications enabled for profile likes
          const emailNotificationsEnabled = likedUser.emailNotifications?.profileLikes !== false; // Default to true

          if (emailNotificationsEnabled && likedUser.email) {
            await EmailService.sendProfileLikeNotification(
              {
                email: likedUser.email,
                name: likedUser.fullName || "User",
              },
              {
                recipientName: likedUser.fullName || "User",
                likerName: currentUser.fullName || "Someone",
                likerProfileImage: currentUser.profileImage || undefined,
                profileUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/profile`,
                likerProfileUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/profile/${userId}`,
              }
            );
          }
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
          // Don't fail the like action if email fails
        }
      } catch (notificationError) {
        console.error("Failed to create like notification:", notificationError);
        // Don't fail the like action if notification creation fails
      }
    }

    await setAuthCookie(updated.id);

    return { 
      success: true, 
      isLiked: !isLiked,
      user: updated 
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
