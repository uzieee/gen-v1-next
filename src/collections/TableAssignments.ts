import { CollectionConfig } from "payload";

export const TableAssignments: CollectionConfig = {
  slug: "table-assignments",
  admin: { useAsTitle: "tableNumber" },
  fields: [
    {
      name: "session",
      type: "relationship",
      relationTo: "sessions",
      required: true,
    },
    {
      name: "tableNumber",
      type: "number",
      required: true,
      admin: { description: "1-based table index within session" },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "questions",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          admin: { description: "One AI-generated ice-breaker question" },
        },
      ],
    },
  ],
  indexes: [
    {
      fields: ["session", "tableNumber", "user"],
      unique: true,
    },
  ],
};
