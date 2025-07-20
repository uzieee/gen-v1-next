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
            onRight={() => router.push("/onboarding/account-setup?quick=true")}
            rightIcon={
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21C13.24 21 11 18.76 11 16C11 13.24 13.24 11 16 11C18.76 11 21 13.24 21 16C21 18.76 18.76 21 16 21ZM16 13C14.3467 13 13 14.3467 13 16C13 17.6533 14.3467 19 16 19C17.6533 19 19 17.6533 19 16C19 14.3467 17.6533 13 16 13Z"
                  fill="#F4F4F6"
                />
                <path
                  d="M20.2793 29.5866C19.9993 29.5866 19.7193 29.5466 19.4393 29.48C18.6127 29.2533 17.9193 28.7333 17.4793 28L17.3193 27.7333C16.5327 26.3733 15.4527 26.3733 14.666 27.7333L14.5193 27.9866C14.0793 28.7333 13.386 29.2666 12.5593 29.48C11.7193 29.7066 10.8527 29.5866 10.1193 29.1466L7.82602 27.8266C7.01268 27.36 6.42602 26.6 6.17268 25.68C5.93268 24.76 6.05268 23.8133 6.51935 23C6.90602 22.32 7.01268 21.7066 6.78602 21.32C6.55935 20.9333 5.98602 20.7066 5.19935 20.7066C3.25268 20.7066 1.66602 19.12 1.66602 17.1733V14.8266C1.66602 12.88 3.25268 11.2933 5.19935 11.2933C5.98602 11.2933 6.55935 11.0666 6.78602 10.68C7.01268 10.2933 6.91935 9.67998 6.51935 8.99998C6.05268 8.18664 5.93268 7.22664 6.17268 6.31997C6.41268 5.39997 6.99935 4.63998 7.82602 4.17331L10.1327 2.85331C11.6393 1.95998 13.626 2.47997 14.5327 4.01331L14.6927 4.27997C15.4793 5.63998 16.5593 5.63998 17.346 4.27997L17.4927 4.02664C18.3993 2.47997 20.386 1.95998 21.906 2.86664L24.1993 4.18664C25.0127 4.65331 25.5993 5.41331 25.8527 6.33331C26.0927 7.25331 25.9727 8.19998 25.506 9.01331C25.1193 9.69331 25.0127 10.3066 25.2394 10.6933C25.466 11.08 26.0394 11.3066 26.826 11.3066C28.7727 11.3066 30.3594 12.8933 30.3594 14.84V17.1866C30.3594 19.1333 28.7727 20.72 26.826 20.72C26.0394 20.72 25.466 20.9466 25.2394 21.3333C25.0127 21.72 25.106 22.3333 25.506 23.0133C25.9727 23.8266 26.106 24.7866 25.8527 25.6933C25.6127 26.6133 25.026 27.3733 24.1993 27.84L21.8927 29.16C21.386 29.44 20.8393 29.5866 20.2793 29.5866ZM15.9993 24.6533C17.186 24.6533 18.2927 25.4 19.0527 26.72L19.1993 26.9733C19.3593 27.2533 19.626 27.4533 19.946 27.5333C20.266 27.6133 20.586 27.5733 20.8527 27.4133L23.1594 26.08C23.506 25.88 23.7727 25.5466 23.8793 25.1466C23.986 24.7466 23.9327 24.3333 23.7327 23.9866C22.9727 22.68 22.8794 21.3333 23.466 20.3066C24.0527 19.28 25.266 18.6933 26.786 18.6933C27.6393 18.6933 28.3193 18.0133 28.3193 17.16V14.8133C28.3193 13.9733 27.6393 13.28 26.786 13.28C25.266 13.28 24.0527 12.6933 23.466 11.6666C22.8794 10.64 22.9727 9.29331 23.7327 7.98664C23.9327 7.63998 23.986 7.22664 23.8793 6.82664C23.7727 6.42664 23.5193 6.10664 23.1727 5.89331L20.866 4.57331C20.2927 4.22664 19.5327 4.42664 19.186 5.01331L19.0393 5.26664C18.2793 6.58664 17.1727 7.33331 15.986 7.33331C14.7993 7.33331 13.6927 6.58664 12.9327 5.26664L12.786 4.99997C12.4527 4.43997 11.706 4.23998 11.1327 4.57331L8.82602 5.90664C8.47935 6.10664 8.21268 6.43998 8.10602 6.83998C7.99935 7.23998 8.05268 7.65331 8.25268 7.99998C9.01268 9.30664 9.10602 10.6533 8.51935 11.68C7.93268 12.7066 6.71935 13.2933 5.19935 13.2933C4.34602 13.2933 3.66602 13.9733 3.66602 14.8266V17.1733C3.66602 18.0133 4.34602 18.7066 5.19935 18.7066C6.71935 18.7066 7.93268 19.2933 8.51935 20.32C9.10602 21.3466 9.01268 22.6933 8.25268 24C8.05268 24.3466 7.99935 24.76 8.10602 25.16C8.21268 25.56 8.46602 25.88 8.81268 26.0933L11.1193 27.4133C11.3993 27.5866 11.7327 27.6266 12.0393 27.5466C12.3593 27.4666 12.626 27.2533 12.7993 26.9733L12.946 26.72C13.706 25.4133 14.8127 24.6533 15.9993 24.6533Z"
                  fill="#F4F4F6"
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
