import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";

const dummyStartups = [
  {
    name: "EcoTech Solutions",
    description: "Revolutionary green technology solutions for sustainable living. We develop innovative products that help reduce environmental impact while improving quality of life.",
    stage: "scaling",
    supportNeeded: ["funding", "mentorship", "collaborators"]
  },
  {
    name: "HealthAI",
    description: "AI-powered healthcare platform that provides personalized medical insights and connects patients with healthcare providers for better outcomes.",
    stage: "building",
    supportNeeded: ["funding", "early-users", "mentorship"]
  },
  {
    name: "RemoteWork Pro",
    description: "Comprehensive platform for remote teams to collaborate, manage projects, and maintain productivity across distributed workforces.",
    stage: "idea",
    supportNeeded: ["collaborators", "tools", "encouragement"]
  },
  {
    name: "EduTech Innovations",
    description: "Interactive learning platform that uses gamification and AI to make education more engaging and effective for students of all ages.",
    stage: "scaling",
    supportNeeded: ["funding", "early-users"]
  },
  {
    name: "FinTech Secure",
    description: "Next-generation financial technology platform providing secure, fast, and transparent financial services for individuals and businesses.",
    stage: "established",
    supportNeeded: ["mentorship", "collaborators"]
  }
];

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  console.log("🌱 Seeding startups...");

  // Get users to assign as startup owners
  const users = await payload.find({
    collection: "users",
    limit: 10
  });

  if (users.docs.length === 0) {
    console.log("❌ No users found. Please run seed-users.ts first.");
    process.exit(1);
  }

  for (let i = 0; i < dummyStartups.length; i++) {
    const startupData = dummyStartups[i];
    const user = users.docs[i % users.docs.length]; // Cycle through users

    try {
      // Check if startup already exists
      const existing = await payload.find({
        collection: "startups",
        where: {
          title: { equals: startupData.name }
        },
        limit: 1
      });

      if (existing.docs.length > 0) {
        console.log("⏭️  Startup already exists:", startupData.name);
        continue;
      }

      const startup = await payload.create({
        collection: "startups",
        data: {
          title: startupData.name,
          description: startupData.description,
          stage: startupData.stage,
          supportNeeded: startupData.supportNeeded,
          user: user.id
        }
      });

      console.log("➕ Created startup:", startupData.name);
    } catch (error) {
      console.error("❌ Error creating startup:", startupData.name, error);
    }
  }

  console.log("✅ Startup seeding complete");
  process.exit(0);
})();
