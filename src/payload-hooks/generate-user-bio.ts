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
  /* -------------------------------------------------- */
  /* 1 — early-exit guards                              */
  /* -------------------------------------------------- */

  // must have at least one attribute
  const attrsArr = (doc.attributes as any[]) ?? [];
  if (attrsArr.length === 0) return;

  // skip if bio already set manually
  if (doc.bio) return;

  // only run on create OR when attributes changed
  const created = operation === "create";
  const attributesChanged =
    !created &&
    JSON.stringify(attrsArr.map((a) => a.id).sort()) !==
      JSON.stringify(
        ((previousDoc?.attributes as any[]) ?? []).map((a) => a.id).sort()
      );

  if (!created && !attributesChanged) return;

  /* -------------------------------------------------- */
  /* 2 — build OpenAI prompt                            */
  /* -------------------------------------------------- */

  const attrs = attrsArr.map((a) => a.label).join(", ");
  const prompt = `
  You are GenV1's onboarding assistant. Write a concise,
  friendly, third-person bio (35–45 words) for the following user.
  
  Name: ${doc.fullName ?? "Unnamed"}
  Gender: ${doc.gender ?? "N/A"}
  Interests & attributes: ${attrs}
  
  Bio:
    `.trim();

  /* -------------------------------------------------- */
  /* 3 — call OpenAI                                    */
  /* -------------------------------------------------- */

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 80,
    });

    const generated = res.choices[0]?.message.content?.trim();
    if (!generated) return;

    /* -------------------------------------------------- */
    /* 4 — patch user with generated bio                  */
    /* -------------------------------------------------- */
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
