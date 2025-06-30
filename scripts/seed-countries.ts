/**
 * Seed “Countries” attributes
 *  - Creates / re-uses the AttributeCategory with slug `countries`
 *  - Adds each country as an Attribute with its 🇺🇸 flag in `image`
 *  - Idempotent: skips any label that already exists in that category
 */

import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config"; // adjust path if needed

/* ------------------------------------------------------------------ */
/* Country data                                                        */
const allCountries = [
  { name: "Afghanistan", icon: "🇦🇫" },
  { name: "Canada", icon: "🇨🇦" },
  { name: "United States", icon: "🇺🇸" },
  { name: "Mexico", icon: "🇲🇽" },
  { name: "United Kingdom", icon: "🇬🇧" },
  { name: "Germany", icon: "🇩🇪" },
  { name: "France", icon: "🇫🇷" },
  { name: "Spain", icon: "🇪🇸" },
  { name: "Italy", icon: "🇮🇹" },
  { name: "Australia", icon: "🇦🇺" },
  { name: "India", icon: "🇮🇳" },
  { name: "China", icon: "🇨🇳" },
  { name: "Japan", icon: "🇯🇵" },
  { name: "South Korea", icon: "🇰🇷" },
  { name: "Brazil", icon: "🇧🇷" },
  { name: "Argentina", icon: "🇦🇷" },
  { name: "South Africa", icon: "🇿🇦" },
  { name: "Nigeria", icon: "🇳🇬" },
  { name: "Egypt", icon: "🇪🇬" },
  { name: "Russia", icon: "🇷🇺" },
  { name: "Turkey", icon: "🇹🇷" },
  { name: "Saudi Arabia", icon: "🇸🇦" },
  { name: "United Arab Emirates", icon: "🇦🇪" },
  { name: "Indonesia", icon: "🇮🇩" },
  { name: "Malaysia", icon: "🇲🇾" },
  { name: "Philippines", icon: "🇵🇭" },
  { name: "Thailand", icon: "🇹🇭" },
  { name: "Vietnam", icon: "🇻🇳" },
  { name: "Singapore", icon: "🇸🇬" },
  { name: "New Zealand", icon: "🇳🇿" },
  { name: "Ireland", icon: "🇮🇪" },
  { name: "Netherlands", icon: "🇳🇱" },
  { name: "Belgium", icon: "🇧🇪" },
  { name: "Sweden", icon: "🇸🇪" },
  { name: "Norway", icon: "🇳🇴" },
  { name: "Denmark", icon: "🇩🇰" },
  { name: "Finland", icon: "🇫🇮" },
  { name: "Poland", icon: "🇵🇱" },
  { name: "Czech Republic", icon: "🇨🇿" },
  { name: "Hungary", icon: "🇭🇺" },
  { name: "Greece", icon: "🇬🇷" },
  { name: "Portugal", icon: "🇵🇹" },
  { name: "Romania", icon: "🇷🇴" },
  { name: "Bulgaria", icon: "🇧🇬" },
  { name: "Croatia", icon: "🇭🇷" },
  { name: "Slovakia", icon: "🇸🇰" },
  { name: "Slovenia", icon: "🇸🇮" },
  { name: "Austria", icon: "🇦🇹" },
  { name: "Switzerland", icon: "🇨🇭" },
  { name: "Iceland", icon: "🇮🇸" },
  { name: "Luxembourg", icon: "🇱🇺" },
  { name: "Malta", icon: "🇲🇹" },
  { name: "Cyprus", icon: "🇨🇾" },
  { name: "Estonia", icon: "🇪🇪" },
  { name: "Latvia", icon: "🇱🇻" },
  { name: "Lithuania", icon: "🇱🇹" },
  { name: "Ukraine", icon: "🇺🇦" },
  { name: "Belarus", icon: "🇧🇾" },
  { name: "Kazakhstan", icon: "🇰🇿" },
  { name: "Uzbekistan", icon: "🇺🇿" },
  { name: "Kyrgyzstan", icon: "🇰🇬" },
  { name: "Tajikistan", icon: "🇹🇯" },
  { name: "Turkmenistan", icon: "🇹🇲" },
  { name: "Azerbaijan", icon: "🇦🇿" },
  { name: "Armenia", icon: "🇦🇲" },
  { name: "Georgia", icon: "🇬🇪" },
  { name: "Mongolia", icon: "🇲🇳" },
  { name: "North Korea", icon: "🇰🇵" },
  { name: "Taiwan", icon: "🇹🇼" },
  { name: "Hong Kong", icon: "🇭🇰" },
  { name: "Macau", icon: "🇲🇴" },
  { name: "Brunei", icon: "🇧🇳" },
  { name: "Cambodia", icon: "🇰🇭" },
  { name: "Laos", icon: "🇱🇦" },
  { name: "Myanmar (Burma)", icon: "🇲🇲" },
  { name: "Sri Lanka", icon: "🇱🇰" },
  { name: "Bangladesh", icon: "🇧🇩" },
  { name: "Nepal", icon: "🇳🇵" },
  { name: "Bhutan", icon: "🇧🇹" },
  { name: "Maldives", icon: "🇲🇻" },
  { name: "Rwanda", icon: "🇷🇼" },
  { name: "Kenya", icon: "🇰🇪" },
  { name: "Uganda", icon: "🇺🇬" },
  { name: "Tanzania", icon: "🇹🇿" },
  { name: "Zimbabwe", icon: "🇿🇼" },
  { name: "Zambia", icon: "🇿🇲" },
  { name: "Botswana", icon: "🇧🇼" },
  { name: "Namibia", icon: "🇳🇦" },
  { name: "Angola", icon: "🇦🇴" },
  { name: "Mozambique", icon: "🇲🇿" },
  { name: "Ghana", icon: "🇬🇭" },
  { name: "Ivory Coast", icon: "🇨🇮" },
  { name: "Senegal", icon: "🇸🇳" },
  { name: "Mali", icon: "🇲🇱" },
  { name: "Burkina Faso", icon: "🇧🇫" },
  { name: "Niger", icon: "🇳🇪" },
  { name: "Chad", icon: "🇹🇩" },
  { name: "Cameroon", icon: "🇨🇲" },
  { name: "Gabon", icon: "🇬🇦" },
  { name: "Congo (Brazzaville)", icon: "🇨🇬" },
  { name: "DRC", icon: "🇨🇩" },
  { name: "Central African Republic", icon: "🇨🇫" },
  { name: "Sao Tome and Principe", icon: "🇸🇹" },
  { name: "Equatorial Guinea", icon: "🇬🇶" },
  { name: "Sierra Leone", icon: "🇸🇱" },
  { name: "Liberia", icon: "🇱🇷" },
  { name: "Guinea", icon: "🇬🇳" },
  { name: "Guinea-Bissau", icon: "🇬🇼" },
  { name: "Cape Verde", icon: "🇨🇻" },
  { name: "Togo", icon: "🇹🇬" },
  { name: "Benin", icon: "🇧🇯" },
] as const;

/* ------------------------------------------------------------------ */
/* Seed routine                                                        */
(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  /* 1 ─ ensure category exists */
  const { docs: cats } = await payload.find({
    collection: "attribute-categories",
    where: { slug: { equals: "countries" } },
    depth: 0,
    limit: 1,
  });

  const countryCat =
    cats[0] ??
    (await payload.create({
      collection: "attribute-categories",
      data: { title: "Countries", slug: "countries" },
    }));

  /* 2 ─ fetch existing labels to avoid duplicates */
  const existing = await payload.find({
    collection: "attributes",
    where: { category: { equals: countryCat.id } },
    depth: 0,
    limit: 1000,
  });

  const existingLabels = new Set(
    existing.docs.map((a) => a.label.toLowerCase())
  );

  /* 3 ─ create missing attributes */
  for (const { name, icon } of allCountries) {
    if (existingLabels.has(name.toLowerCase())) continue;

    await payload.create({
      collection: "attributes",
      data: {
        label: name,
        image: icon, // flag emoji stored in `image`
        category: countryCat.id,
      },
    });

    console.log("➕", name);
  }

  console.log("✅ Country attribute seeding complete");
  process.exit(0);
})();
