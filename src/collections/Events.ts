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
