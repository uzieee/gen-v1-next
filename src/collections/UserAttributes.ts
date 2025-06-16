// collections/UserAttributes.ts
import { CollectionConfig } from "payload";

export const UserAttributes: CollectionConfig = {
  slug: "user-attributes",
  admin: { useAsTitle: "id" },

  fields: [
    /* FK → Users */
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
    },
    /* FK → Attributes */
    {
      name: "attribute",
      type: "relationship",
      relationTo: "attributes",
      required: true,
      index: true,
    },
  ],

  //   /* prevent duplicate pair */
  //   hooks: {
  //     beforeValidate: [
  //       async ({ data, req }) => {
  //         const existing = await req.payload.find({
  //           collection: "user-attributes",
  //           where: {
  //             and: [
  //               { user: { equals: data.user } },
  //               { attribute: { equals: data.attribute } },
  //             ],
  //           },
  //           depth: 0,
  //         });
  //         if (existing.totalDocs) {
  //           throw new Error("User already has this attribute");
  //         }
  //       },
  //     ],
  //   },
};
