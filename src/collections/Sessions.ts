import { CollectionConfig } from "payload";

export const Sessions: CollectionConfig = {
  slug: "sessions",
  admin: { useAsTitle: "sessionNumber" },
  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "sessionNumber",
      type: "number",
      required: true,
      admin: { description: "1-based index of this session" },
    },
    {
      name: "startTime",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "timeOnly" } },
    },
    {
      name: "duration",
      type: "number",
      required: true,
      admin: { description: "minutes" },
    },
    {
      name: "topic",
      type: "text",
      required: false,
      admin: { description: "AI-generated discussion topic" },
    },
  ],
};
