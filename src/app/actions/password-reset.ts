"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { EmailService } from "@/lib/email";
import crypto from "crypto";

/* ---------- Password Reset Actions ---------- */
export async function requestPasswordResetAction(email: string) {
  try {
    const payload = await getPayload({ config });

    // Find user by email
    const { docs: users } = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (users.length === 0) {
      // Don't reveal if email exists or not for security
      return { success: true, message: "If an account with that email exists, a password reset link has been sent." };
    }

    const user = users[0];

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Invalidate any existing reset tokens for this user
    await payload.update({
      collection: "password-reset-tokens",
      where: { 
        user: { equals: user.id },
        used: { equals: false }
      },
      data: { used: true, usedAt: new Date() },
    });

    // Create new reset token
    await payload.create({
      collection: "password-reset-tokens",
      data: {
        user: user.id,
        token: resetToken,
        expiresAt,
        used: false,
      },
    });

    // Send password reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/reset-password?token=${resetToken}`;
    
    const emailResult = await EmailService.sendPasswordResetEmail(
      {
        email: user.email,
        name: user.fullName || "User",
      },
      {
        recipientName: user.fullName || "User",
        resetUrl,
        expiresIn: "24 hours",
      }
    );

    if (!emailResult.success) {
      console.error("Failed to send password reset email:", emailResult.error);
      return { success: false, error: "Failed to send password reset email" };
    }

    return { success: true, message: "Password reset link has been sent to your email." };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again." 
    };
  }
}

export async function resetPasswordAction(token: string, newPassword: string) {
  try {
    const payload = await getPayload({ config });

    // Find valid reset token
    const { docs: tokens } = await payload.find({
      collection: "password-reset-tokens",
      where: { 
        token: { equals: token },
        used: { equals: false },
        expiresAt: { greater_than: new Date() }
      },
      limit: 1,
    });

    if (tokens.length === 0) {
      return { success: false, error: "Invalid or expired reset token." };
    }

    const resetToken = tokens[0];

    // Update user password
    await payload.update({
      collection: "users",
      id: resetToken.user,
      data: { password: newPassword },
    });

    // Mark token as used
    await payload.update({
      collection: "password-reset-tokens",
      id: resetToken.id,
      data: { 
        used: true, 
        usedAt: new Date() 
      },
    });

    return { success: true, message: "Password has been reset successfully." };
  } catch (error) {
    console.error("Password reset error:", error);
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again." 
    };
  }
}

export async function validateResetTokenAction(token: string) {
  try {
    const payload = await getPayload({ config });

    // Find valid reset token
    const { docs: tokens } = await payload.find({
      collection: "password-reset-tokens",
      where: { 
        token: { equals: token },
        used: { equals: false },
        expiresAt: { greater_than: new Date() }
      },
      limit: 1,
    });

    if (tokens.length === 0) {
      return { success: false, error: "Invalid or expired reset token." };
    }

    return { success: true, message: "Token is valid." };
  } catch (error) {
    console.error("Token validation error:", error);
    return { 
      success: false, 
      error: "An unexpected error occurred." 
    };
  }
}
