"use server";

import { getPayload } from "payload";
import jwt from "jsonwebtoken";
import config from "@payload-config";
import { readAuthToken } from "@/lib/read-auth-token";
import { JWT_SECRET } from "@/lib/jwt-secret";

type Result = { ok: true; professionId: string } | { ok: false; error: string };

export async function saveProfessionAction(
  _prev: unknown,
  formData: FormData
): Promise<Result> {
  const token = await readAuthToken();

  if (!token) throw new Error("Unauthenticated");

  let userId: string;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };
    userId = decoded.id;
  } catch (error) {
    console.log({ error });
    throw new Error("Invalid token");
  }

  /* ─ parse inputs ─ */
  const professionalField = formData.get("professionalField")?.toString();
  const jobTitle = formData.get("jobTitle")?.toString();
  const jobDescription =
    formData.get("jobDescription")?.toString() || undefined;
  if (!professionalField || !jobTitle)
    return { ok: false, error: "missing required fields" };

  /* ─ bootstrap Payload ─ */
  const payload = await getPayload({
    config,
  });

  /* ─ upsert profession ─ */
  const existing = await payload.find({
    collection: "professions",
    where: { user: { equals: userId } },
    depth: 0,
    limit: 1,
  });

  const prof = existing.docs.length
    ? await payload.update({
        collection: "professions",
        id: existing.docs[0].id,
        data: {
          professionalField,
          jobTitle,
          jobDescription,
        },
      })
    : await payload.create({
        collection: "professions",
        data: {
          user: userId,
          professionalField,
          jobTitle,
          jobDescription,
        },
      });

  /* ─ link on user doc for quick populate ─ */
  await payload.update({
    collection: "users",
    id: userId,
    data: { profession: prof.id },
  });

  return { ok: true, professionId: prof.id };
}
