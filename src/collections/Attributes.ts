import type { CollectionConfig, CollectionSlug } from "payload";

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
  ],
};
