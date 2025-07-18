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
    {
      name: "numberOfSessions",
      label: "How many sessions?",
      type: "number",
      required: true,
      defaultValue: 2,
      admin: { description: "Total 30-min sessions for this event" },
    },
    {
      name: "numberOfTables",
      label: "Tables per session",
      type: "number",
      required: true,
      defaultValue: 4,
    },
    {
      name: "maxUsersPerTable",
      label: "Max users per table",
      type: "number",
      required: true,
      defaultValue: 5,
    },
    {
      name: "sessionDuration",
      label: "Session duration (minutes)",
      type: "number",
      required: true,
      defaultValue: 30,
      admin: { description: "Adjust if you want more/less than 30 minutes" },
    },
  ],
};

// Each event should have a round table sessions, for each event we have a finite number of physical tables which have to be accounted for
// each round table has a finite number of seats that also varies depending on the event... now we need to
