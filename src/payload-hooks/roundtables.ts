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
): Promise<string> {
  const prompt = `Generate ONE thought-provoking discussion statement for a roundtable at "${eventName}".

${about ? `Event context: ${about}` : ""}

Create a statement that:
- Is a clear opinion, provocative question, or debatable statement
- Sparks diverse perspectives and meaningful dialogue
- Connects to professional experiences or current trends
- Encourages participants to share personal insights
- Is specific enough to focus discussion but allows varied interpretations

Examples of good discussion statements:
- "Remote work has fundamentally changed what it means to be a team"
- "The best leaders are made, not born"
- "Failure is more valuable than success for personal growth"
- "AI will create more jobs than it eliminates"

Return ONLY the discussion statement, no quotes or extra text.`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 80, // Increased for full sentences
    });

    const topic = res.choices[0].message.content?.trim();

    if (!topic) {
      throw new Error("Empty response from OpenAI");
    }

    // Clean up the response (remove quotes, ensure proper punctuation)
    const cleanedTopic = topic
      .replace(/^["']|["']$/g, "") // Remove wrapping quotes
      .trim();

    // Add period if missing and not a question
    const finalTopic =
      cleanedTopic.endsWith("?") ||
      cleanedTopic.endsWith(".") ||
      cleanedTopic.endsWith("!")
        ? cleanedTopic
        : cleanedTopic + ".";

    return finalTopic;
  } catch (error) {
    console.error("Failed to generate topic via OpenAI:", error);
    return generateFallbackTopic(eventName, sessionNum, about);
  }
}

function generateFallbackTopic(
  eventName: string,
  sessionNum: number,
  about?: string
): string {
  const eventKeywords = extractEventKeywords(eventName, about);

  const universalStatements = [
    "The most important skill for future success is adaptability, not expertise.",
    "Authenticity is more valuable than perfection in building trust.",
    "The best ideas come from diverse perspectives, not individual brilliance.",
    "Failure teaches us more than success ever could.",
    "Technology should serve human connection, not replace it.",
    "Work-life balance is a myth – integration is the real goal.",
    "The biggest career risks come from not taking any risks at all.",
    "Mentorship is a two-way street where both parties learn equally.",
    "Innovation happens when you combine old wisdom with new possibilities.",
    "Your network's diversity matters more than its size.",
  ];

  const techStatements = [
    "AI will augment human creativity rather than replace it.",
    "The future belongs to those who can bridge technical and human skills.",
    "Data without context is just noise.",
    "The most successful tech companies prioritize user experience over features.",
  ];

  const businessStatements = [
    "Customer feedback is more valuable than market research.",
    "Small companies move faster, but big companies move mountains.",
    "The best business strategies are simple enough to explain in one sentence.",
    "Purpose-driven companies outperform profit-driven ones in the long run.",
  ];

  const leadershipStatements = [
    "Great leaders create more leaders, not more followers.",
    "Vulnerability is a leadership strength, not a weakness.",
    "The best decisions are made with 80% of the information, not 100%.",
    "Leading by example is more powerful than leading by authority.",
  ];

  const startupStatements = [
    "Most successful entrepreneurs are problem-solvers first, business people second.",
    "The best time to start a company is when you're not ready.",
    "Startup culture should scale with the company, not stay static.",
    "Passion without market validation is just an expensive hobby.",
  ];

  // Select statement pool based on event context
  let statements = universalStatements;

  if (eventKeywords.tech) {
    statements = [...techStatements, ...universalStatements];
  } else if (eventKeywords.startup) {
    statements = [...startupStatements, ...universalStatements];
  } else if (eventKeywords.leadership) {
    statements = [...leadershipStatements, ...universalStatements];
  } else if (eventKeywords.business) {
    statements = [...businessStatements, ...universalStatements];
  }

  // Use sessionNum to add some variation but not context-specific logic
  const statementIndex = (sessionNum - 1) % statements.length;
  return statements[statementIndex];
}

function extractEventKeywords(
  eventName: string,
  about?: string
): {
  tech: boolean;
  business: boolean;
  leadership: boolean;
  startup: boolean;
} {
  const text = `${eventName} ${about || ""}`.toLowerCase();

  return {
    tech: /tech|software|digital|innovation|ai|data|engineering|development/.test(
      text
    ),
    business: /business|commerce|sales|marketing|strategy|corporate/.test(text),
    leadership: /leader|management|executive|ceo|director|manager/.test(text),
    startup: /startup|entrepreneur|venture|founder|founding/.test(text),
  };
}

// Alternative function for generating multiple discussion statements
export async function genMultipleTopics(
  eventName: string,
  sessionCount: number,
  about?: string
): Promise<string[]> {
  if (sessionCount === 1) {
    return [await genTopic(eventName, 1, about)];
  }

  const prompt = `Generate ${sessionCount} distinct thought-provoking discussion statements for roundtables at "${eventName}".

${about ? `Event context: ${about}` : ""}

Each statement should:
- Be a clear opinion, provocative question, or debatable claim
- Spark diverse perspectives and meaningful dialogue
- Be complete sentences or questions
- Encourage participants to share experiences and insights
- Connect to professional or personal growth themes

Examples:
- "The best innovations come from constraints, not unlimited resources."
- "Is work-life balance achievable, or should we aim for work-life integration?"
- "Emotional intelligence matters more than technical skills for career success."

Return ONLY a JSON array of ${sessionCount} statement strings:
["Statement 1", "Statement 2", "Statement 3", ...]`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 80 * sessionCount + 100,
    });

    const content = res.choices[0].message.content?.trim();
    if (!content) {
      throw new Error("Empty response");
    }

    let topics: string[];
    try {
      topics = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON array if wrapped in other text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        topics = JSON.parse(jsonMatch[0]);
      } else {
        throw parseError;
      }
    }

    if (!Array.isArray(topics) || topics.length !== sessionCount) {
      throw new Error("Invalid topic count in response");
    }

    // Clean up topics and ensure proper punctuation
    return topics.map((topic) => {
      const cleaned = topic.replace(/^["']|["']$/g, "").trim();
      return cleaned.endsWith("?") ||
        cleaned.endsWith(".") ||
        cleaned.endsWith("!")
        ? cleaned
        : cleaned + ".";
    });
  } catch (error) {
    console.error("Failed to generate multiple topics:", error);

    // Generate fallback topics individually
    const fallbackTopics: string[] = [];
    for (let i = 1; i <= sessionCount; i++) {
      fallbackTopics.push(generateFallbackTopic(eventName, 1, about));
    }
    return fallbackTopics;
  }
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
