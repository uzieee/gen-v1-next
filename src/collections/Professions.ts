// collections/Professions.ts
import { CollectionConfig } from "payload";

export const Professions: CollectionConfig = {
  slug: "professions",
  admin: { useAsTitle: "jobTitle" },

  /* 1 profession per user */
  indexes: [{ fields: ["user"], unique: true }],

  fields: [
    /* owner */
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },

    /* professional field -> Attribute */
    {
      name: "professionalField",
      type: "relationship",
      relationTo: "attributes",
      required: true,
      admin: {
        description: 'Attribute from "professional-fields" category',
      },
    },

    /* title & optional description */
    { name: "jobTitle", type: "text", required: true },
    {
      name: "jobDescription",
      type: "textarea",
      admin: { rows: 4 },
    },
  ],
};
