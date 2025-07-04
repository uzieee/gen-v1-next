import type { CollectionConfig } from "payload";

export const Attributes: CollectionConfig = {
  slug: "attributes",
  admin: { useAsTitle: "label" },
  fields: [
    { name: "label", type: "text", required: true },
    {
      name: "category",
      type: "relationship",
      relationTo: "attribute-categories",
      required: true,
    },
    { name: "description", type: "textarea" },
    { name: "image", type: "text", required: false },
    {
      name: "users",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: { position: "sidebar" },
    },
  ],
};
