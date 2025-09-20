"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { generateIceBreaker } from "@/lib/ice-breaker-generator";

export async function refreshIceBreakerAction(profileId: string) {
  try {
    const payload = await getPayload({ config });
    
    // Get the user profile
    const user = await payload.findByID({
      collection: "users",
      id: profileId,
      depth: 2,
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Prepare user profile data for ice breaker generation
    const userProfile = {
      fullName: user.fullName,
      bio: user.bio,
      profession: user.profession,
      startups: user.startups,
      attributes: user.attributes,
    };

    const preferences = {
      style: user.iceBreakers?.iceBreakerPreferences?.style || "professional",
        topics: user.iceBreakers?.iceBreakerPreferences?.topics?.map((t: { topic: string }) => t.topic) || [],
    };

    // Generate new ice breaker
    const newIceBreaker = await generateIceBreaker(userProfile, preferences);
    
    // If we get a generic fallback, try to make it more personalized
    if (newIceBreaker === "What's the most exciting project you're working on right now?") {
      // Create a more personalized version based on user data
      const personalizedVariations = [
        "What's the most exciting project you're working on right now?",
        "What's the biggest challenge you're tackling this month?",
        "What's something you're really excited to work on?",
        "What's the most interesting problem you're solving?",
        "What's your current focus area that you're passionate about?",
        "What's the coolest thing you've learned recently?",
        "What's something you're looking forward to in your work?",
        "What's the most rewarding part of what you do?"
      ];
      
      // Add profession-specific variations
      if (userProfile.profession) {
        const professionData = typeof userProfile.profession === 'string' ? userProfile.profession : userProfile.profession?.jobTitle || userProfile.profession?.professionalField;
        if (professionData) {
          const professionLower = professionData.toLowerCase();
          if (professionLower.includes('engineer') || professionLower.includes('developer')) {
            personalizedVariations.push("What's the coolest technology you've worked with recently?");
            personalizedVariations.push("What's your favorite programming language and why?");
          } else if (professionLower.includes('designer') || professionLower.includes('creative')) {
            personalizedVariations.push("What's your favorite design tool and why?");
            personalizedVariations.push("What's the most inspiring design you've seen recently?");
          }
        }
      }
      
      const randomIndex = Math.floor(Math.random() * personalizedVariations.length);
      return { success: true, iceBreaker: personalizedVariations[randomIndex] };
    }

    // Save current ice breaker to history if it exists and is different
    const currentIceBreaker = user.iceBreakers?.currentIceBreaker;
    if (currentIceBreaker && currentIceBreaker !== newIceBreaker) {
      const history = user.iceBreakers?.iceBreakerHistory || [];
      history.push({
        question: currentIceBreaker,
        generatedAt: new Date().toISOString(),
        likes: 0,
      });

      // Keep only last 10 ice breakers in history
      if (history.length > 10) {
        history.splice(0, history.length - 10);
      }

      // Update user with new ice breaker and history
      await payload.update({
        collection: "users",
        id: profileId,
        data: {
          iceBreakers: {
            ...user.iceBreakers,
            currentIceBreaker: newIceBreaker,
            iceBreakerHistory: history,
          },
        },
      });
    } else {
      // Just update the current ice breaker
      await payload.update({
        collection: "users",
        id: profileId,
        data: {
          iceBreakers: {
            ...user.iceBreakers,
            currentIceBreaker: newIceBreaker,
          },
        },
      });
    }

    return { success: true, iceBreaker: newIceBreaker };
  } catch (error) {
    console.error("Error refreshing ice breaker:", error);
    return { success: false, error: "Failed to refresh ice breaker" };
  }
}

export async function likeIceBreakerAction(profileId: string, iceBreaker: string) {
  try {
    const payload = await getPayload({ config });
    
    // Get the user profile
    const user = await payload.findByID({
      collection: "users",
      id: profileId,
      depth: 2,
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Find the ice breaker in history and increment likes
    const history = user.iceBreakers?.iceBreakerHistory || [];
    const updatedHistory = history.map((item: { question: string; likes: number }) => {
      if (item.question === iceBreaker) {
        return {
          ...item,
          likes: (item.likes || 0) + 1,
        };
      }
      return item;
    });

    // Update user with updated history
    await payload.update({
      collection: "users",
      id: profileId,
      data: {
        iceBreakers: {
          ...user.iceBreakers,
          iceBreakerHistory: updatedHistory,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error liking ice breaker:", error);
    return { success: false, error: "Failed to like ice breaker" };
  }
}

export async function updateIceBreakerPreferencesAction(
  profileId: string,
  preferences: {
    style: "professional" | "casual" | "creative" | "funny" | "thought-provoking";
    topics: string[];
  }
) {
  try {
    const payload = await getPayload({ config });
    
    await payload.update({
      collection: "users",
      id: profileId,
      data: {
        iceBreakers: {
          iceBreakerPreferences: {
            style: preferences.style,
            topics: preferences.topics.map(topic => ({ topic })),
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating ice breaker preferences:", error);
    return { success: false, error: "Failed to update preferences" };
  }
}