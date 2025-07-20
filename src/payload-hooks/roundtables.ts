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
// export async function genQuestions(
//   users: User[],
//   topic: string
// ): Promise<Record<string, string[]>> {
//   // Build user profiles for all users
//   const userProfiles = users.map((user) => {
//     const attrs =
//       (user.attributes as Attribute[])?.map((a) => a.label).join(", ") || "";
//     const prof = user.profession
//       ? `${(user?.profession as Profession)?.jobTitle} in ${((user?.profession as Profession)?.professionalField as any)?.label}`
//       : "";

//     return {
//       id: user.id,
//       name: user.fullName,
//       profession: prof,
//       interests: attrs,
//     };
//   });

//   // Create batch prompt for all users
//   const prompt = `
// You are an expert conversation facilitator and networking specialist. Your goal is to create engaging, thought-provoking ice-breaker questions that will spark meaningful group discussions around "${topic}". Generate universal questions that any participant can answer, encouraging them to share personal insights and experiences. The questions should be warm, inviting, and designed to help participants connect with each other while leading to deeper conversations. Focus on questions that draw out diverse perspectives and create opportunities for participants to find common ground.
// Users:
// ${userProfiles
//   .map(
//     (user, index) => `
// ${index + 1}. User: ${user.name}
//    ID: ${user.id}
//    Profession: ${user.profession}
//    Interests: ${user.interests}
// `
//   )
//   .join("")}

// Return a JSON object where each key is the user's ID and the value is an array of exactly 8 ice-breaker question strings.

// Example format:
// {
//   "user-id-1": ["Question 1 for user 1", "Question 2 for user 1"],
//   "user-id-2": ["Question 1 for user 2", "Question 2 for user 2"]
// }
// `;

//   const res = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.8,
//     max_tokens: 150 * users.length, // Scale tokens based on number of users
//   });

//   console.log({ res });

//   try {
//     const parsed = JSON.parse(
//       res.choices[0].message.content?.trim() ?? ""
//     ) as Record<string, string[]>;

//     console.log({ res, parsed });

//     // Validate that we have questions for all users
//     const result: Record<string, string[]> = {};
//     for (const user of users) {
//       if (
//         parsed[user.id] &&
//         Array.isArray(parsed[user.id]) &&
//         parsed[user.id].length >= 2
//       ) {
//         result[user.id] = parsed[user.id].slice(0, 2); // Ensure exactly 2 questions
//       } else {
//         // Fallback: generate generic questions if parsing failed for this user
//         result[user.id] = [
//           `What's your take on ${topic}?`,
//           `How does ${topic} relate to your experience?`,
//         ];
//       }
//     }

//     return result;
//   } catch (error) {
//     console.error("Failed to parse OpenAI response:", error);

//     // Fallback: create generic questions for all users
//     const fallbackResult: Record<string, string[]> = {};
//     for (const user of users) {
//       fallbackResult[user.id] = [
//         `What's your perspective on ${topic}?`,
//         `How does ${topic} connect to your interests or work?`,
//       ];
//     }

//     return fallbackResult;
//   }
// }

export async function genQuestions(
  users: User[],
  topic: string
): Promise<Record<string, string[]>> {
  const QUESTIONS_PER_USER = 5;

  // For any group size, use universal questions to avoid context length issues
  return generateUniversalQuestions(users, topic, QUESTIONS_PER_USER);
}

async function generateUniversalQuestions(
  users: User[],
  topic: string,
  questionsPerUser: number
): Promise<Record<string, string[]>> {
  // Analyze user diversity without including all users in prompt
  const userAnalysis = analyzeUserDiversity(users);

  const prompt = `You are an expert conversation facilitator creating ice-breaker questions for a networking roundtable discussion.

Topic: "${topic}"

Audience context:
- ${users.length} participants
- Professional backgrounds: ${userAnalysis.professions.join(", ")}
- Common interests: ${userAnalysis.interests.join(", ")}

Create ${Math.max(12, questionsPerUser * 3)} engaging ice-breaker questions that:
- Work for anyone regardless of background
- Encourage personal sharing and storytelling
- Help participants find common ground
- Are open-ended and thought-provoking
- Connect to the topic "${topic}"

Return ONLY a JSON array of question strings:
["Question 1", "Question 2", "Question 3", ...]`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Keep original model for cost efficiency
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800, // Fixed reasonable limit
    });

    const content = res.choices[0].message.content?.trim();
    if (!content) {
      throw new Error("No content in response");
    }

    // More robust JSON parsing
    let questions: string[];
    try {
      questions = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON array from response if wrapped in other text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        throw parseError;
      }
    }

    if (!Array.isArray(questions) || questions.length < questionsPerUser) {
      throw new Error("Invalid or insufficient questions in response");
    }

    // Distribute questions among users with some variety
    const result: Record<string, string[]> = {};
    const questionPool = [...questions];

    users.forEach((user, index) => {
      const userQuestions: string[] = [];

      for (let i = 0; i < questionsPerUser; i++) {
        // Use modulo to cycle through questions, with offset per user for variety
        const questionIndex =
          (index * questionsPerUser + i) % questionPool.length;
        userQuestions.push(questionPool[questionIndex]);
      }

      result[user.id] = userQuestions;
    });

    return result;
  } catch (error) {
    console.error("Failed to generate questions via OpenAI:", error);
    return generateFallbackQuestions(users, topic, questionsPerUser);
  }
}

function analyzeUserDiversity(users: User[]): {
  professions: string[];
  interests: string[];
} {
  const professions = new Set<string>();
  const interests = new Set<string>();

  // Sample up to 10 users to understand diversity without overwhelming the prompt
  const sampleSize = Math.min(users.length, 10);
  const sampleUsers = users.slice(0, sampleSize);

  sampleUsers.forEach((user) => {
    // Extract profession
    if (user.profession) {
      const profession = user.profession as Profession;
      if (profession.jobTitle) {
        professions.add(profession.jobTitle);
      }
      if ((profession.professionalField as Attribute).label) {
        professions.add((profession.professionalField as Attribute).label);
      }
    }

    // Extract interests
    if (user.attributes) {
      (user.attributes as Attribute[]).forEach((attr) => {
        if (attr.label) {
          interests.add(attr.label);
        }
      });
    }
  });

  return {
    professions: Array.from(professions).slice(0, 8), // Limit to prevent long prompts
    interests: Array.from(interests).slice(0, 8),
  };
}

function generateFallbackQuestions(
  users: User[],
  topic: string,
  questionsPerUser: number
): Record<string, string[]> {
  const fallbackQuestions = [
    `What's your personal connection to ${topic}?`,
    `How has ${topic} influenced your work or life?`,
    `What's one surprising thing about ${topic} that most people don't know?`,
    `If you could ask an expert one question about ${topic}, what would it be?`,
    `What's the biggest change you've seen in ${topic} recently?`,
    `How do you think ${topic} will evolve in the next 5 years?`,
    `What's one common misconception about ${topic}?`,
    `Share a time when ${topic} made a difference in your experience.`,
    `What aspect of ${topic} are you most curious about?`,
    `How does your background give you a unique perspective on ${topic}?`,
    `What would you want newcomers to know about ${topic}?`,
    `What's the most interesting conversation you've had about ${topic}?`,
  ];

  const result: Record<string, string[]> = {};

  users.forEach((user, index) => {
    const userQuestions: string[] = [];

    for (let i = 0; i < questionsPerUser; i++) {
      const questionIndex =
        (index * questionsPerUser + i) % fallbackQuestions.length;
      userQuestions.push(fallbackQuestions[questionIndex]);
    }

    result[user.id] = userQuestions;
  });

  return result;
}
