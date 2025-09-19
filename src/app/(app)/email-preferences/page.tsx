"use client";

import { useCurrentUser } from "@/app/hooks/use-current-user";
import { updateUserProfile } from "@/app/actions/users";
import Header from "@/components/molecules/Header";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

export default function EmailPreferencesPage() {
  const router = useRouter();
  const { data, isSuccess, refetch } = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handlePreferenceChange = async (preference: string, value: boolean) => {
    if (!data?.user) return;

    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const currentPreferences = data.user.emailNotifications || {};
      const updatedPreferences = {
        ...currentPreferences,
        [preference]: value,
      };

      const formData = new FormData();
      formData.append("emailNotifications", JSON.stringify(updatedPreferences));

      const result = await updateUserProfile(formData);
      
      if (result.success) {
        setMessage("Email preferences updated successfully!");
        refetch();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(result.error || "Failed to update preferences");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSuccess || !data?.user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ProfileSkeleton />
      </div>
    );
  }

  const user = data.user;
  const emailPreferences = user.emailNotifications || {
    profileLikes: true,
    eventReminders: true,
    roundTableInvites: true,
    newsletter: false,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={handleBack}
        title="Email Preferences"
      />

      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-main-600 font-ariom mb-2">
              Email Notifications
            </h1>
            <p className="text-main-600/70 font-chivo">
              Choose which email notifications you'd like to receive from GEN.
            </p>
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Likes */}
            <div className="bg-white border border-main-600 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-500"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-ariom font-bold text-main-600">Profile Likes</h3>
                      <p className="text-sm text-main-600/70 font-chivo">
                        Get notified when someone likes your profile
                      </p>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.profileLikes}
                    onChange={(e) => handlePreferenceChange("profileLikes", e.target.checked)}
                    disabled={isSubmitting}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Event Reminders */}
            <div className="bg-white border border-main-600 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-500"
                      >
                        <path
                          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-ariom font-bold text-main-600">Event Reminders</h3>
                      <p className="text-sm text-main-600/70 font-chivo">
                        Get reminded about upcoming events and activities
                      </p>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.eventReminders}
                    onChange={(e) => handlePreferenceChange("eventReminders", e.target.checked)}
                    disabled={isSubmitting}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Round Table Invites */}
            <div className="bg-white border border-main-600 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-green-500"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-ariom font-bold text-main-600">Round Table Invites</h3>
                      <p className="text-sm text-main-600/70 font-chivo">
                        Get notified when you're invited to round table discussions
                      </p>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.roundTableInvites}
                    onChange={(e) => handlePreferenceChange("roundTableInvites", e.target.checked)}
                    disabled={isSubmitting}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white border border-main-600 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-purple-500"
                      >
                        <path
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-ariom font-bold text-main-600">Newsletter</h3>
                      <p className="text-sm text-main-600/70 font-chivo">
                        Receive our newsletter with updates, tips, and community highlights
                      </p>
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailPreferences.newsletter}
                    onChange={(e) => handlePreferenceChange("newsletter", e.target.checked)}
                    disabled={isSubmitting}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-main/5 rounded-2xl">
            <p className="text-sm text-main-600/70 font-chivo text-center">
              You can change these preferences at any time. Some important account-related emails 
              (like security notifications) cannot be disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
