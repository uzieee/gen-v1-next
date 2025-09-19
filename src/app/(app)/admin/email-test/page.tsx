"use client";

import { useCurrentUser } from "@/app/hooks/use-current-user";
import Header from "@/components/molecules/Header";
import TextField from "@/components/molecules/TextField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

export default function EmailTestPage() {
  const router = useRouter();
  const { data, isSuccess } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [emailType, setEmailType] = useState("test");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setResult({ success: false, error: "Please enter an email address" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: emailType,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: "Failed to send test email" });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is admin
  if (!isSuccess || !data?.user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ProfileSkeleton />
      </div>
    );
  }

  if (data.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-main-600 mb-4">Access Denied</h1>
          <p className="text-main-600/70">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={handleBack}
        title="Email Test"
      />

      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-main-600 font-ariom mb-2">
              Email System Test
            </h1>
            <p className="text-main-600/70 font-chivo">
              Test the email notification system by sending sample emails.
            </p>
          </div>

          <form onSubmit={handleSendTestEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-main-300 mb-2">
                Email Address
              </label>
              <TextField
                type="email"
                placeholder="Enter email address to test"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-main-300 mb-2">
                Email Type
              </label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full px-4 py-3 border border-main-600 rounded-2xl bg-transparent text-main-600 font-ariom focus:border-primary focus:outline-none"
              >
                <option value="test">Test Email</option>
                <option value="profile-like">Profile Like Notification</option>
                <option value="password-reset">Password Reset</option>
                <option value="promotional">Promotional Email</option>
              </select>
            </div>

            {result && (
              <div className={`border rounded-lg p-4 ${
                result.success 
                  ? "bg-green-50 border-green-200" 
                  : "bg-red-50 border-red-200"
              }`}>
                <p className={`text-sm ${
                  result.success ? "text-green-600" : "text-red-600"
                }`}>
                  {result.success ? result.message : result.error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-main-600 py-3 px-6 rounded-2xl font-bold font-ariom hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Test Email"}
            </button>
          </form>

          <div className="mt-8 p-4 bg-main/5 rounded-2xl">
            <h3 className="font-ariom font-bold text-main-600 mb-2">Email Types</h3>
            <div className="space-y-2 text-sm text-main-600/70 font-chivo">
              <p><strong>Test Email:</strong> Simple welcome email to test basic functionality</p>
              <p><strong>Profile Like:</strong> Beautiful notification when someone likes your profile</p>
              <p><strong>Password Reset:</strong> Secure password reset email with branded design</p>
              <p><strong>Promotional:</strong> Stunning welcome email with features, stats, and CTAs</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
            <h3 className="font-ariom font-bold text-yellow-800 mb-2">Setup Required</h3>
            <div className="text-sm text-yellow-700 font-chivo space-y-1">
              <p>1. Get your Resend API key from <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline">resend.com</a></p>
              <p>2. Add <code className="bg-yellow-100 px-1 rounded">RESEND_API_KEY=your_key_here</code> to your .env file</p>
              <p>3. Verify your domain in Resend dashboard</p>
              <p>4. Test the email system using this page</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
