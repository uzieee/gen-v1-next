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

export default function Profile() {
  const router = useRouter();
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

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
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/10"
                  icon={
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5 10.525C20.5 5.00502 16.02 0.525024 10.5 0.525024C4.98 0.525024 0.5 5.00502 0.5 10.525C0.5 15.365 3.94 19.395 8.5 20.325V13.525H6.5V10.525H8.5V8.02502C8.5 6.09502 10.07 4.52502 12 4.52502H14.5V7.52502H12.5C11.95 7.52502 11.5 7.97502 11.5 8.52502V10.525H14.5V13.525H11.5V20.475C16.55 19.975 20.5 15.715 20.5 10.525Z"
                        fill="#F4F4F6"
                      />
                    </svg>
                  }
                />
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/10"
                  icon={
                    <svg
                      width="14"
                      height="17"
                      viewBox="0 0 14 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.92268 4.36847C9.52405 4.36847 9.14948 4.43037 8.79897 4.55416C8.44845 4.67107 8.1323 4.79142 7.85052 4.91522C7.56873 5.03901 7.32131 5.1009 7.10825 5.1009C6.88832 5.1009 6.64089 5.04245 6.36598 4.92553C6.09794 4.80862 5.80928 4.69514 5.5 4.58511C5.19072 4.46819 4.86082 4.40974 4.51031 4.40974C3.85052 4.40974 3.21134 4.59198 2.59278 4.95648C1.9811 5.3141 1.47938 5.84709 1.08763 6.55545C0.695876 7.25693 0.5 8.12691 0.5 9.16538C0.5 10.1351 0.661512 11.0979 0.984536 12.0538C1.31443 13.0029 1.70962 13.8075 2.1701 14.4678C2.56873 15.0248 2.95704 15.5028 3.33505 15.9017C3.71306 16.3006 4.15292 16.5 4.65464 16.5C4.98454 16.5 5.26976 16.445 5.51031 16.3349C5.75773 16.2249 6.01546 16.1149 6.2835 16.0048C6.55842 15.8948 6.89863 15.8398 7.30412 15.8398C7.72337 15.8398 8.0567 15.8948 8.30412 16.0048C8.55155 16.108 8.7921 16.2146 9.02577 16.3246C9.25945 16.4278 9.55842 16.4794 9.92268 16.4794C10.4656 16.4794 10.9296 16.273 11.3144 15.8604C11.7062 15.4478 12.0704 14.9973 12.4072 14.509C12.7921 13.9451 13.067 13.4327 13.232 12.972C13.4038 12.5112 13.4931 12.267 13.5 12.2395C13.4863 12.2326 13.3694 12.1707 13.1495 12.0538C12.9364 11.9369 12.689 11.7547 12.4072 11.5071C12.1323 11.2526 11.8883 10.9191 11.6753 10.5064C11.4691 10.0938 11.366 9.59177 11.366 9.00032C11.366 8.48453 11.4485 8.04094 11.6134 7.66957C11.7783 7.29132 11.9708 6.98184 12.1907 6.74113C12.4107 6.49355 12.61 6.30787 12.7887 6.18407C12.9674 6.05341 13.067 5.97776 13.0876 5.95712C12.7302 5.44133 12.3316 5.07339 11.8918 4.85332C11.4588 4.62637 11.0601 4.48882 10.6959 4.44068C10.3316 4.39254 10.0739 4.36847 9.92268 4.36847ZM9.35567 3.05835C9.60309 2.75575 9.80584 2.41188 9.96392 2.02676C10.122 1.63475 10.201 1.23243 10.201 0.819794C10.201 0.696003 10.1907 0.589405 10.1701 0.5C9.77148 0.513755 9.35223 0.634107 8.91237 0.861057C8.47251 1.08801 8.10825 1.37341 7.81959 1.71728C7.59278 1.97174 7.39003 2.29497 7.21134 2.68698C7.03265 3.0721 6.9433 3.47099 6.9433 3.88362C6.9433 3.94552 6.94674 4.00398 6.95361 4.05899C6.96048 4.11401 6.96735 4.15184 6.97423 4.17247C7.04295 4.18622 7.11512 4.1931 7.19072 4.1931C7.55498 4.1931 7.93986 4.0865 8.34536 3.87331C8.75086 3.65323 9.08763 3.38158 9.35567 3.05835Z"
                        fill="#F4F4F6"
                      />
                    </svg>
                  }
                />
                <IconButton
                  size="sm"
                  variant="ghost"
                  className="bg-main/10 w-8 h-8 rounded-full hover:bg-main/10"
                  icon={
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.04013 12.0283C0.184296 9.47739 1.89596 3.52417 7.88846 3.52417V1.82382C7.88121 1.67014 7.92031 1.51769 8.00119 1.38431C8.08207 1.25093 8.20137 1.14216 8.34513 1.07072C8.48888 0.999289 8.65114 0.968152 8.8129 0.980961C8.97465 0.993769 9.12921 1.04999 9.25846 1.14305L13.8243 4.54454C13.9313 4.62657 14.0176 4.73024 14.0769 4.84796C14.1362 4.96568 14.167 5.09448 14.167 5.22492C14.167 5.35537 14.1362 5.48416 14.0769 5.60188C14.0176 5.7196 13.9313 5.82327 13.8243 5.9053L9.25846 9.3068C9.12926 9.3998 8.97479 9.45601 8.81312 9.46884C8.65144 9.48168 8.48925 9.45061 8.34553 9.37927C8.2018 9.30794 8.08249 9.19928 8.00155 9.06603C7.9206 8.93277 7.88138 8.78043 7.88846 8.62681V6.92567C1.89596 7.77624 1.04013 12.0283 1.04013 12.0283Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
    </>
  );
}
