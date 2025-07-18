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
export async function genTopic(
  eventName: string,
  sessionNum: number,
  about?: string
) {
  const prompt = `
You are an expert discussion facilitator tasked with creating thought-provoking topics for roundtable discussions. Generate a concise, engaging topic for a roundtable discussion session at an event called "${eventName}" ${about ? ", context about the event: " + about : ""}. 

The topic should:
- Spark meaningful dialogue and diverse perspectives
- Be accessible yet intellectually stimulating
- Connect to current trends or timeless human experiences
- Encourage personal stories and professional insights
- Be specific enough to focus discussion but broad enough for varied interpretations
- Avoid overly controversial or polarizing subjects

Create a topic that makes participants eager to share their thoughts and learn from others.`;
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
You are an expert conversation facilitator and networking specialist. Your goal is to create engaging, thought-provoking ice-breaker questions that will spark meaningful group discussions around "${topic}". Generate universal questions that any participant can answer, encouraging them to share personal insights and experiences. The questions should be warm, inviting, and designed to help participants connect with each other while leading to deeper conversations. Focus on questions that draw out diverse perspectives and create opportunities for participants to find common ground.
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

Return a JSON object where each key is the user's ID and the value is an array of exactly 8 ice-breaker question strings.

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
