import "dotenv/config";
import fs from "fs";
import { parse } from "csv-parse/sync";
// import { parse as parseDateFns } from "date-fns";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config";
import crypto from "crypto";

/** Helper to parse MM/DD/YY into YYYY-MM-DD */
function parseDOB(str?: string): string | undefined {
  if (!str) return;
  const parts = str.split("/");
  if (parts.length !== 3) return;

  const [mRaw, dRaw, yRaw] = parts;
  const m = parseInt(mRaw, 10);
  const d = parseInt(dRaw, 10);
  const y = parseInt(yRaw, 10);
  if ([m, d, y].some((n) => Number.isNaN(n))) return;

  // two-digit year → 19xx / 20xx
  const now2 = new Date().getFullYear() % 100;
  const fullYear = y > now2 ? 1900 + y : 2000 + y;

  const dt = new Date(fullYear, m - 1, d);
  if (isNaN(dt.getTime())) return;
  return dt.toISOString().slice(0, 10);
}

/** Split a comma/semicolon list into trimmed items */
function splitList(str?: string): string[] {
  if (!str) return [];
  return str
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

(async () => {
  const file = fs.readFileSync("./scripts/gen-final.csv", "utf8");
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
  }) as Record<string, string>[];

  const payload = await getPayload({
    config: payloadConfig,
  });

  // 1) Ensure categories exist
  const categories = [
    { slug: "spoken-languages", title: "Spoken Languages" },
    { slug: "learning-languages", title: "Learning Languages" },
    { slug: "countries", title: "Countries" },
    { slug: "interests", title: "Interests & Hobbies" },
    { slug: "professional-fields", title: "Professional Fields" },
  ];
  const catMap: Record<string, string> = {};
  for (const { slug, title } of categories) {
    const { docs } = await payload.find({
      collection: "attribute-categories",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (docs[0]) {
      catMap[slug] = docs[0].id;
    } else {
      const cat = await payload.create({
        collection: "attribute-categories",
        data: { slug, title },
      });
      catMap[slug] = cat.id;
    }
  }

  // 2) Pre-load existing attributes per category
  const attrCache: Record<string, Record<string, string>> = {};
  for (const slug of Object.keys(catMap)) {
    const { docs } = await payload.find({
      collection: "attributes",
      where: { category: { equals: catMap[slug] } },
      limit: 1000,
    });
    attrCache[slug] = {};
    for (const a of docs) {
      attrCache[slug][a.label.toLowerCase()] = a.id;
    }
  }

  // CSV‐header keys (exact)
  const keys = {
    spoken:
      "List every language you can speak and understand (conversational or higher) 🗣️",
    learning: "List every language you're learning 📚 (optional) ",
    countries:
      "Where in the world do you feel connected? 🌐 List the countries t...lived experience, work, meaningful travel, or upcoming plans) ✈️",
    interests:
      "Pick your favorite ways to spend time or spark conversation. Sel...her” to add your own or elaborate on selection(s). 💭 *Choose 3-5",
    gender: "Gender 👤",
    dob: "Birthdate (MM/DD/YY) 📆 *Onboarding purposes only",
    industry: "What industry do you work in (or want to work in)? 🛠️",
    role: "Describe your current role or title  (official or self-described)  🎯",
    company: "What company do you work for? (optional) ⚡️",
    building:
      "Are you building on a startup or working on a passion project? 💡",
  };

  for (const rec of records) {
    console.log("rec-key:", rec.email);
    // console.log("rec-value", Object.values(rec).join(","));
    try {
      // 3a) Build attribute-IDs lists
      const toAttr = [];
      for (const [slugKey, catSlug] of [
        ["spoken", "spoken-languages"],
        ["learning", "learning-languages"],
        ["countries", "countries"],
        ["interests", "interests"],
      ] as const) {
        const items = splitList(rec[keys[slugKey]]);
        for (const label of items) {
          const lc = label.toLowerCase();
          let id = attrCache[catSlug][lc];
          if (!id) {
            const a = await payload.create({
              collection: "attributes",
              data: { label, category: catMap[catSlug] },
            });
            id = a.id;
            attrCache[catSlug][lc] = id;
          }
          toAttr.push(id);
        }
      }

      // 3b) Create the user
      const fullName =
        rec.name?.trim() || `${rec.first_name} ${rec.last_name}`.trim();
      const dob = parseDOB(rec[keys.dob]!);
      const user = await payload.create({
        collection: "users",
        data: {
          fullName,
          email: rec.email?.trim().toLowerCase(),
          phoneNumber: "+" + (rec.phone_number || "").trim(),
          dateOfBirth: dob,
          gender: rec[keys.gender]?.trim(),
          isPhoneNumberVerified: true,
          isEmailVerified: true,
          role: "member",
          password: crypto.randomBytes(12).toString("base64url"),
        },
      });

      // 3c) Link attributes
      if (toAttr.length) {
        await payload.update({
          collection: "users",
          id: user.id,
          data: { attributes: toAttr },
        });
      }

      // 4) Profession
      const industryLabels = splitList(rec[keys.industry]);
      if (industryLabels.length) {
        const indLabel = industryLabels[0];
        // upsert attribute
        const pfSlug = "professional-fields";
        let pfId = attrCache[pfSlug][indLabel.toLowerCase()];
        if (!pfId) {
          const a = await payload.create({
            collection: "attributes",
            data: { label: indLabel, category: catMap[pfSlug] },
          });
          pfId = a.id;
          attrCache[pfSlug][indLabel.toLowerCase()] = pfId;
        }
        // create profession
        const prof = await payload.create({
          collection: "professions",
          data: {
            user: user.id,
            professionalField: pfId,
            jobTitle: rec[keys.role]?.trim() || indLabel,
          },
        });
        // link back
        await payload.update({
          collection: "users",
          id: user.id,
          data: { profession: prof },
        });
      }

      // 5) Startup (barebones)
      const building = rec[keys.building]?.toLowerCase().startsWith("y");
      if (building) {
        const title = rec[keys.company]?.trim() || `${fullName}'s Startup`;
        const desc = industryLabels.join(", ");
        const st = await payload.create({
          collection: "startups",
          data: {
            user: user.id,
            title,
            description: desc,
            stage: "building",
          },
        });
        await payload.update({
          collection: "users",
          id: user.id,
          data: { startups: [st.id] },
        });
      }

      console.log("✅ Imported", fullName);
    } catch (err) {
      console.error("❌ Failed row:", rec.name, err);
    }
  }

  console.log("🔚 Migration complete");
  process.exit(0);
})();
