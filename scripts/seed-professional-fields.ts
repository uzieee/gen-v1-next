import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";

const professionalFields = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "UI/UX Design",
  "Marketing",
  "Sales",
  "Customer Success",
  "Finance",
  "Accounting",
  "Legal",
  "Human Resources",
  "Recruiting",
  "Operations",
  "Supply Chain",
  "Business Development",
  "Strategy & Consulting",
  "Project Management",
  "Quality Assurance",
  "DevOps",
  "IT Support",
  "Cybersecurity",
  "Machine Learning",
  "Research & Development",
  "Content Writing",
  "Graphic Design",
  "Motion Graphics",
  "Video Production",
  "Public Relations",
  "Event Management",
  "Education & Training",
  "Healthcare",
  "Nursing",
  "Medicine",
  "Pharmacy",
  "Architecture",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Environmental Science",
  "Agriculture",
  "Journalism",
  "Photography",
  "Real Estate",
  "Hospitality",
  "Tourism",
  "Retail",
  "E-commerce",
  "Game Development",
  "Blockchain",
  "AI Ethics",
] as const;

(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  /* 1 ─ ensure category exists */
  const { docs: cats } = await payload.find({
    collection: "attribute-categories",
    where: { slug: { equals: "professional-fields" } },
    depth: 0,
    limit: 1,
  });

  const category =
    cats[0] ??
    (await payload.create({
      collection: "attribute-categories",
      data: { title: "Professional Fields", slug: "professional-fields" },
    }));

  /* 2 ─ collect existing labels */
  const existing = await payload.find({
    collection: "attributes",
    where: { category: { equals: category.id } },
    depth: 0,
    limit: 1000,
  });

  const existingLabels = new Set(
    existing.docs.map((a) => a.label.toLowerCase())
  );

  /* 3 ─ insert missing */
  for (const label of professionalFields) {
    if (existingLabels.has(label.toLowerCase())) continue;

    await payload.create({
      collection: "attributes",
      data: {
        label,
        category: category.id,
      },
    });

    console.log("➕", label);
  }

  console.log("✅ Professional-field attribute seeding complete");
  process.exit(0);
})();
