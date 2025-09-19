"use client";

import { useCurrentUser } from "@/app/hooks/use-current-user";
import { updateUserProfile } from "@/app/actions/users";
import { updateUserImagesAction } from "@/app/actions/user-images";
import Header from "@/components/molecules/Header";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import TextField from "@/components/molecules/TextField";
import TextArea from "@/components/molecules/TextArea";
import SelectField from "@/components/molecules/SelectField";
import PhotoSlot from "@/components/atoms/PhotoSlot";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function EditProfile() {
  const router = useRouter();
  const { data, isSuccess } = useCurrentUser(2);
  
  const [photos, setPhotos] = useState<{
    main: File | null;
    photo1: File | null;
    photo2: File | null;
    photo3: File | null;
  }>({
    main: null,
    photo1: null,
    photo2: null,
    photo3: null,
  });

  const [photoUrls, setPhotoUrls] = useState<{
    main: string | null;
    photo1: string | null;
    photo2: string | null;
    photo3: string | null;
  }>({
    main: null,
    photo1: null,
    photo2: null,
    photo3: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing user data
  useEffect(() => {
    if (data?.user) {
      const { profileImage, galleryImages } = data.user;
      setPhotoUrls({
        main: profileImage || null,
        photo1: galleryImages?.[0]?.url || null,
        photo2: galleryImages?.[1]?.url || null,
        photo3: galleryImages?.[2]?.url || null,
      });
    }
  }, [data]);

  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

  const handlePhotoUpload = (photoKey: string) => {
    setErrors((prev) => {
      const { [photoKey]: _, ...rest } = prev;
      return rest;
    });

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setErrors((prev) => ({
            ...prev,
            [photoKey]: "Image size must be less than 8MB",
          }));
          return;
        }

        setPhotos((prev) => ({
          ...prev,
          [photoKey]: file,
        }));

        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrls((prev) => ({
            ...prev,
            [photoKey]: (e.target as FileReader).result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleBack = () => {
    router.back();
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Update profile data
      const profileResult = await updateUserProfile(formData);
      if (profileResult.error) {
        setErrors({ general: profileResult.error });
        return;
      }

      // Update photos if any were selected
      const hasPhotos = Object.values(photos).some(photo => photo !== null);
      if (hasPhotos) {
        const imageFormData = new FormData();
        
        if (photos.main) imageFormData.append("profileImage", photos.main);
        if (photos.photo1) imageFormData.append("galleryImages", photos.photo1);
        if (photos.photo2) imageFormData.append("galleryImages", photos.photo2);
        if (photos.photo3) imageFormData.append("galleryImages", photos.photo3);
        
        imageFormData.append("galleryMode", "replace");

        const imageResult = await updateUserImagesAction(imageFormData);
        if (imageResult.error) {
          setErrors({ photos: "Failed to update photos" });
          return;
        }
      }

      // Success - redirect back to profile
      router.push("/profile");
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isSuccess || !data?.user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-main-600">Loading...</div>
      </div>
    );
  }

  const user = data.user;

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={handleBack}
        title="Edit Profile"
        rightIcon={
          <FormSubmitButton
            form="profile-form"
            isLoading={isSubmitting}
            className="text-primary-600 font-bold"
          >
            Save
          </FormSubmitButton>
        }
      />

      <div className="px-6 py-4">
        <form id="profile-form" action={handleSubmit} className="space-y-6">
          {/* Photos Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-main-600 font-ariom">Photos</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-300">Profile Photo</label>
                <PhotoSlot
                  photo={photoUrls.main}
                  onUpload={() => handlePhotoUpload("main")}
                  size="large"
                />
                {errors.main && (
                  <p className="text-red-500 text-xs">{errors.main}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-300">Gallery Photo 1</label>
                <PhotoSlot
                  photo={photoUrls.photo1}
                  onUpload={() => handlePhotoUpload("photo1")}
                  size="normal"
                />
                {errors.photo1 && (
                  <p className="text-red-500 text-xs">{errors.photo1}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-300">Gallery Photo 2</label>
                <PhotoSlot
                  photo={photoUrls.photo2}
                  onUpload={() => handlePhotoUpload("photo2")}
                  size="normal"
                />
                {errors.photo2 && (
                  <p className="text-red-500 text-xs">{errors.photo2}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-main-300">Gallery Photo 3</label>
                <PhotoSlot
                  photo={photoUrls.photo3}
                  onUpload={() => handlePhotoUpload("photo3")}
                  size="normal"
                />
                {errors.photo3 && (
                  <p className="text-red-500 text-xs">{errors.photo3}</p>
                )}
              </div>
            </div>
            
            {errors.photos && (
              <p className="text-red-500 text-sm">{errors.photos}</p>
            )}
          </div>

          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-main-600 font-ariom">Basic Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Full Name</label>
              <TextField
                name="fullName"
                placeholder="Enter your full name"
                defaultValue={user.fullName || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Email</label>
              <TextField
                name="email"
                type="email"
                placeholder="Enter your email"
                defaultValue={user.email || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Gender</label>
              <select
                name="gender"
                defaultValue={user.gender || ""}
                className="w-full px-4 py-3 border border-main-600 rounded-2xl bg-transparent text-main-600 font-ariom focus:border-primary focus:outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Date of Birth</label>
              <TextField
                name="dateOfBirth"
                type="date"
                defaultValue={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""}
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-main-600 font-ariom">About Me</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Bio</label>
              <TextArea
                name="bio"
                placeholder="Tell us about yourself..."
                defaultValue={user.bio || ""}
                rows={4}
              />
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-main-600 font-ariom">Social Links</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Instagram Handle</label>
              <TextField
                name="instagramHandle"
                placeholder="Enter your Instagram username (without @)"
                defaultValue={user.instagramHandle || ""}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Website</label>
              <TextField
                name="website"
                type="url"
                placeholder="https://yourwebsite.com"
                defaultValue={user.website || ""}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-main-300">Public Email</label>
              <TextField
                name="publicEmail"
                type="email"
                placeholder="your.email@example.com"
                defaultValue={user.publicEmail || ""}
              />
            </div>
          </div>

          {/* Error Display */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 border border-main-600 text-main-600 rounded-2xl font-bold font-ariom hover:bg-main-600 hover:text-white transition-colors"
            >
              Cancel
            </button>
            
            <FormSubmitButton
              form="profile-form"
              isLoading={isSubmitting}
              className="flex-1 bg-primary text-main-600 rounded-2xl font-bold font-ariom hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </FormSubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}