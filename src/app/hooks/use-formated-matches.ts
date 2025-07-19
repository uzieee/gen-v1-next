import { Attribute, AttributeCategory, User } from "@/payload-types";
import { useMemo } from "react";

interface Match {
  user: User;
  score: number;
}

export interface FormattedMatch {
  id: string;
  name: string;
  flag: string;
  status: string;
  icon: string;
  image: string | null;
}

export function useFormattedMatches(matches: Match[]): FormattedMatch[] {
  return useMemo(() => {
    // threshold above which we call someone "Recommended"
    const RECOMMENDED_THRESHOLD = 0.75;

    return matches.map(({ user, score }) => {
      // find the country attribute and use its image emoji
      const countryAttr = user.attributes?.find(
        (a) =>
          ((a as Attribute).category as AttributeCategory)?.slug === "countries"
      );
      const flag = (countryAttr as Attribute)?.image ?? "";

      // choose status based on score
      const status =
        score >= RECOMMENDED_THRESHOLD ? "Recommended" : "New member";

      // static icon
      const icon = "⚡";

      // user’s profile image URL or null
      const image = user.profileImage ?? null;

      return {
        id: user.id,
        name: (user.fullName || "").split(" ")[0] || "N/A",
        flag,
        status,
        icon,
        image,
      };
    });
  }, [matches]);
}
