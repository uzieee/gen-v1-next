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
    website: "https://healthai.com",
    logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
    industry: "Healthcare Technology",
    stage: "Seed",
    foundedYear: 2023,
    employeeCount: "1-10",
    location: "Austin, TX",
    isVerified: true
  },
  {
    name: "RemoteWork Pro",
    description: "Comprehensive platform for remote teams to collaborate, manage projects, and maintain productivity across distributed workforces.",
    website: "https://remoteworkpro.com",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop",
    industry: "SaaS",
    stage: "Pre-Seed",
    foundedYear: 2024,
    employeeCount: "1-10",
    location: "Miami, FL",
    isVerified: false
  },
  {
    name: "EduTech Innovations",
    description: "Interactive learning platform that uses gamification and AI to make education more engaging and effective for students of all ages.",
    website: "https://edutechinnovations.com",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop",
    industry: "EdTech",
    stage: "Series A",
    foundedYear: 2021,
    employeeCount: "51-200",
    location: "New York, NY",
    isVerified: true
  },
  {
    name: "FinTech Secure",
    description: "Next-generation financial technology platform providing secure, fast, and transparent financial services for individuals and businesses.",
    website: "https://fintechsecure.com",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    industry: "Financial Technology",
    stage: "Series B",
    foundedYear: 2020,
    employeeCount: "201-500",
    location: "Seattle, WA",
    isVerified: true
  },
  {
    name: "AgriTech Solutions",
    description: "Smart farming solutions using IoT sensors, AI, and data analytics to optimize crop yields and reduce resource consumption.",
    website: "https://agritechsolutions.com",
    logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop",
    industry: "Agricultural Technology",
    stage: "Seed",
    foundedYear: 2023,
    employeeCount: "11-50",
    location: "Denver, CO",
    isVerified: true
  },
  {
    name: "Social Impact Hub",
    description: "Platform connecting social entrepreneurs with resources, mentors, and funding opportunities to create positive change in communities.",
    website: "https://socialimpacthub.org",
    logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop",
    industry: "Social Impact",
    stage: "Pre-Seed",
    foundedYear: 2024,
    employeeCount: "1-10",
    location: "Portland, OR",
    isVerified: false
  },
  {
    name: "Cybersecurity Shield",
    description: "Advanced cybersecurity solutions for small and medium businesses, providing comprehensive protection against cyber threats.",
    website: "https://cybersecurityshield.com",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
    industry: "Cybersecurity",
    stage: "Series A",
    foundedYear: 2022,
    employeeCount: "51-200",
    location: "Boston, MA",
    isVerified: true
  }
];

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  console.log("🌱 Seeding startups...");

  for (const startupData of dummyStartups) {
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
        data: startupData
      });

      console.log("➕ Created startup:", startupData.name);
    } catch (error) {
      console.error("❌ Error creating startup:", startupData.name, error);
    }
  }

  console.log("✅ Startup seeding complete");
  process.exit(0);
})();
