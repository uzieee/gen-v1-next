import OpenAI from "openai";
import { iceBreakerRateLimiter, shouldSkipOpenAICall } from "./rate-limiter";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface UserProfile {
  fullName?: string;
  bio?: string;
  profession?: any;
  startups?: any[];
  attributes?: any[];
}

export interface IceBreakerPreferences {
  style: "professional" | "casual" | "creative" | "funny" | "thought-provoking";
  topics: string[];
}

export async function generateIceBreaker(
  userProfile: UserProfile,
  preferences: IceBreakerPreferences
): Promise<string> {
  // Skip OpenAI in development if no API key is provided
  if (process.env.NODE_ENV === "development" && !process.env.OPENAI_API_KEY) {
    console.log("[generateIceBreaker] Skipping OpenAI in development mode");
    return getPersonalizedFallbackIceBreaker(userProfile, preferences.style);
  }

  // Check rate limit before making API call
  if (shouldSkipOpenAICall(iceBreakerRateLimiter)) {
    console.log("[generateIceBreaker] Rate limit hit, using fallback");
    return getPersonalizedFallbackIceBreaker(userProfile, preferences.style);
  }

  try {
    const prompt = buildIceBreakerPrompt(userProfile, preferences);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 100,
    });

    const iceBreaker = response.choices[0]?.message?.content?.trim();
    
    if (!iceBreaker) {
      throw new Error("No ice breaker generated");
    }

    return iceBreaker;
  } catch (error: any) {
    console.error("[generateIceBreaker] Error:", error);
    
    // Check if it's a quota/rate limit error
    if (error?.status === 429 || error?.code === 'insufficient_quota' || error?.code === 'rate_limit_exceeded') {
      console.log("[generateIceBreaker] OpenAI quota/rate limit hit, using fallback");
      return getPersonalizedFallbackIceBreaker(userProfile, preferences.style);
    }
    
    // For other errors, also use fallback
    return getPersonalizedFallbackIceBreaker(userProfile, preferences.style);
  }
}

function buildIceBreakerPrompt(userProfile: UserProfile, preferences: IceBreakerPreferences): string {
  const { fullName, bio, profession, startups, attributes } = userProfile;
  const { style, topics } = preferences;

  let context = `Generate a networking ice breaker question for someone with the following profile:\n\n`;
  
  if (fullName) context += `Name: ${fullName}\n`;
  if (bio) context += `Bio: ${bio}\n`;
  
  if (profession) {
    const professionData = typeof profession === 'string' ? profession : profession?.jobTitle || profession?.professionalField;
    if (professionData) context += `Profession: ${professionData}\n`;
  }
  
  if (startups && startups.length > 0) {
    const startupTitles = startups.map(s => typeof s === 'string' ? s : s?.title).filter(Boolean);
    if (startupTitles.length > 0) {
      context += `Startup(s): ${startupTitles.join(', ')}\n`;
    }
  }
  
  if (attributes && attributes.length > 0) {
    const attributeLabels = attributes.map(a => typeof a === 'string' ? a : a?.label).filter(Boolean);
    if (attributeLabels.length > 0) {
      context += `Interests/Attributes: ${attributeLabels.join(', ')}\n`;
    }
  }
  
  if (topics.length > 0) {
    context += `Preferred Topics: ${topics.join(', ')}\n`;
  }

  context += `\nStyle: ${style}\n\n`;
  
  const styleInstructions = {
    professional: "Create a professional, business-focused ice breaker that helps with networking and career discussions.",
    casual: "Create a friendly, approachable ice breaker that's easy to answer and helps people connect naturally.",
    creative: "Create a unique, imaginative ice breaker that sparks creative thinking and memorable conversations.",
    funny: "Create a light-hearted, humorous ice breaker that makes people smile and feel comfortable.",
    "thought-provoking": "Create a deep, meaningful ice breaker that encourages thoughtful discussion and introspection."
  };

  context += styleInstructions[style] || styleInstructions.professional;
  
  context += `\n\nRequirements:
- Keep it under 15 words
- Make it open-ended to encourage conversation
- Ensure it's appropriate for professional networking
- Make it specific to their profile when possible
- Return only the ice breaker question, no additional text`;

  return context;
}

function getPersonalizedFallbackIceBreaker(userProfile: UserProfile, style: string): string {
  const { fullName, bio, profession, startups, attributes } = userProfile;
  
  // Create personalized ice breakers based on user data
  const personalizedFallbacks = {
    professional: [
      "What's the most exciting project you're working on right now?",
      "What's the biggest challenge you've overcome in your career?",
      "What industry trend are you most excited about?",
      "What's the best piece of professional advice you've received?",
      "What's your favorite part about your current role?"
    ],
    casual: [
      "What's something you're really passionate about outside of work?",
      "What's the most interesting place you've traveled to?",
      "What's your go-to way to unwind after a long day?",
      "What's something you've learned recently that surprised you?",
      "What's your favorite way to spend a weekend?"
    ],
    creative: [
      "If you could solve any problem in the world, what would it be?",
      "What's the most creative solution you've ever come up with?",
      "If you could have dinner with anyone, living or dead, who would it be?",
      "What's an idea you've had that you think could change the world?",
      "What's something you've always wanted to learn but haven't yet?"
    ],
    funny: [
      "What's the most interesting thing that happened to you this week?",
      "What's the funniest mistake you've made that actually turned out well?",
      "What's your most embarrassing work story?",
      "What's something that always makes you laugh?",
      "What's the weirdest job you've ever had or heard of?"
    ],
    "thought-provoking": [
      "What's a belief you held strongly that you've changed your mind about?",
      "What's something you think society gets wrong about your field?",
      "What's the most important lesson you've learned in the past year?",
      "What's a question you wish more people would ask?",
      "What's something you think will be completely different in 10 years?"
    ]
  };

  const styleFallbacks = personalizedFallbacks[style as keyof typeof personalizedFallbacks] || personalizedFallbacks.professional;
  
  // Add profession-specific fallbacks if available
  if (profession) {
    const professionData = typeof profession === 'string' ? profession : profession?.jobTitle || profession?.professionalField;
    if (professionData) {
      const professionLower = professionData.toLowerCase();
      
      if (professionLower.includes('engineer') || professionLower.includes('developer')) {
        styleFallbacks.push("What's the coolest technology you've worked with recently?");
        styleFallbacks.push("What's your favorite programming language and why?");
      } else if (professionLower.includes('designer') || professionLower.includes('creative')) {
        styleFallbacks.push("What's your favorite design tool and why?");
        styleFallbacks.push("What's the most inspiring design you've seen recently?");
      } else if (professionLower.includes('marketing') || professionLower.includes('sales')) {
        styleFallbacks.push("What's the most effective marketing campaign you've seen?");
        styleFallbacks.push("What's your favorite way to connect with customers?");
      } else if (professionLower.includes('manager') || professionLower.includes('lead')) {
        styleFallbacks.push("What's your favorite leadership principle?");
        styleFallbacks.push("What's the best team you've ever worked with?");
      }
    }
  }

  // Add startup-specific fallbacks if available
  if (startups && startups.length > 0) {
    styleFallbacks.push("What's the biggest challenge your startup is facing right now?");
    styleFallbacks.push("What's the most exciting thing about being an entrepreneur?");
    styleFallbacks.push("What's one thing you wish you knew before starting your company?");
  }

  // Add attribute-specific fallbacks if available
  if (attributes && attributes.length > 0) {
    const attributeLabels = attributes.map(a => typeof a === 'string' ? a : a?.label).filter(Boolean);
    if (attributeLabels.length > 0) {
      styleFallbacks.push(`I see you're interested in ${attributeLabels[0]}. What got you into that?`);
      styleFallbacks.push(`What's your favorite thing about ${attributeLabels[0]}?`);
    }
  }

  // Randomly select from available fallbacks
  const randomIndex = Math.floor(Math.random() * styleFallbacks.length);
  return styleFallbacks[randomIndex];
}

function getFallbackIceBreaker(style: string): string {
  const fallbacks = {
    professional: "What's the most exciting project you're working on right now?",
    casual: "What's something you're really passionate about outside of work?",
    creative: "If you could solve any problem in the world, what would it be?",
    funny: "What's the most interesting thing that happened to you this week?",
    "thought-provoking": "What's a belief you held strongly that you've changed your mind about?"
  };

  return fallbacks[style as keyof typeof fallbacks] || fallbacks.professional;
}