import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "@/payload-types";

export function useCurrentUser(
  depth = 0
): UseQueryResult<{ user: User } | null> {
  return useQuery({
    queryKey: ["currentUser", depth],
    queryFn: async () => {
      const res = await fetch(`/api/me?depth=${depth}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("unauthenticated");
      return res.json() as Promise<{ user: User }>;
    },
    staleTime: 0,
  });
}
