"use client";

import React, { useState } from "react";
import { updateSocialLinksAction } from "@/app/actions/users";

interface SocialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "instagram" | "website" | "email";
  currentValue?: string;
  onSuccess?: () => void;
}

export default function SocialLinkModal({
  isOpen,
  onClose,
  type,
  currentValue = "",
  onSuccess,
}: SocialLinkModalProps) {
  const [localValue, setLocalValue] = useState(currentValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setLocalValue(currentValue);
  }, [currentValue, isOpen]);

  const getTitle = () => {
    switch (type) {
      case "instagram":
        return "Add Instagram Handle";
      case "website":
        return "Add Website";
      case "email":
        return "Add Public Email";
      default:
        return "Add Social Link";
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "instagram":
        return "Enter your Instagram username (without @)";
      case "website":
        return "https://yourwebsite.com";
      case "email":
        return "your.email@example.com";
      default:
        return "Enter your information";
    }
  };

  const getFieldName = () => {
    switch (type) {
      case "instagram":
        return "instagramHandle";
      case "website":
        return "website";
      case "email":
        return "publicEmail";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a new FormData with just the field we need
      const newFormData = new FormData();
      newFormData.append(getFieldName(), localValue);
      
      // Call the server action directly
      const result = await updateSocialLinksAction(newFormData);
      
      if (result.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(result.error || "Failed to update social link");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-background border border-main-600 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
        <h2 className="text-xl font-bold text-main-600 font-ariom mb-4">
          {getTitle()}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-main-300 mb-2">
              {type === "instagram" ? "Instagram Handle" : 
               type === "website" ? "Website URL" : "Email Address"}
            </label>
            <input
              type={type === "website" ? "url" : type === "email" ? "email" : "text"}
              name={getFieldName()}
              placeholder={getPlaceholder()}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="w-full px-4 py-3 border border-main-600 rounded-2xl bg-transparent text-main-600 font-ariom focus:border-primary focus:outline-none"
              required={false}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-main-600 text-main-600 rounded-lg hover:bg-main-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!localValue || isSubmitting}
              className="flex-1 px-4 py-2 bg-primary text-main-600 rounded-lg font-bold font-ariom hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
