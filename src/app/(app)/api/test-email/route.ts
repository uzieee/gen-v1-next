import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email";
import { readAuthToken } from "@/lib/read-auth-token";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/jwt-secret";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const token = await readAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      userId = decoded.id;
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { email, type } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let result;

    switch (type) {
      case "test":
        result = await EmailService.sendTestEmail({
          email,
          name: "Test User",
        });
        break;

      case "profile-like":
        result = await EmailService.sendProfileLikeNotification(
          {
            email,
            name: "Test User",
          },
          {
            recipientName: "Test User",
            likerName: "John Doe",
            likerProfileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            profileUrl: "http://localhost:3030/profile",
            likerProfileUrl: "http://localhost:3030/profile/test-user",
          }
        );
        break;

      case "password-reset":
        result = await EmailService.sendPasswordResetEmail(
          {
            email,
            name: "Test User",
          },
          {
            recipientName: "Test User",
            resetUrl: "http://localhost:3030/reset-password?token=test-token",
            expiresIn: "24 hours",
          }
        );
        break;

      case "promotional":
        result = await EmailService.sendPromotionalEmail(
          {
            email,
            name: "Test User",
          },
          {
            recipientName: "Test User",
            communityStats: {
              totalUsers: 2500,
              eventsThisMonth: 15,
              connectionsMade: 1200,
            },
            newFeatures: [
              "AI-powered profile matching",
              "Exclusive networking events",
              "Round table discussions",
              "Verified professional profiles"
            ],
          }
        );
        break;

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `${type} email sent successfully to ${email}` 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 }
    );
  }
}
