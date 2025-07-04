import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "../src/payload.config"; // adjust path as needed

/* ------------------------------------------------------------------ */
/* 1. the language list                                               */
const allLanguages = [
  "Afrikaans",
  "Albanian",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Bengali",
  "Bulgarian",
  "Catalan",
  "Chinese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Italian",
  "Japanese",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Norwegian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swedish",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
  "Kiswahili",
  "Zulu",
  "Xhosa",
  "Amharic",
  "Somali",
  "Tigrinya",
  "Yoruba",
  "Igbo",
  "Hausa",
  "Farsi",
  "Urdu",
  "Malay",
  "Indonesian",
  "Tagalog",
  "Burmese",
  "Thai",
  "Khmer",
  "Lao",
  "Punjabi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Sinhala",
  "Nepali",
  "Mongolian",
  "Kazakh",
  "Uzbek",
  "Kyrgyz",
  "Tajik",
  "Turkmen",
  "Georgian",
  "Macedonian",
  "Bosnian",
  "Montenegrin",
  "Breton",
  "Cornish",
  "Irish",
  "Scottish Gaelic",
  "Welsh",
  "Manx",
  "Sami",
  "Kinyarwanda",
  "Kirundi",
  "Oromo",
  "Akan",
  "Twi",
  "Ewe",
  "Fante",
  "Ga",
];

/* ------------------------------------------------------------------ */
/* 2. seed routine                                                    */
(async () => {
  const payload = await getPayload({
    config: payloadConfig,
  });

  /* ── a. make sure the category exists ──────────────────────────── */
  const { docs: existingCats } = await payload.find({
    collection: "attribute-categories",
    where: { slug: { equals: "languages" } },
    depth: 0,
    limit: 1,
  });

  const langCat =
    existingCats[0] ??
    (await payload.create({
      collection: "attribute-categories",
      data: {
        title: "Languages",
        slug: "languages",
      },
    }));

  /* ── b. create attributes if missing ───────────────────────────── */
  const existingLabels = new Set(
    (
      await payload.find({
        collection: "attributes",
        where: { category: { equals: langCat.id } },
        depth: 0,
        limit: 1000,
      })
    ).docs.map((a) => a.label.toLowerCase())
  );

  for (const label of allLanguages) {
    if (existingLabels.has(label.toLowerCase())) continue;

    await payload.create({
      collection: "attributes",
      data: {
        label,
        category: langCat.id,
      },
    });

    console.log("➕", label);
  }

  console.log("✅  Language attribute seeding complete");
  process.exit(0);
})();
