import { addTicketCode } from "@/payload-hooks/add-ticket-code";
import { capacityGuard } from "@/payload-hooks/capacity-guard";
import { incrementTicketCounter } from "@/payload-hooks/increment-ticket-counter";
import { CollectionConfig } from "payload";

export const Tickets: CollectionConfig = {
  slug: "tickets",
  admin: { useAsTitle: "code" },

  hooks: {
    beforeValidate: [addTicketCode],
    beforeChange: [capacityGuard],
    afterChange: [incrementTicketCounter],
  },

  indexes: [
    /* one ticket per user per event */
    { fields: ["event", "user"], unique: true },
  ],

  fields: [
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
    },

    { name: "seatNumber", type: "text" },
    { name: "tableNumber", type: "text" },

    {
      name: "code",
      type: "text",
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
  ],
};
