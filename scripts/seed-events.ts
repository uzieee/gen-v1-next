import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";

const dummyEvents = [
  {
    name: "Tech Networking Mixer 2024",
    date: new Date("2024-12-15T18:00:00Z"),
    streetAddress: "123 Innovation Drive, San Francisco, CA 94105",
    headerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
    about: "Join us for an evening of networking with tech professionals, entrepreneurs, and innovators. Connect with like-minded individuals and discover new opportunities in the tech industry.",
    categories: ["tech", "networking", "social"],
    capacity: 100,
    ticketsSold: 0,
    numberOfSessions: 3,
    numberOfTables: 8,
    maxUsersPerTable: 6,
    sessionDuration: 30
  },
  {
    name: "Startup Pitch Night",
    date: new Date("2024-12-20T19:00:00Z"),
    streetAddress: "456 Startup Street, Austin, TX 78701",
    headerImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    about: "Watch innovative startups pitch their ideas to a panel of investors and industry experts. Great opportunity to learn about emerging technologies and business models.",
    categories: ["tech", "conference", "fundraising"],
    capacity: 150,
    ticketsSold: 0,
    numberOfSessions: 4,
    numberOfTables: 10,
    maxUsersPerTable: 5,
    sessionDuration: 30
  },
  {
    name: "Digital Nomads Meetup",
    date: new Date("2024-12-18T17:00:00Z"),
    streetAddress: "789 Remote Lane, Miami, FL 33101",
    headerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    about: "Connect with fellow digital nomads, remote workers, and location-independent professionals. Share experiences, tips, and build your global network.",
    categories: ["social", "networking", "workshop"],
    capacity: 80,
    ticketsSold: 0,
    numberOfSessions: 2,
    numberOfTables: 6,
    maxUsersPerTable: 7,
    sessionDuration: 30
  },
  {
    name: "Women in Tech Leadership Summit",
    date: new Date("2024-12-22T09:00:00Z"),
    streetAddress: "321 Empowerment Ave, New York, NY 10001",
    headerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
    about: "A full-day summit featuring keynote speakers, panel discussions, and networking opportunities for women in technology leadership roles.",
    categories: ["tech", "conference", "cultural"],
    capacity: 200,
    ticketsSold: 0,
    numberOfSessions: 6,
    numberOfTables: 12,
    maxUsersPerTable: 6,
    sessionDuration: 30
  },
  {
    name: "AI & ML Workshop Series",
    date: new Date("2024-12-25T10:00:00Z"),
    streetAddress: "654 AI Boulevard, Seattle, WA 98101",
    headerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    about: "Hands-on workshops covering the latest developments in artificial intelligence and machine learning. Perfect for both beginners and experienced practitioners.",
    categories: ["tech", "workshop"],
    capacity: 60,
    ticketsSold: 0,
    numberOfSessions: 4,
    numberOfTables: 8,
    maxUsersPerTable: 4,
    sessionDuration: 45
  }
];

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  console.log("🌱 Seeding events...");

  // Get organizers to assign to events
  const organizers = await payload.find({
    collection: "organizers",
    limit: 10
  });

  if (organizers.docs.length === 0) {
    console.log("❌ No organizers found. Please run seed-organizers.ts first.");
    process.exit(1);
  }

  for (let i = 0; i < dummyEvents.length; i++) {
    const eventData = dummyEvents[i];
    const organizer = organizers.docs[i % organizers.docs.length]; // Cycle through organizers

    try {
      // Check if event already exists
      const existing = await payload.find({
        collection: "events",
        where: {
          or: [
            { slug: { equals: eventData.slug } },
            { name: { equals: eventData.name } }
          ]
        },
        limit: 1
      });

      if (existing.docs.length > 0) {
        console.log("⏭️  Event already exists:", eventData.name);
        continue;
      }

      const event = await payload.create({
        collection: "events",
        data: {
          ...eventData,
          organizer: organizer.id
        }
      });

      console.log("➕ Created event:", eventData.name);
    } catch (error) {
      console.error("❌ Error creating event:", eventData.name, error);
    }
  }

  console.log("✅ Event seeding complete");
  process.exit(0);
})();
