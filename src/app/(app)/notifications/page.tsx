"use client";

import useApiQuery from "@/app/hooks/use-api-query";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { fetchPendingSessions } from "@/app/services/http/sessions";
import { fetchNotifications, markNotificationAsRead, Notification } from "@/app/services/http/notifications";
import NotificationListItem from "@/components/atoms/NotificationListItem";
import Header from "@/components/molecules/Header";
import NotificationsSkeleton from "@/components/skeletons/NotificationsSkeleton";
import dayjs from "dayjs";
import { Bell, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotificationsList() {
  const { data } = useCurrentUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "likes">("all");

  const onBack = () => {
    router.back();
  };

  // Fetch round table sessions
  const { data: sessions, isSuccess: isSessionFetchSuccess } = useApiQuery({
    apiHandler: fetchPendingSessions,
    payload: {
      userId: `${data?.user?.id || ""}`,
    },
    queryKey: ["sessions", data?.user?.id],
    enabled: !!data?.user?.id,
  });

  // Fetch notifications
  const { data: notificationsData, isSuccess: isNotificationsFetchSuccess, refetch: refetchNotifications } = useApiQuery({
    apiHandler: fetchNotifications,
    payload: {
      page: 1,
      limit: 50,
      unreadOnly: false,
    },
    queryKey: ["notifications", data?.user?.id],
    enabled: !!data?.user?.id,
  });

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      try {
        await markNotificationAsRead(notification.id, true);
        refetchNotifications();
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }

    // Navigate to action URL if available
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  if (!isSessionFetchSuccess || !isNotificationsFetchSuccess) {
    return (
      <div className="p-6">
        <NotificationsSkeleton />
      </div>
    );
  }

  const notifications = notificationsData?.notifications || [];
  const likeNotifications = notifications.filter(n => n.type === "profile_like");
  const allNotifications = [...(sessions || []).map(session => ({
    id: session.id,
    type: "round_table_invite" as const,
    title: `Round table #${session.sessionNumber}`,
    message: session.topic || "",
    isRead: false,
    actionUrl: `/round-table/${session.id}/welcome?table=${session.tableNumber}`,
    createdAt: session.startTime,
    updatedAt: session.startTime,
  })), ...notifications];

  const hasNotifications = allNotifications.length > 0;
  const hasLikeNotifications = likeNotifications.length > 0;

  return (
    <>
      <Header
        onBack={onBack}
        rightIcon={home_icon_svg}
        onRight={() => router.replace("/home")}
        title={"Notifications"}
      />
      
      {/* Tab Navigation */}
      <div className="px-6 py-4">
        <div className="flex gap-2 bg-main/10 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2 px-4 rounded-xl font-ariom font-medium transition-colors ${
              activeTab === "all"
                ? "bg-primary text-main-600"
                : "text-main-600/70 hover:text-main-600"
            }`}
          >
            All ({allNotifications.length})
          </button>
          <button
            onClick={() => setActiveTab("likes")}
            className={`flex-1 py-2 px-4 rounded-xl font-ariom font-medium transition-colors ${
              activeTab === "likes"
                ? "bg-primary text-main-600"
                : "text-main-600/70 hover:text-main-600"
            }`}
          >
            Likes ({likeNotifications.length})
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6">
        {!hasNotifications ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell color="#99a1af" size={48} className="mb-4" />
            <h3 className="text-gray-600 text-lg font-medium font-ariom mb-2">
              No Notifications
            </h3>
            <p className="text-gray-400 text-center font-chivo">
              You don{"'"}t have any notifications at the moment
            </p>
          </div>
        ) : activeTab === "all" ? (
          allNotifications.map((notification) => (
            <NotificationListItem
              key={notification.id}
              notification={{
                timestamp: dayjs(notification.createdAt).format("HH:mm"),
                title: notification.title,
                body: notification.message,
                isRead: notification.isRead,
                onAccept: () => {
                  if (notification.actionUrl) {
                    router.push(notification.actionUrl);
                  }
                },
                onDecline: () => router.push("/home"),
              }}
            />
          ))
        ) : (
          likeNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-background border border-main-600 rounded-2xl p-4 cursor-pointer transition-colors ${
                !notification.isRead ? "bg-primary/5 border-primary/30" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-ariom font-bold text-main-600">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-main-600/50 font-chivo">
                      {dayjs(notification.createdAt).format("HH:mm")}
                    </span>
                  </div>
                  <p className="text-main-600/70 font-chivo text-sm">
                    {notification.message}
                  </p>
                  {notification.fromUser && (
                    <div className="flex items-center gap-2 mt-2">
                      {notification.fromUser.profileImage && (
                        <img
                          src={notification.fromUser.profileImage}
                          alt={notification.fromUser.fullName || "User"}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span className="text-xs text-main-600/60 font-chivo">
                        from {notification.fromUser.fullName || "Someone"}
                      </span>
                    </div>
                  )}
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const home_icon_svg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="!w-[22px] !h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 14.25C12.4142 14.25 12.75 14.5858 12.75 15V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V15C11.25 14.5858 11.5858 14.25 12 14.25Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3993 2.24467C14.3996 2.2449 14.3999 2.24513 14.4002 2.24536L21.3307 7.78578C21.8443 8.19936 22.2292 8.80505 22.4648 9.42261C22.7005 10.0404 22.8169 10.7489 22.7105 11.4008L22.71 11.4035L21.38 19.3635L21.3797 19.3658C21.0785 21.135 19.3972 22.5599 17.6003 22.5599H6.4003C4.5941 22.5599 2.92174 21.1456 2.62079 19.3649L1.29134 11.4081C1.29119 11.4073 1.29105 11.4065 1.2909 11.4056C1.17808 10.7518 1.29221 10.0415 1.52832 9.42261C1.76457 8.80335 2.15288 8.19722 2.67239 7.78381C2.6728 7.78348 2.67321 7.78316 2.67362 7.78283L9.60111 2.23483C10.9365 1.16433 13.0564 1.16609 14.3993 2.24467ZM13.4604 3.41453C12.6634 2.7739 11.3239 2.77609 10.5395 3.40506L3.60699 8.95707C3.34711 9.16364 3.09584 9.52203 2.92978 9.95729C2.76369 10.3926 2.71281 10.8263 2.76926 11.1518L2.77006 11.1563L4.09981 19.115C4.09984 19.1151 4.09978 19.1148 4.09981 19.115C4.27913 20.1741 5.32669 21.0599 6.4003 21.0599H17.6003C18.663 21.0599 19.7213 20.1655 19.9007 19.1152C19.9008 19.1148 19.9009 19.1145 19.9009 19.1141L21.2301 11.1591C21.2302 11.1586 21.2302 11.1582 21.2303 11.1577C21.2835 10.8298 21.2299 10.3939 21.0633 9.95729C20.8966 9.52035 20.6469 9.16137 20.3908 8.95483C20.3905 8.95459 20.3902 8.95435 20.3899 8.95412L13.462 3.41576L13.4604 3.41453Z"
      fill="white"
    />
  </svg>
);
