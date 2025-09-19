import { CollectionConfig } from "payload";

export const PasswordResetTokens: CollectionConfig = {
  slug: "password-reset-tokens",
  admin: { 
    useAsTitle: "token",
    defaultColumns: ["user", "token", "expiresAt", "used"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
      admin: {
        description: "User requesting password reset",
      },
    },
    {
      name: "token",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Unique reset token",
        readOnly: true,
      },
    },
    {
      name: "expiresAt",
      type: "date",
      required: true,
      index: true,
      admin: {
        description: "Token expiration date",
      },
    },
    {
      name: "used",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        description: "Whether this token has been used",
      },
    },
    {
      name: "usedAt",
      type: "date",
      admin: {
        description: "When the token was used",
      },
    },
  ],
  indexes: [
    {
      fields: ["token"],
      unique: true,
    },
    {
      fields: ["user", "used"],
    },
    {
      fields: ["expiresAt"],
    },
  ],
  timestamps: true,
};
