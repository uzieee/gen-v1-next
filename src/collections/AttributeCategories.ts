import type { CollectionConfig } from "payload";

export const AttributeCategories: CollectionConfig = {
  slug: "attribute-categories",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
  ],
};
