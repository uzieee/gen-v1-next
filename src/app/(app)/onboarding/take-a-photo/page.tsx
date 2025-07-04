"use client";

import { updateUserImagesAction } from "@/app/actions/user-images";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import PhotoSlot from "@/components/atoms/PhotoSlot";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import TakePhotoSkeleton from "@/components/skeletons/TakePhotoSkeleton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TakeAPhoto() {
  const router = useRouter();

  const { data, isSuccess: isFetchUserSuccess } = useCurrentUser();

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  const handlePhotoUpload = (photoKey: string) => {
    // Clear previous error for this photo
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [photoKey]: _, ...rest } = prev;
      return rest;
    });

    // Simulate photo upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
          setErrors((prev) => ({
            ...prev,
            [photoKey]: "Image size must be less than 2MB",
          }));
          return;
        }

        // Store the actual File object
        setPhotos((prev) => ({
          ...prev,
          [photoKey]: file,
        }));

        // Create data URL for display
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

  const onSkip = () => {
    router.push("/onboarding/signup");
  };

  async function onSubmit() {
    // Check if there are any errors
    if (Object.keys(errors).some((key) => errors[key])) {
      alert("Please fix the image size errors before continuing");
      return;
    }

    const fd = new FormData();
    if (photos.main) fd.append("profileImage", photos.main);
    if (photos.photo1) fd.append("galleryImages", photos.photo1);
    if (photos.photo2) fd.append("galleryImages", photos.photo2);
    if (photos.photo3) fd.append("galleryImages", photos.photo3);
    fd.append("galleryMode", "replace");
    const res = await updateUserImagesAction(fd);
    if (res?.error) {
      alert(JSON.stringify(res.error));
    } else {
      router.push("/home");
    }
    console.log({ error: res?.error });
  }

  if (!isFetchUserSuccess) return <TakePhotoSkeleton />;
  return (
    <>
      <HeaderWithSteps onSkip={onSkip} action="Skip" activeIndicator={5} />
      <form
        action={onSubmit}
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-14 p-8"
      >
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold text-main-600 font-ariom">
              Add a face to the name
            </div>
            <div className="text-sm text-secondary-800 font-ariom">
              This helps others recognize you at GEN experiences
            </div>
          </div>
          <div className="text-lg text-main-500 font-ariom">
            Upload a headshot or selfie
          </div>
          <div className="flex flex-col gap-10 items-center my-14">
            {/* Main Photo */}
            <div className="flex flex-col gap-2">
              <PhotoSlot
                photo={photoUrls.main}
                onUpload={() => handlePhotoUpload("main")}
                onEdit={() => handlePhotoUpload("main")}
                size="large"
              />
              {errors.main && (
                <div className="text-red-500 text-sm text-center">
                  {errors.main}
                </div>
              )}
            </div>
            {/* Grid Layout for smaller photos */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <PhotoSlot
                  photo={photoUrls.photo1}
                  onUpload={() => handlePhotoUpload("photo1")}
                  onEdit={() => handlePhotoUpload("photo1")}
                  size="normal"
                />
                {errors.photo1 && (
                  <div className="text-red-500 text-xs text-center">
                    {errors.photo1}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <PhotoSlot
                  photo={photoUrls.photo2}
                  onUpload={() => handlePhotoUpload("photo2")}
                  onEdit={() => handlePhotoUpload("photo2")}
                  size="normal"
                />
                {errors.photo2 && (
                  <div className="text-red-500 text-xs text-center">
                    {errors.photo2}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <PhotoSlot
                  photo={photoUrls.photo3}
                  onUpload={() => handlePhotoUpload("photo3")}
                  onEdit={() => handlePhotoUpload("photo3")}
                  size="normal"
                />
                {errors.photo3 && (
                  <div className="text-red-500 text-xs text-center">
                    {errors.photo3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <FormSubmitButton
          className="absolute left-0 right-0 bottom-0 rounded-bl-[0px] rounded-br-[0px] rounded-t-[1rem] h-[4rem]"
          loadingText="Saving..."
          state={Object.keys(errors).length > 0 ? "disabled" : "default"}
        />
      </form>
    </>
  );
}
