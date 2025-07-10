import { addSlug } from "@/payload-hooks/add-slug";
import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: { useAsTitle: "name" },

  hooks: { beforeValidate: [addSlug] },

  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", unique: true, index: true },

    /* when & where */
    {
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "streetAddress", type: "text", required: true },
    {
      name: "location",
      type: "point", // GeoJSON point
      required: true,
      admin: { description: "lat / lng for map display" },
    },
    {
      name: "headerImage",
      type: "text",
      admin: {
        components: {
          Field:
            "./components/payload-admin/CloudinaryField.tsx#CloudinaryField",
          // Cell : ({ data }) =>
          //   data ? <img src={data} style={{ width: 40 }} /> : null,
        },
      },
    },

    /* meta */
    { name: "about", type: "textarea" },

    /* relations */
    {
      name: "organizer",
      type: "relationship",
      relationTo: "organizers",
      required: true,
    },
    {
      name: "categories",
      label: "Categories",
      type: "select",
      hasMany: true,
      options: [
        { label: "Tech", value: "tech" },
        { label: "Cultural", value: "cultural" },
        { label: "Social", value: "social" },
        { label: "Networking", value: "networking" },
        { label: "Workshop", value: "workshop" },
        { label: "Conference", value: "conference" },
        { label: "Fund-raising", value: "fundraising" },
        { label: "Well-being", value: "wellbeing" },
        { label: "Arts", value: "arts" },
        { label: "Sports", value: "sports" },
        { label: "Other", value: "other" },
      ],
      required: true, // must pick at least one
    },

    /* ticketing */
    { name: "capacity", type: "number", min: 1, required: true },
    {
      name: "ticketsSold",
      type: "number",
      defaultValue: 0,
      admin: { readOnly: true },
    },
  ],
};
