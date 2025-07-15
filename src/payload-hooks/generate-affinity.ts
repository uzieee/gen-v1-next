/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildVectorForUser } from "@/lib/affinity/vector";
import { vectorToSimhash } from "@/lib/affinity/simhash";
import { indexUserLSH } from "@/lib/affinity/lsh";

export const generateAffinity = async ({
  doc,
  previousDoc,
  operation,
  req,
}: any) => {
  const relevantChanged =
    operation === "create" ||
    JSON.stringify(doc.attributes) !==
      JSON.stringify(previousDoc?.attributes) ||
    doc.profession?.toString() !== previousDoc?.profession?.toString() ||
    JSON.stringify(doc.startups) !== JSON.stringify(previousDoc?.startups);

  if (!relevantChanged) return;

  const vector = await buildVectorForUser(doc);
  const sig = vectorToSimhash(vector);

  await req.payload.update({
    collection: "users",
    id: doc.id,
    data: {
      affinityVector: vector,
      affinitySignature: sig.toString(),
    },
    overrideAccess: true,
    depth: 0,
  });

  await indexUserLSH(doc.id, sig);
};
