"use client";

import useApiQuery from "@/app/hooks/use-api-query";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { fetchEvents } from "@/app/services/http/events";
import EventCard from "@/components/atoms/EventCard";
import IconButton from "@/components/atoms/IconButton";
import ProfileCardStack from "@/components/atoms/ProfileStack";
import SectionHeader from "@/components/atoms/SectionHeader";
import AvatarPlaceholder from "@/components/molecules/AvatarPlaceholder";
import BottomNav, { NavItemType } from "@/components/molecules/BottomNav";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Bell, TicketPercent } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

// Main Component
export default function HomeDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [eventsLoading] = useState(false);
  const router = useRouter();

  const { data, isSuccess: isFetchUserSuccess } = useCurrentUser();

  const { isSuccess: isFetchEventsSuccess, data: eventsData } = useApiQuery({
    apiHandler: fetchEvents,
    payload: {
      page: 1,
      limit: 10,
    },
    queryKey: ["events", "home-page"],
  });

  const communityProfiles = [
    {
      id: "1",
      name: "Alexis",
      flag: "🇩🇴",
      status: "Recommended",
      icon: "⚡",
      image: "/images/hip-hop-dancer-studio.jpg",
    },
    {
      id: "2",
      name: "Marcus",
      flag: "🇺🇸",
      status: "Online",
      icon: "⚡",
      image: "/images/futuristic-digital-portrait.jpg",
    },
    {
      id: "3",
      name: "Sofia",
      flag: "🇪🇸",
      status: "Recommended",
      icon: "⚡",
      image: "/images/ethereal-marine-anemone.jpg",
    },
    {
      id: "4",
      name: "Emma",
      flag: "🇫🇷",
      status: "Offline",
      icon: "⚡",
      image:
        "/images/advanced-technological-robot-interacting-with-money-finance.jpg",
    },
  ];

  const tabs: NavItemType[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-200"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 13.25C11.4142 13.25 11.75 13.5858 11.75 14V17C11.75 17.4142 11.4142 17.75 11 17.75C10.5858 17.75 10.25 17.4142 10.25 17V14C10.25 13.5858 10.5858 13.25 11 13.25Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3993 1.24467C13.3996 1.2449 13.3999 1.24513 13.4002 1.24536L20.3307 6.78578C20.8443 7.19936 21.2292 7.80505 21.4648 8.42261C21.7005 9.04035 21.8169 9.74892 21.7105 10.4008L21.71 10.4035L20.38 18.3635L20.3797 18.3658C20.0785 20.135 18.3972 21.5599 16.6003 21.5599H5.4003C3.5941 21.5599 1.92174 20.1456 1.62079 18.3649L0.291336 10.4081C0.291192 10.4073 0.291048 10.4065 0.290905 10.4056C0.178082 9.75178 0.292212 9.04146 0.528316 8.42261C0.764573 7.80335 1.15288 7.19722 1.67239 6.78381C1.6728 6.78348 1.67321 6.78316 1.67362 6.78283L8.60111 1.23483C9.93648 0.164325 12.0564 0.166089 13.3993 1.24467ZM12.4604 2.41453C11.6634 1.7739 10.3239 1.77609 9.53949 2.40506L2.60699 7.95707C2.34711 8.16364 2.09584 8.52203 1.92978 8.95729C1.76369 9.39264 1.71281 9.82631 1.76926 10.1518L1.77006 10.1563L3.09981 18.115C3.09978 18.1148 3.09984 18.1151 3.09981 18.115C3.27913 19.1741 4.32669 20.0599 5.4003 20.0599H16.6003C17.663 20.0599 18.7213 19.1655 18.9007 18.1152C18.9008 18.1148 18.9009 18.1145 18.9009 18.1141L20.2301 10.1591C20.2302 10.1586 20.2302 10.1582 20.2303 10.1577C20.2835 9.82977 20.2299 9.39394 20.0633 8.95729C19.8966 8.52035 19.6469 8.16137 19.3908 7.95483C19.3905 7.95459 19.3902 7.95435 19.3899 7.95412L12.462 2.41576L12.4604 2.41453Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "ticket",
      label: "Tickets",
      icon: <TicketPercent className="text-primary-200" />,
    },
    {
      id: "chat",
      label: "Chat",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-200"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.69732 4.03033C3.88758 4.84007 3.41699 6.11561 3.41699 8V13C3.41699 15.4353 3.91066 16.6541 4.66087 17.3106C5.43586 17.9887 6.68025 18.25 8.66699 18.25H9.16699C9.44981 18.25 9.72496 18.3383 9.94135 18.4455C10.155 18.5515 10.3967 18.7182 10.5696 18.9535L12.067 20.95C12.2762 21.2289 12.5007 21.31 12.667 21.31C12.8333 21.31 13.0578 21.2289 13.267 20.95L14.767 18.95L14.7699 18.9462C15.0995 18.5124 15.6191 18.25 16.167 18.25H16.667C18.5514 18.25 19.8269 17.7794 20.6367 16.9697C21.4464 16.1599 21.917 14.8844 21.917 13V10C21.917 9.58579 22.2528 9.25 22.667 9.25C23.0812 9.25 23.417 9.58579 23.417 10V13C23.417 15.1156 22.8876 16.8401 21.6973 18.0303C20.5071 19.2206 18.7826 19.75 16.667 19.75H16.167C16.0954 19.75 16.0156 19.7871 15.9652 19.8524C15.9648 19.8529 15.9645 19.8534 15.9641 19.8538L14.467 21.85C14.0162 22.4511 13.3707 22.81 12.667 22.81C11.9633 22.81 11.3178 22.4511 10.867 21.85L9.36576 19.8484C9.36353 19.8462 9.35903 19.8422 9.35169 19.8365C9.33361 19.8224 9.30736 19.8054 9.27513 19.7895C9.24297 19.7735 9.21232 19.7622 9.18772 19.7556C9.17324 19.7517 9.16465 19.7504 9.16194 19.75H8.66699C6.65373 19.75 4.89813 19.5113 3.67311 18.4394C2.42333 17.3459 1.91699 15.5647 1.91699 13V8C1.91699 5.88439 2.4464 4.15993 3.63666 2.96967C4.82692 1.77941 6.55138 1.25 8.66699 1.25H14.667C15.0812 1.25 15.417 1.58579 15.417 2C15.417 2.41421 15.0812 2.75 14.667 2.75H8.66699C6.7826 2.75 5.50706 3.22059 4.69732 4.03033Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.6631 11C15.6631 10.4477 16.1108 10 16.6631 10H16.6721C17.2244 10 17.6721 10.4477 17.6721 11C17.6721 11.5523 17.2244 12 16.6721 12H16.6631C16.1108 12 15.6631 11.5523 15.6631 11Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6621 11C11.6621 10.4477 12.1098 10 12.6621 10H12.6711C13.2234 10 13.6711 10.4477 13.6711 11C13.6711 11.5523 13.2234 12 12.6711 12H12.6621C12.1098 12 11.6621 11.5523 11.6621 11Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.66113 11C7.66113 10.4477 8.10885 10 8.66113 10H8.67011C9.2224 10 9.67011 10.4477 9.67011 11C9.67011 11.5523 9.2224 12 8.67011 12H8.66113C8.10885 12 7.66113 11.5523 7.66113 11Z"
            fill="currentColor"
          />
        </svg>
      ),
      hasRedDot: true,
    },
    // {
    //     id: 'journal',
    //     label: 'Journal',
    //     icon: <Notebook className='text-primary-200' />
    // },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-200"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9996 2.75C9.95488 2.75 8.30957 4.40311 8.30957 6.44C8.30957 8.42302 9.85865 10.032 11.8145 10.1189C11.9331 10.1106 12.0584 10.1102 12.1766 10.1188C14.1305 10.031 15.6805 8.42308 15.6896 6.43847C15.6887 4.40339 14.0348 2.75 11.9996 2.75ZM6.80957 6.44C6.80957 3.57689 9.12426 1.25 11.9996 1.25C14.8638 1.25 17.1896 3.57579 17.1896 6.44L17.1896 6.44313C17.1779 9.24352 14.9705 11.5259 12.1848 11.6196C12.1515 11.6207 12.1181 11.6196 12.0849 11.6163C12.0367 11.6115 11.9647 11.6108 11.8975 11.6169C11.8665 11.6197 11.8354 11.6206 11.8044 11.6196C9.01917 11.526 6.80957 9.24337 6.80957 6.44Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.1722 12.4375C14.1004 12.4375 16.0667 12.9214 17.5863 13.9363C18.9522 14.8454 19.7347 16.1198 19.7347 17.4913C19.7347 18.8626 18.9523 20.1393 17.5869 21.0532L17.5868 21.0533C16.0626 22.0732 14.0938 22.56 12.1647 22.56C10.236 22.56 8.26764 22.0734 6.74355 21.0539C5.37744 20.1448 4.59473 18.8703 4.59473 17.4987C4.59473 16.1274 5.37717 14.8507 6.74251 13.9368L6.74527 13.9349L6.74527 13.9349C8.2737 12.9215 10.2438 12.4375 12.1722 12.4375ZM7.57556 15.1842C6.52191 15.89 6.09473 16.7429 6.09473 17.4987C6.09473 18.2544 6.52173 19.1047 7.57516 19.8056L7.5768 19.8067C8.80258 20.6268 10.4638 21.06 12.1647 21.06C13.8656 21.06 15.5267 20.6269 16.7525 19.8068C17.8072 19.1007 18.2347 18.2474 18.2347 17.4913C18.2347 16.7355 17.8077 15.8853 16.7543 15.1844L16.7532 15.1837C15.5327 14.3686 13.874 13.9375 12.1722 13.9375C10.4713 13.9375 8.80699 14.3682 7.57556 15.1842Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const user = useMemo(() => {
    if (router && !data?.user && isFetchUserSuccess) {
      router.push("/");
    }

    return {
      name: (data?.user?.fullName || "").split(" ")[0],
      image: data?.user?.profileImage,
    };
  }, [data, isFetchUserSuccess, router]);

  if (!isFetchUserSuccess || !isFetchEventsSuccess) return <HomeSkeleton />;

  return (
    <>
      <div className="pt-7 overflow-y-auto">
        {/* Header */}
        <div className="mb-12 px-6">
          <div className="flex items-center justify-between">
            <div className="text-main font-syne font-semibold">
              <p className="text-lg">Morning&nbsp;{user?.name}</p>
              <h1 className="text-main text-2xl font-bold">Welcome Back</h1>
            </div>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Bell className="w-3.5 h-3" />}
                className="rounded-full bg-primary"
                onClick={() => {}}
              />
              {user?.image ? (
                <IconButton
                  onClick={() => {
                    router.push("/profile");
                  }}
                  variant="ghost"
                  className="border-2 border-main rounded-full !p-0"
                  icon={
                    <Image
                      src={user?.image || ""}
                      width={100}
                      height={100}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  }
                />
              ) : (
                <IconButton
                  onClick={() => {
                    router.push("/profile");
                  }}
                  variant="ghost"
                  className="rounded-full !p-0"
                  icon={
                    <AvatarPlaceholder
                      fullName={user.name}
                      className="!w-12 !h-12"
                    />
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="flex flex-col gap-6 mb-7">
          <div className="w-full px-6">
            <SectionHeader
              title="Upcoming Events"
              emoji="🔥"
              onSeeAll={() => {
                router.push("/events");
              }}
            />
          </div>
          <div className="flex items-center overflow-x-scroll space-x-6 px-6 scroll-snap-bouncy scrollbar-hide">
            {(eventsData.events || []).map((event, key) => (
              <EventCard
                onSelect={() => router.push(`/events/${event.slug}`)}
                key={key}
                event={event}
                isLoading={eventsLoading}
                className={key == 0 ? "pl-6" : ""}
              />
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="flex flex-col gap-16 mb-24 px-6">
          <SectionHeader title="Community" emoji="😊" onSeeAll={() => {}} />
          <ProfileCardStack profiles={communityProfiles} />
        </div>
      </div>
      <BottomNav
        activeTab={activeTab}
        navItems={tabs}
        setActiveTab={(tab) => {
          if (["home", "profile"].indexOf(tab) > -1) {
            router.push("/" + tab);
          }
          setActiveTab(tab);
        }}
      />
    </>
  );
}
