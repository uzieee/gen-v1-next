/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAI } from "openai";

export const GPT_MODELS = {
  gpt4Mini: "gpt-4o-mini",
  gpt4o: "gpt-4o",
  gtp35Turbo: "gpt-3.5-turbo",
} as const;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Auto-generates a short third-person bio for new users.
 * Runs only on `create`, skips if `bio` already exists.
 */
export const generateUserBio = async ({
  doc,
  previousDoc,
  operation,
  req,
}: any) => {
  /* ────────────────────────────── 1  Early-exit guards ───────────────────────────── */
  const attrsArr = (doc.attributes as any[]) ?? [];
  const professionId = doc.profession;
  const startupsIds = (doc.startups as string[]) ?? [];

  // Must have at least one data point (attributes or profession or startup)
  if (attrsArr.length === 0 && !professionId && startupsIds.length === 0)
    return;

  // Skip if user manually set bio
  if (doc.bio) return;

  // Run on create OR if relevant data changed
  const created = operation === "create";

  const attributesChanged =
    !created &&
    JSON.stringify(attrsArr.map((a) => a.id).sort()) !==
      JSON.stringify(
        ((previousDoc?.attributes as any[]) ?? []).map((a) => a.id).sort()
      );

  const professionChanged =
    !created &&
    previousDoc?.profession?.toString() !== professionId?.toString();

  const startupsChanged =
    !created &&
    JSON.stringify(startupsIds.sort()) !==
      JSON.stringify(((previousDoc?.startups as string[]) ?? []).sort());

  if (!created && !attributesChanged && !professionChanged && !startupsChanged)
    return;

  /* ────────────────────────────── 2  Fetch related docs if needed ─────────────────── */
  let profession: any | undefined;
  if (professionId) {
    profession = await req.payload.findByID({
      collection: "professions",
      id: professionId,
      depth: 1,
    });
  }

  let startups: any[] = [];
  if (startupsIds.length) {
    const { docs: s } = await req.payload.find({
      collection: "startups",
      where: { id: { in: startupsIds } },
      depth: 0,
      limit: 3,
    });
    startups = s;
  }

  /* ────────────────────────────── 3  Build prompt ─────────────────────────────────── */
  const attrs = attrsArr.map((a) => a.label).join(", ");
  const country = attrsArr
    .filter((a) => a.category?.slug === "countries")
    .map((a) => a.label)
    .join(", ");

  const professionStr = profession
    ? `${profession.jobTitle} in ${profession.professionalField?.label}`
    : "";

  const startupsStr = startups
    .slice(0, 2)
    .map((s) => `${s.title} (${s.stage})`)
    .join(", ");

  const prompt = `
    You are GenV1’s friendly onboarding assistant. Craft a warm, engaging third-person bio (35–45 words) that flows naturally—using appropriate pronouns—without listing facts. Weave in their background, profession, any startups they’ve launched, and key interests, painting a vivid picture of who they are.
    Name: ${doc.fullName ?? "Unnamed"}
    Countries: ${country || "N/A"}
    Profession: ${professionStr || "N/A"}
    Startups: ${startupsStr || "None"}
    Interests: ${attrs || "N/A"}
    
    Bio:
    `.trim();

  /* ────────────────────────────── 4  Call OpenAI ─────────────────────────────────── */
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 80,
    });

    const generated = res.choices[0]?.message.content?.trim();
    if (!generated) return;

    /* ────────────────────────── 5  Patch user doc ────────────────────────────────── */
    await req.payload.update({
      collection: "users",
      id: doc.id,
      data: { bio: generated },
      overrideAccess: true,
      depth: 0,
    });
  } catch (err) {
    console.error("[generateUserBio]", err);
  }
};
