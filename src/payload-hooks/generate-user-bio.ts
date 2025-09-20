/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAI } from "openai";
import { bioRateLimiter, shouldSkipOpenAICall } from "@/lib/rate-limiter";

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
  
  // Handle profession - could be string (ID) or object
  const professionData = doc.profession;
  const professionId = typeof professionData === 'string' ? professionData : professionData?.id;
  
  // Handle startups - could be array of strings (IDs) or objects
  const startupsData = (doc.startups as any[]) ?? [];
  const startupsIds = startupsData.map((startup) => 
    typeof startup === 'string' ? startup : startup.id
  ).filter(Boolean);

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

  // Handle previous profession data
  const previousProfessionData = previousDoc?.profession;
  const previousProfessionId = typeof previousProfessionData === 'string' ? previousProfessionData : previousProfessionData?.id;

  const professionChanged =
    !created &&
    previousProfessionId?.toString() !== professionId?.toString();

  // Handle previous startups data
  const previousStartupsData = (previousDoc?.startups as any[]) ?? [];
  const previousStartupsIds = previousStartupsData.map((startup) => 
    typeof startup === 'string' ? startup : startup.id
  ).filter(Boolean);

  const startupsChanged =
    !created &&
    JSON.stringify(startupsIds.sort()) !==
      JSON.stringify(previousStartupsIds.sort());

  if (!created && !attributesChanged && !professionChanged && !startupsChanged)
    return;

  /* ────────────────────────────── 2  Fetch related docs if needed ─────────────────── */
  let profession: any | undefined;
  if (professionId) {
    try {
      profession = await req.payload.findByID({
        collection: "professions",
        id: professionId,
        depth: 1,
      });
    } catch (error) {
      console.error("[generateUserBio] Error fetching profession:", error);
      // If professionId is not a valid ObjectId, skip profession data
      if (error instanceof Error && error.message.includes('ObjectId')) {
        profession = undefined;
      } else {
        throw error;
      }
    }
  }

  let startups: any[] = [];
  if (startupsIds.length) {
    try {
      const { docs: s } = await req.payload.find({
        collection: "startups",
        where: { id: { in: startupsIds } },
        depth: 0,
        limit: 3,
      });
      startups = s;
    } catch (error) {
      console.error("[generateUserBio] Error fetching startups:", error);
      // If there's an error fetching startups, continue without them
      startups = [];
    }
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
    You are GenV1’s friendly onboarding assistant. Craft a warm, engaging third-person bio (35–45 words) that flows naturally—using appropriate pronouns—without listing facts. Weave in their background, profession, any startups they’ve launched, and key interests, painting a vivid picture of who they are, also do not make the bio too much about languages.
    Name: ${doc.fullName ?? "Unnamed"}
    Countries: ${country || "N/A"}
    Profession: ${professionStr || "N/A"}
    Startups: ${startupsStr || "None"}
    Interests: ${attrs || "N/A"}
    
    Bio:
    `.trim();

  /* ────────────────────────────── 4  Call OpenAI ─────────────────────────────────── */
  try {
    // Skip OpenAI in development if no API key is provided
    if (process.env.NODE_ENV === "development" && !process.env.OPENAI_API_KEY) {
      console.log("[generateUserBio] Skipping OpenAI in development mode");
      return;
    }

    // Check rate limit before making API call
    if (shouldSkipOpenAICall(bioRateLimiter)) {
      console.log("[generateUserBio] Rate limit hit, skipping bio generation");
      return;
    }

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

    console.log(`[generateUserBio] Bio generated for user ${doc.id}`);
  } catch (err: any) {
    console.error("[generateUserBio]", err);
    
    // Check if it's a quota/rate limit error
    if (err?.status === 429 || err?.code === 'insufficient_quota' || err?.code === 'rate_limit_exceeded') {
      console.log("[generateUserBio] OpenAI quota/rate limit hit, skipping bio generation");
      return;
    }
    
    // In development, don't fail the entire operation if OpenAI fails
    if (process.env.NODE_ENV === "development") {
      console.log("[generateUserBio] Continuing without bio generation in development");
    }
  }
};
