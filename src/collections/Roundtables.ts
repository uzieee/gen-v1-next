import type { CollectionConfig } from "payload";

export const Roundtables: CollectionConfig = {
  slug: "roundtables",
  admin: {
    useAsTitle: "title",
    description: "Manage roundtable networking sessions",
  },
  fields: [
    {
      name: "title",
      label: "Roundtable Title",
      type: "text",
      required: true,
      admin: {
        description: "The title of the roundtable session",
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      admin: {
        description: "Detailed description of the roundtable topic and goals",
      },
    },
    {
      name: "event",
      label: "Event",
      type: "relationship",
      relationTo: "events",
      required: true,
      admin: {
        description: "The event this roundtable belongs to",
      },
    },
    {
      name: "session",
      label: "Session",
      type: "relationship",
      relationTo: "sessions",
      admin: {
        description: "The specific session within the event",
      },
    },
    {
      name: "topic",
      label: "Topic",
      type: "text",
      required: true,
      admin: {
        description: "Main topic or theme of the roundtable",
      },
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Technology", value: "technology" },
        { label: "Business", value: "business" },
        { label: "Startup", value: "startup" },
        { label: "Investment", value: "investment" },
        { label: "Marketing", value: "marketing" },
        { label: "Product", value: "product" },
        { label: "Leadership", value: "leadership" },
        { label: "Networking", value: "networking" },
        { label: "Industry", value: "industry" },
        { label: "Other", value: "other" },
      ],
      required: true,
      admin: {
        description: "Category of the roundtable",
      },
    },
    {
      name: "maxParticipants",
      label: "Max Participants",
      type: "number",
      required: true,
      defaultValue: 8,
      min: 4,
      max: 12,
      admin: {
        description: "Maximum number of participants (4-12 recommended)",
      },
    },
    {
      name: "duration",
      label: "Duration (minutes)",
      type: "number",
      required: true,
      defaultValue: 45,
      min: 15,
      max: 120,
      admin: {
        description: "Duration of the roundtable in minutes",
      },
    },
    {
      name: "facilitator",
      label: "Facilitator",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "User who will facilitate the roundtable",
      },
    },
    {
      name: "participants",
      label: "Participants",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Users assigned to this roundtable",
        position: "sidebar",
      },
    },
    {
      name: "waitlist",
      label: "Waitlist",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      admin: {
        description: "Users on the waitlist for this roundtable",
        position: "sidebar",
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Open", value: "open" },
        { label: "Full", value: "full" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "draft",
      required: true,
      admin: {
        description: "Current status of the roundtable",
      },
    },
    {
      name: "scheduledAt",
      label: "Scheduled At",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "When the roundtable is scheduled to start",
      },
    },
    {
      name: "location",
      label: "Location",
      type: "group",
      fields: [
        {
          name: "type",
          label: "Location Type",
          type: "select",
          options: [
            { label: "Physical", value: "physical" },
            { label: "Virtual", value: "virtual" },
            { label: "Hybrid", value: "hybrid" },
          ],
          defaultValue: "physical",
        },
        {
          name: "address",
          label: "Address",
          type: "text",
          admin: {
            condition: (data) => data.location?.type === "physical" || data.location?.type === "hybrid",
          },
        },
        {
          name: "room",
          label: "Room/Table",
          type: "text",
          admin: {
            condition: (data) => data.location?.type === "physical" || data.location?.type === "hybrid",
          },
        },
        {
          name: "meetingLink",
          label: "Meeting Link",
          type: "text",
          admin: {
            condition: (data) => data.location?.type === "virtual" || data.location?.type === "hybrid",
          },
        },
        {
          name: "meetingId",
          label: "Meeting ID",
          type: "text",
          admin: {
            condition: (data) => data.location?.type === "virtual" || data.location?.type === "hybrid",
          },
        },
      ],
    },
    {
      name: "iceBreakers",
      label: "Ice Breakers",
      type: "array",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Professional", value: "professional" },
            { label: "Personal", value: "personal" },
            { label: "Fun", value: "fun" },
            { label: "Thought-provoking", value: "thought-provoking" },
          ],
          defaultValue: "professional",
        },
        {
          name: "order",
          type: "number",
          defaultValue: 1,
        },
      ],
      admin: {
        description: "Pre-defined ice breaker questions for this roundtable",
      },
    },
    {
      name: "matchingCriteria",
      label: "Matching Criteria",
      type: "group",
      fields: [
        {
          name: "preferSimilarProfessions",
          label: "Prefer Similar Professions",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "preferSimilarInterests",
          label: "Prefer Similar Interests",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "preferDiverseBackgrounds",
          label: "Prefer Diverse Backgrounds",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "experienceLevel",
          label: "Experience Level",
          type: "select",
          options: [
            { label: "Any", value: "any" },
            { label: "Entry Level", value: "entry" },
            { label: "Mid Level", value: "mid" },
            { label: "Senior Level", value: "senior" },
            { label: "Executive", value: "executive" },
          ],
          defaultValue: "any",
        },
        {
          name: "requiredAttributes",
          label: "Required Attributes",
          type: "relationship",
          relationTo: "attributes",
          hasMany: true,
          admin: {
            description: "Attributes that participants must have",
          },
        },
        {
          name: "preferredAttributes",
          label: "Preferred Attributes",
          type: "relationship",
          relationTo: "attributes",
          hasMany: true,
          admin: {
            description: "Attributes that are preferred but not required",
          },
        },
      ],
      admin: {
        description: "Criteria for matching participants to this roundtable",
      },
    },
    {
      name: "analytics",
      label: "Analytics",
      type: "group",
      fields: [
        {
          name: "totalRegistrations",
          label: "Total Registrations",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "totalParticipants",
          label: "Total Participants",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "satisfactionScore",
          label: "Satisfaction Score",
          type: "number",
          min: 1,
          max: 5,
          admin: {
            description: "Average satisfaction score from participants",
          },
        },
        {
          name: "connectionsMade",
          label: "Connections Made",
          type: "number",
          defaultValue: 0,
          admin: {
            description: "Number of connections made during the roundtable",
          },
        },
        {
          name: "feedback",
          label: "Feedback",
          type: "array",
          fields: [
            {
              name: "participant",
              type: "relationship",
              relationTo: "users",
            },
            {
              name: "rating",
              type: "number",
              min: 1,
              max: 5,
            },
            {
              name: "comment",
              type: "textarea",
            },
            {
              name: "submittedAt",
              type: "date",
            },
          ],
        },
      ],
      admin: {
        description: "Analytics and feedback data for this roundtable",
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return user && user.role === "admin";
    },
    update: ({ req: { user } }) => {
      return user && user.role === "admin";
    },
    delete: ({ req: { user } }) => {
      return user && user.role === "admin";
    },
  },
};
