// collections/Startups.ts
import { CollectionConfig } from "payload";

export const Startups: CollectionConfig = {
  slug: "startups",
  admin: { useAsTitle: "title" },

  fields: [
    /* owner */
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },

    /* basic info */
    { name: "title", type: "text", required: false },

    {
      name: "stage",
      type: "select",
      options: [
        { label: "Established", value: "established" },
        { label: "Building", value: "building" },
        { label: "Scaling", value: "scaling" },
        { label: "Still an idea", value: "idea" },
      ],
      required: true,
    },

    { name: "description", type: "textarea", admin: { rows: 5 } },

    /* industries (1..n) */
    {
      name: "industries",
      type: "relationship",
      relationTo: "attributes",
      hasMany: true,
      required: true,
      admin: { description: 'Attribute(s) from "professional-fields"' },
    },

    /* support wanted */
    {
      name: "supportNeeded",
      label: "Support needed",
      type: "select",
      hasMany: true,
      options: [
        { label: "Funding", value: "funding" },
        { label: "Mentorship", value: "mentorship" },
        { label: "Collaborators", value: "collaborators" },
        { label: "Tools & Resources", value: "tools" },
        { label: "Early users", value: "early-users" },
        { label: "Encouragement", value: "encouragement" },
        { label: "Other", value: "other" },
      ],
    },
    // {
    //   name: "supportOther",
    //   label: "Other (write-in)",
    //   type: "text",
    //   admin: {
    //     condition: (_, siblingData) =>
    //       (siblingData.supportNeeded as string[] | undefined)?.includes(
    //         "other"
    //       ),
    //   },
    // },
  ],
};
