"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";

/* ---------- 1. fields the form is allowed to edit ---------- */
const profileSchema = z.object({
  fullName: z.string().max(120).optional(),
  gender: z.string().max(50).optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD
    .optional(),
  role: z.enum(["admin", "member"]).optional(),
  email: z.string().email().optional(),
  isEmailVerified: z.coerce.boolean().optional(),
});

const JWT_SECRET = (process.env.PAYLOAD_SECRET || "").trim();

if (!JWT_SECRET) {
  throw new Error("PAYLOAD_SECRET missing in env");
}

export async function updateUserProfile(formData: FormData) {
  console.log(
    "verify secret",
    JWT_SECRET.length,
    Buffer.from(JWT_SECRET).toString("hex")
  );
  try {
    const payload = await getPayload({
      config,
    });

    let token = (await cookies()).get("payload-token")?.value;

    if (!token) throw new Error("Unauthenticated");

    token = decodeURIComponent(token);

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
      };
      console.log({ decoded });
      userId = decoded.id;
    } catch (error) {
      console.log({ error });
      throw new Error("Invalid token");
    }

    const raw = Object.fromEntries(formData) as Record<string, unknown>;
    let data;

    try {
      data = profileSchema.parse(raw);
    } catch (err) {
      throw new Error(`Validation failed: ${JSON.stringify(err)}`);
    }

    console.log({ data });

    const updated = await payload.update({
      collection: "users",
      id: userId,
      data,
    });

    return { success: true, user: updated };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
