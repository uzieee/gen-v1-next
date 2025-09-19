"use client";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import IconButton from "@/components/atoms/IconButton";
import InfoCard from "@/components/atoms/InfoCard";
import ProgressIndicator from "@/components/atoms/ProgressIndicator";
import Tag from "@/components/atoms/Tag";
import Header from "@/components/molecules/Header";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { getProfessionSummary, getStartupSummary } from "@/lib/utils";
import {
  Attribute,
  AttributeCategory,
  Profession,
  Startup,
} from "@/payload-types";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import SocialLinkModal from "@/components/molecules/SocialLinkModal";

export default function Profile() {
  const router = useRouter();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [socialModal, setSocialModal] = useState<{
    isOpen: boolean;
    type: "instagram" | "website" | "email";
  }>({ isOpen: false, type: "instagram" });

  const { data, isSuccess: isFetchUserSuccess } = useCurrentUser(2);

  const userProfile = useMemo(() => {
    const user = data?.user;
    if (!isFetchUserSuccess || !user) return null;

    return {
      id: user.id,
      name: user.fullName ?? "Unknown",
      flag: ((user.attributes as Attribute[]) || [])
        .filter(
          (el) => (el.category as AttributeCategory)?.slug === "countries"
        )
        .reduce((acc, curr) => acc + " " + (curr.image as string), " "), // assuming you store flag here
      images: [
        user.profileImage, // main
        ...(user.galleryImages ?? []).map((g) => g.url), // gallery
      ].filter(Boolean), // drop empties
      bio: user.bio ?? "",
      work: user.profession
        ? getProfessionSummary({
            profession: user.profession as Profession,
            userName: (user.fullName || "").split(" ")[0],
          })
        : "N/A",
      startup: user.startups
        ? getStartupSummary({
            startup: user.startups[0] as Startup,
            userName: (user.fullName || "").split(" ")[0],
          })
        : "N/A",
      topics: Array.from(
        new Set(
          ((user.attributes as Attribute[]) ?? []).map((a) =>
            (a.label || "").toLowerCase()
          )
        )
      ), // unique labels only
      instagramHandle: user.instagramHandle || "",
      website: user.website || "",
      publicEmail: user.publicEmail || "",
    };
  }, [isFetchUserSuccess, data]);

  const handleBack = () => {
    router.replace("/home");
  };

  const goToNextProfile = () => {
    if (currentProfileIndex < (userProfile?.images || []).length - 1) {
      setCurrentProfileIndex((prev) => prev + 1);
    }
  };

  const goToPreviousProfile = () => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex((prev) => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextProfile,
    onSwipedRight: goToPreviousProfile,
    trackMouse: true,
  });

  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userProfile?.name}'s Profile`,
          text: `Check out ${userProfile?.name}'s profile on GEN`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Profile link copied to clipboard!");
      } catch (error) {
        console.log("Failed to copy to clipboard");
      }
    }
  };

  const openSocialModal = (type: "instagram" | "website" | "email") => {
    setSocialModal({ isOpen: true, type });
  };

  const closeSocialModal = () => {
    setSocialModal({ isOpen: false, type: "instagram" });
  };

  if (!isFetchUserSuccess) return <ProfileSkeleton />;

  return (
    <>
      <div className="overflow-auto h-[90%]">
        <div
          className="relative inset-0 bg-cover bg-top overflow-hidden transition-all duration-300 rounded-b-4xl h-[50vh] min-h-[50vh] max-h-[50vh]"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${userProfile?.images?.[currentProfileIndex] ?? ""})`,
          }}
          {...handlers}
        >
          <ProgressIndicator
            currentIndex={currentProfileIndex}
            total={userProfile?.images?.length ?? 0}
          />
          <Header
            onBack={handleBack}
            onRight={() => router.push("/edit-profile")}
            rightIcon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#F4F4F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="#F4F4F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <div className="absolute bottom-0 flex items-end justify-between px-4 pb-3.5 w-full">
            <div className="flex flex-col gap-2.5">
              <div className="text-2xl font-medium text-main font-hellix">
                {userProfile?.name || ""} {userProfile?.flag || "🇨🇦"}
              </div>
              <div className="flex gap-1">
                {/* Instagram Button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/20"
                  onClick={() => openSocialModal("instagram")}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        fill="#F4F4F6"
                      />
                    </svg>
                  }
                />
                {/* Website Button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/20"
                  onClick={() => openSocialModal("website")}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                        fill="#F4F4F6"
                      />
                    </svg>
                  }
                />
                {/* Share Button */}
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/20"
                  onClick={handleShareProfile}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
                        fill="#F4F4F6"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 px-5 flex flex-col gap-3">
          <InfoCard title="About me" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-main/50 font-chivo text-sm font-light">
                {userProfile?.bio}
              </div>
              <div className="text-main/30 font-chivo text-xs font-light italic mt-2">
                AI generated bio
              </div>
            </div>
          </InfoCard>
          <InfoCard
            onEdit={() =>
              router.push("/onboarding/language-country?quick=true")
            }
            title="Lets talk about"
            className="flex flex-col gap-3"
          >
            <div className="flex flex-wrap gap-2">
              {userProfile?.topics?.map((topic) => (
                <Tag
                  key={topic}
                  label={topic}
                  className="border-none bg-main/30 shadow-md font-hellix hover:bg-main/30 capitalize"
                />
              ))}
            </div>
          </InfoCard>
          <InfoCard
            onEdit={() => router.push("/onboarding/work-profession?quick=true")}
            title="Work"
          >
            <div
              dangerouslySetInnerHTML={{ __html: userProfile?.work || "N/A" }}
              className="text-main/50 font-chivo text-sm font-light"
            ></div>
          </InfoCard>
          <InfoCard
            onEdit={() => router.push("/onboarding/startup-vision?quick=true")}
            title="Startup(s)"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: userProfile?.startup || "N/A",
              }}
              className="text-main/50 font-chivo text-sm font-light"
            ></div>
          </InfoCard>
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* Social Link Modal */}
      <SocialLinkModal
        isOpen={socialModal.isOpen}
        onClose={closeSocialModal}
        type={socialModal.type}
        currentValue={
          socialModal.type === "instagram" ? userProfile?.instagramHandle || "" :
          socialModal.type === "website" ? userProfile?.website || "" :
          userProfile?.publicEmail || ""
        }
        onSuccess={() => {
          // Refresh user data after successful update
          window.location.reload();
        }}
      />
    </>
  );
}
