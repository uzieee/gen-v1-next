import { checkOTP } from "@/lib/otp";
import type { CollectionConfig } from "payload";

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
            // optionally: auto-create user here, or return null to force onboarding
            return { user: null };
          }

          // Mark phone number as verified (optional)
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
      // required: true,
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
  ],
};
