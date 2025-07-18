/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getPayload } from "payload";
import jwt from "jsonwebtoken";
import config from "@payload-config";
import { readAuthToken } from "@/lib/read-auth-token";
import { JWT_SECRET } from "@/lib/jwt-secret";

type Result = { ok: true; startupId: string } | { ok: false; error: string };

export async function saveStartupVisionAction(
  _prev: unknown,
  formData: FormData
): Promise<Result> {
  /* auth */
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

  /* inputs */
  const title = formData.get("projectTitle")?.toString() || "Untitled";
  const stage = formData.get("projectStage")?.toString() as any;
  const description =
    formData.get("projectDescription")?.toString() || undefined;
  const industry = formData.get("industries")?.toString();
  const support = formData.get("supportNeeded")?.toString() || undefined;
  //   const supportOther = formData.get("supportOther")?.toString() || undefined;

  if (!stage || !industry)
    return { ok: false, error: "missing required fields" };

  const payload = await getPayload({
    config,
  });

  /* create startup */
  const startup = await payload.create({
    collection: "startups",
    data: {
      user: userId,
      title,
      stage,
      description,
      industries: [industry], // array
      supportNeeded: support ? [support as any] : undefined,
      //   supportOther,
    },
  });

  /* push id to user.startups (array) */
  await payload.update({
    collection: "users",
    id: userId,
    data: { startups: [startup.id] },
  });

  return { ok: true, startupId: startup.id };
}
