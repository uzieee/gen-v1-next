import { ApiResponse } from "./types";

export interface Notification {
  id: string;
  type: "profile_like" | "round_table_invite" | "event_reminder" | "general";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  fromUser?: {
    id: string;
    fullName?: string;
    profileImage?: string;
  };
  metadata?: {
    likedBy?: string;
    likedByImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FetchNotificationsParams {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}

export const fetchNotifications = async (
  params: FetchNotificationsParams = {}
): Promise<NotificationsResponse> => {
  const { page = 1, limit = 20, unreadOnly = false } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    unreadOnly: unreadOnly.toString(),
  });

  const response = await fetch(`/api/notifications?${searchParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch notifications");
  }

  return response.json();
};

export const markNotificationAsRead = async (
  notificationId: string,
  isRead: boolean = true
): Promise<{ success: boolean; notification: Notification }> => {
  const response = await fetch("/api/notifications", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notificationId,
      isRead,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update notification");
  }

  return response.json();
};
