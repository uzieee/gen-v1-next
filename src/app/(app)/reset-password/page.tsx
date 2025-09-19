"use client";

import { requestPasswordResetAction, resetPasswordAction, validateResetTokenAction } from "@/app/actions/password-reset";
import Header from "@/components/molecules/Header";
import TextField from "@/components/molecules/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Check if we have a token in URL (user clicked reset link)
  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  const validateToken = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const result = await validateResetTokenAction(token);
      if (result.success) {
        setStep("reset");
      } else {
        setError(result.error || "Invalid reset token");
      }
    } catch (err) {
      setError("Failed to validate reset token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await requestPasswordResetAction(email);
      if (result.success) {
        setMessage(result.message || "Password reset link sent!");
        setStep("success");
      } else {
        setError(result.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await resetPasswordAction(token, newPassword);
      if (result.success) {
        setMessage(result.message || "Password reset successfully!");
        setStep("success");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/onboarding/signin");
        }, 3000);
      } else {
        setError(result.error || "Failed to reset password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={handleBack}
        title={step === "request" ? "Reset Password" : "Set New Password"}
      />

      <div className="px-6 py-8">
        {step === "request" && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-main-600 font-ariom mb-2">
                Forgot your password?
              </h1>
              <p className="text-main-600/70 font-chivo">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleRequestReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-main-300 mb-2">
                  Email Address
                </label>
                <TextField
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-600 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-main-600 py-3 px-6 rounded-2xl font-bold font-ariom hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        )}

        {step === "reset" && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-main-600 font-ariom mb-2">
                Set New Password
              </h1>
              <p className="text-main-600/70 font-chivo">
                Enter your new password below. Make sure it's secure and easy to remember.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-main-300 mb-2">
                  New Password
                </label>
                <TextField
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-main-300 mb-2">
                  Confirm Password
                </label>
                <TextField
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-600 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-main-600 py-3 px-6 rounded-2xl font-bold font-ariom hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600"
              >
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-main-600 font-ariom mb-2">
              {token ? "Password Reset!" : "Check Your Email"}
            </h1>
            <p className="text-main-600/70 font-chivo mb-8">
              {token 
                ? "Your password has been successfully reset. You'll be redirected to sign in shortly."
                : "We've sent a password reset link to your email address. Please check your inbox and follow the instructions."
              }
            </p>
            
            {!token && (
              <button
                onClick={() => router.push("/onboarding/signin")}
                className="bg-primary text-main-600 py-3 px-6 rounded-2xl font-bold font-ariom hover:bg-primary/90 transition-colors"
              >
                Back to Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
