"use server";

import jwt from "jsonwebtoken";
import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { JWT_SECRET } from "@/lib/jwt-secret";
import { readAuthToken } from "@/lib/read-auth-token";
import { setAuthCookie } from "@/lib/set-auth-cookie";

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
