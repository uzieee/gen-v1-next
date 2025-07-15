/* eslint-disable @typescript-eslint/no-explicit-any */
/* lib/affinity/nearest.ts */
import { buildVectorForUser } from "./vector";
import { vectorToSimhash } from "./simhash";
import { candidatesFor } from "./lsh";
import { cosine } from "./cosine"; // small util

export async function topMatches(
  user: any,
  payload: any,
  k = 10
): Promise<{ id: string; score: number }[]> {
  const vecU = user.affinityVector ?? (await buildVectorForUser(user));
  const sigU = vectorToSimhash(vecU);

  const candidateIds = await candidatesFor(sigU);
  if (candidateIds.length === 0) return [];

  const { docs: candidates } = await payload.find({
    collection: "users",
    where: { id: { in: candidateIds.filter((id) => id !== user.id) } },
    depth: 0,
  });

  const scores = candidates.map((c: any) => {
    const vecV = c.affinityVector;
    const score = cosine(vecU, vecV);
    return { id: c.id, score };
  });

  scores.sort(
    (a: { score: number }, b: { score: number }) => b.score - a.score
  );
  return scores.slice(0, k);
}
