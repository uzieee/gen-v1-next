import { checkOTP } from "@/lib/otp";
import { generateAffinity } from "@/payload-hooks/generate-affinity";
import { generateUserBio } from "@/payload-hooks/generate-user-bio";
import type { CollectionConfig } from "payload";

/* simple label component */
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    // disableLocalStrategy: true,
    strategies: [
      {
        name: "otp-phone",
        authenticate: async ({ payload, headers }) => {
          const phoneNumber = headers.get("x-phone-number");
          const otp = headers.get("x-otp-code");

          if (!phoneNumber || !otp) {
            return { user: null };
          }

          const isValid = await checkOTP(phoneNumber, otp);
          if (!isValid) {
            return { user: null };
          }

          // Look up user by phone number
          const result = await payload.find({
            collection: "users",
            where: { phoneNumber: { equals: phoneNumber } },
          });

          const user = result.docs[0];

          if (!user) {
            return { user: null };
          }

          await payload.update({
            collection: "users",
            id: user.id,
            data: { isPhoneNumberVerified: true },
          });

          return {
            user: {
              collection: "users",
              ...user,
            },
          };
        },
      },
    ],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
    },
    {
      name: "gender",
      type: "text",
    },
    {
      name: "dateOfBirth",
      type: "date",
      required: false,
    },
    {
      name: "phoneNumber",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
      ],
      defaultValue: "member",
      required: true,
      index: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "isPhoneNumberVerified",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "isEmailVerified",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "attributes",
      type: "relationship",
      relationTo: "attributes",
      hasMany: true,
      admin: { position: "sidebar" },
    },
    {
      name: "profileImage",
      label: "Profile image URL",
      type: "text",
      admin: {
        components: {
          Field:
            "./components/payload-admin/ProfileImageField.tsx#ProfileImageField",
          Cell: "./components/payload-admin/ProfileImageCell.tsx#ProfileImageCell",
        },
      },
    },

    /* Gallery (array of URLs) */
    {
      name: "galleryImages",
      label: "Gallery",
      type: "array",
      admin: {
        components: {
          RowLabel:
            "./components/payload-admin/GalleryRowLabel.tsx#GalleryRowLabel",
        },
      },
      fields: [{ name: "url", type: "text", required: true }],
    },
    {
      name: "status",
      label: "Account Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Disabled", value: "disabled" },
        { label: "Flagged", value: "flagged" },
      ],
      defaultValue: "active",
      // required: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Toggle to disable or flag a user account",
      },
    },
    {
      name: "bio",
      label: "Auto bio",
      type: "textarea",
      admin: {
        description:
          "Generated from profile details; editable by admins if needed.",
        rows: 3,
      },
    },
    {
      name: "profession",
      type: "relationship",
      relationTo: "professions",
      hasMany: false, // single current profession
      admin: { position: "sidebar" },
    },
    {
      name: "startups",
      type: "relationship",
      relationTo: "startups",
      hasMany: true, // user can own multiple
      admin: { position: "sidebar" },
    },
    { name: "affinitySignature", type: "text", index: true },
    { name: "affinityVector", type: "json" },
    {
      name: "instagramHandle",
      label: "Instagram Handle",
      type: "text",
      admin: {
        description: "Instagram username without @ symbol",
      },
    },
    {
      name: "website",
      label: "Website URL",
      type: "text",
      admin: {
        description: "Personal or professional website URL",
      },
    },
    {
      name: "publicEmail",
      label: "Public Email",
      type: "email",
      admin: {
        description: "Email address to display publicly on profile",
      },
    },
    {
      name: "likedProfiles",
      label: "Liked Profiles",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Profiles that this user has liked",
        position: "sidebar",
      },
    },
    {
      name: "emailNotifications",
      label: "Email Notifications",
      type: "group",
      fields: [
        {
          name: "profileLikes",
          label: "Profile Likes",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Receive email notifications when someone likes your profile",
          },
        },
        {
          name: "eventReminders",
          label: "Event Reminders",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Receive email reminders for upcoming events",
          },
        },
        {
          name: "roundTableInvites",
          label: "Round Table Invites",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Receive email notifications for round table invitations",
          },
        },
        {
          name: "newsletter",
          label: "Newsletter",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Receive our newsletter with updates and tips",
          },
        },
      ],
      admin: {
        position: "sidebar",
        description: "Manage email notification preferences",
      },
    },
  ],
  hooks: {
    afterChange: [generateAffinity, generateUserBio],
  },
};
