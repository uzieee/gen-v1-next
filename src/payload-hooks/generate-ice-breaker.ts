import { FieldHook } from "payload";
import { generateIceBreaker as generateIceBreakerService } from "@/lib/ice-breaker-generator";

export const generateIceBreakerHook: FieldHook = async ({ data, req, operation }) => {
  // Only generate ice breaker for new users or when bio/profession changes
  if (operation === "create" || (operation === "update" && data)) {
    try {
      // Skip if no bio or essential data
      if (!data?.bio && !data?.profession && !data?.startups) {
        return data?.currentIceBreaker || "What's the most exciting project you're working on right now?";
      }

      const userProfile = {
        fullName: data?.fullName,
        bio: data?.bio,
        profession: data?.profession,
        startups: data?.startups,
        attributes: data?.attributes,
      };

      const preferences = {
        style: data?.iceBreakers?.iceBreakerPreferences?.style || "professional",
        topics: data?.iceBreakers?.iceBreakerPreferences?.topics?.map((t: any) => t.topic) || [],
      };

      const iceBreaker = await generateIceBreakerService(userProfile, preferences);
      
      // If we get the same fallback ice breaker, try to make it more unique
      if (iceBreaker === "What's the most exciting project you're working on right now?") {
        // Add some variation based on user data
        const variations = [
          "What's the most exciting project you're working on right now?",
          "What's the biggest challenge you're tackling this month?",
          "What's something you're really excited to work on?",
          "What's the most interesting problem you're solving?",
          "What's your current focus area that you're passionate about?"
        ];
        const randomVariation = variations[Math.floor(Math.random() * variations.length)];
        return randomVariation;
      }

      // Add to history if this is an update and we have a different ice breaker
      if (operation === "update" && data?.currentIceBreaker && data.currentIceBreaker !== iceBreaker) {
        const history = data?.iceBreakers?.iceBreakerHistory || [];
        history.push({
          question: data.currentIceBreaker,
          generatedAt: new Date().toISOString(),
          likes: 0,
        });

        // Keep only last 10 ice breakers in history
        if (history.length > 10) {
          history.splice(0, history.length - 10);
        }

        data.iceBreakers = {
          ...data.iceBreakers,
          iceBreakerHistory: history,
        };
      }

      return iceBreaker;
    } catch (error) {
      console.error("Error generating ice breaker:", error);
      return data?.currentIceBreaker || "What's the most exciting project you're working on right now?";
    }
  }

  return data?.currentIceBreaker;
};
