/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, Profession, User } from "@/payload-types";
import { OpenAI } from "openai";

export const GPT_MODELS = {
  gpt4Mini: "gpt-4o-mini",
  gpt4o: "gpt-4o",
  gtp35Turbo: "gpt-3.5-turbo",
} as const;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Generate a single discussion topic for an event/session */
export async function genTopic(eventName: string, sessionNum: number) {
  const prompt = `
Generate a concise, engaging topic for session ${sessionNum} of an event called "${eventName}".`;
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 30,
  });
  return res.choices[0].message.content?.trim() ?? "";
}

/** Generate 2 personalized ice-breaker questions */
/** Generate 2 personalized ice-breaker questions for multiple users */
export async function genQuestions(
  users: User[],
  topic: string
): Promise<Record<string, string[]>> {
  // Build user profiles for all users
  const userProfiles = users.map((user) => {
    const attrs =
      (user.attributes as Attribute[])?.map((a) => a.label).join(", ") || "";
    const prof = user.profession
      ? `${(user?.profession as Profession)?.jobTitle} in ${((user?.profession as Profession)?.professionalField as any)?.label}`
      : "";

    return {
      id: user.id,
      name: user.fullName,
      profession: prof,
      interests: attrs,
    };
  });

  // Create batch prompt for all users
  const prompt = `
You are an AI facilitator. Generate two friendly, personalized ice-breaker questions for each user to discuss the topic "${topic}".

Users:
${userProfiles
  .map(
    (user, index) => `
${index + 1}. User: ${user.name}
   ID: ${user.id}
   Profession: ${user.profession}
   Interests: ${user.interests}
`
  )
  .join("")}

Return a JSON object where each key is the user's ID and the value is an array of exactly 2 ice-breaker question strings.

Example format:
{
  "user-id-1": ["Question 1 for user 1", "Question 2 for user 1"],
  "user-id-2": ["Question 1 for user 2", "Question 2 for user 2"]
}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 150 * users.length, // Scale tokens based on number of users
  });

  try {
    const parsed = JSON.parse(
      res.choices[0].message.content?.trim() ?? ""
    ) as Record<string, string[]>;

    // Validate that we have questions for all users
    const result: Record<string, string[]> = {};
    for (const user of users) {
      if (
        parsed[user.id] &&
        Array.isArray(parsed[user.id]) &&
        parsed[user.id].length >= 2
      ) {
        result[user.id] = parsed[user.id].slice(0, 2); // Ensure exactly 2 questions
      } else {
        // Fallback: generate generic questions if parsing failed for this user
        result[user.id] = [
          `What's your take on ${topic}?`,
          `How does ${topic} relate to your experience?`,
        ];
      }
    }

    return result;
  } catch (error) {
    console.error("Failed to parse OpenAI response:", error);

    // Fallback: create generic questions for all users
    const fallbackResult: Record<string, string[]> = {};
    for (const user of users) {
      fallbackResult[user.id] = [
        `What's your perspective on ${topic}?`,
        `How does ${topic} connect to your interests or work?`,
      ];
    }

    return fallbackResult;
  }
}
