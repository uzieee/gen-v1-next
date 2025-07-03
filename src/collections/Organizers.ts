import { addSlug } from "@/payload-hooks/add-slug";
import { CollectionConfig } from "payload";

export const Organizers: CollectionConfig = {
  slug: "organizers",
  admin: { useAsTitle: "name" },

  hooks: { beforeValidate: [addSlug] },

  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", unique: true, index: true },
    { name: "about", type: "textarea" },

    {
      name: "events",
      type: "relationship",
      relationTo: "events",
      hasMany: true,
      admin: { position: "sidebar" },
    },
  ],
};
