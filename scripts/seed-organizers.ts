import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";

const dummyOrganizers = [
  {
    name: "Tech Innovation Hub",
    about: "Leading technology innovation center focused on fostering entrepreneurship and connecting tech professionals.",
    headerImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop"
  },
  {
    name: "Startup Connect",
    about: "Community-driven platform connecting startups, investors, and professionals in the tech ecosystem.",
    headerImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop"
  },
  {
    name: "Digital Nomads Network",
    about: "Global community for remote workers, digital nomads, and location-independent professionals.",
    headerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
  },
  {
    name: "Women in Tech",
    about: "Empowering women in technology through networking, mentorship, and professional development opportunities.",
    headerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop"
  },
  {
    name: "AI & Machine Learning Society",
    about: "Community of AI researchers, practitioners, and enthusiasts sharing knowledge and advancing the field.",
    headerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
  }
];

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  console.log("🌱 Seeding organizers...");

  for (const organizerData of dummyOrganizers) {
    try {
      // Check if organizer already exists
      const existing = await payload.find({
        collection: "organizers",
        where: {
          name: { equals: organizerData.name }
        },
        limit: 1
      });

      if (existing.docs.length > 0) {
        console.log("⏭️  Organizer already exists:", organizerData.name);
        continue;
      }

      const organizer = await payload.create({
        collection: "organizers",
        data: organizerData
      });

      console.log("➕ Created organizer:", organizerData.name);
    } catch (error) {
      console.error("❌ Error creating organizer:", organizerData.name, error);
    }
  }

  console.log("✅ Organizer seeding complete");
  process.exit(0);
})();
