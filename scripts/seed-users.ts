import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";

const dummyUsers = [
  {
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNumber: "+1234567890",
    password: "password123",
    gender: "Non-binary",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Love working on innovative projects and mentoring junior developers.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
      { url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "Sarah Chen",
    email: "sarah.chen@example.com",
    phoneNumber: "+1234567891",
    password: "password123",
    gender: "Female",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Product manager with a background in design and user research. Passionate about creating products that make a real difference in people's lives.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    phoneNumber: "+1234567892",
    password: "password123",
    gender: "Male",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Data scientist and machine learning engineer. I love turning complex data into actionable insights and building AI solutions.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "Emily Watson",
    email: "emily.watson@example.com",
    phoneNumber: "+1234567893",
    password: "password123",
    gender: "Female",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "UX/UI designer with a passion for creating beautiful and functional digital experiences. Always learning and exploring new design trends.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "David Kim",
    email: "david.kim@example.com",
    phoneNumber: "+1234567894",
    password: "password123",
    gender: "Male",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Marketing strategist and growth hacker. I help startups and established companies scale their user acquisition and retention.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    phoneNumber: "+1234567895",
    password: "password123",
    gender: "Female",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Full-stack developer specializing in React and Node.js. I enjoy building scalable web applications and contributing to open source projects.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phoneNumber: "+1234567896",
    password: "password123",
    gender: "Male",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "DevOps engineer with expertise in cloud infrastructure and automation. I help teams deploy and scale applications efficiently.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" }
    ]
  },
  {
    fullName: "Maria Garcia",
    email: "maria.garcia@example.com",
    phoneNumber: "+1234567897",
    password: "password123",
    gender: "Female",
    role: "member",
    isPhoneNumberVerified: true,
    isEmailVerified: true,
    status: "active",
    bio: "Business analyst and consultant. I help organizations optimize their processes and make data-driven decisions.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face" }
    ]
  }
];

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  console.log("🌱 Seeding users...");

  for (const userData of dummyUsers) {
    try {
      // Check if user already exists
      const existing = await payload.find({
        collection: "users",
        where: {
          or: [
            { email: { equals: userData.email } },
            { phoneNumber: { equals: userData.phoneNumber } }
          ]
        },
        limit: 1
      });

      if (existing.docs.length > 0) {
        console.log("⏭️  User already exists:", userData.fullName);
        continue;
      }

      const user = await payload.create({
        collection: "users",
        data: userData
      });

      console.log("➕ Created user:", userData.fullName);
    } catch (error) {
      console.error("❌ Error creating user:", userData.fullName, error);
    }
  }

  console.log("✅ User seeding complete");
  process.exit(0);
})();
