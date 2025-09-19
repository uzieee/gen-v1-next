import { CollectionConfig } from "payload";

export const Notifications: CollectionConfig = {
  slug: "notifications",
  admin: { 
    useAsTitle: "title",
    defaultColumns: ["title", "user", "type", "isRead", "createdAt"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
      admin: {
        description: "User who will receive this notification",
      },
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Profile Like", value: "profile_like" },
        { label: "Round Table Invite", value: "round_table_invite" },
        { label: "Event Reminder", value: "event_reminder" },
        { label: "General", value: "general" },
      ],
      required: true,
      defaultValue: "general",
      index: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Notification title",
      },
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      admin: {
        description: "Notification message/body",
        rows: 3,
      },
    },
    {
      name: "fromUser",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "User who triggered this notification (e.g., who liked the profile)",
      },
    },
    {
      name: "isRead",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        description: "Whether the user has read this notification",
      },
    },
    {
      name: "actionUrl",
      type: "text",
      admin: {
        description: "Optional URL to navigate to when notification is clicked",
      },
    },
    {
      name: "metadata",
      type: "json",
      admin: {
        description: "Additional data for the notification",
      },
    },
  ],
  indexes: [
    {
      fields: ["user", "isRead"],
    },
    {
      fields: ["user", "type"],
    },
    {
      fields: ["createdAt"],
    },
  ],
  timestamps: true,
};
