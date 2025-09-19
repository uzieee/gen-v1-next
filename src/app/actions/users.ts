"use server";

import jwt from "jsonwebtoken";
import { z } from "zod";
import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";
import { JWT_SECRET } from "@/lib/jwt-secret";
import { readAuthToken } from "@/lib/read-auth-token";
import { setAuthCookie } from "@/lib/set-auth-cookie";
import { addAttributesToUser } from "@/lib/add-attributes-to-user";
import { Attribute, AttributeCategory } from "@/payload-types";

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
  bio: z.string().max(500).optional(),
  instagramHandle: z.string().max(50).optional(),
  website: z.string().url().optional().or(z.literal("")),
  publicEmail: z.string().email().optional().or(z.literal("")),
});

export async function updateUserProfile(formData: FormData) {
  try {
    const payload = await getPayload({
      config,
    });

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

    // Extract data from FormData using get() method
    const raw: Record<string, unknown> = {};
    
    // Get each field individually
    const fullName = formData.get("fullName")?.toString();
    const gender = formData.get("gender")?.toString();
    const dateOfBirth = formData.get("dateOfBirth")?.toString();
    const role = formData.get("role")?.toString();
    const email = formData.get("email")?.toString();
    const isEmailVerified = formData.get("isEmailVerified")?.toString();
    const bio = formData.get("bio")?.toString();
    const instagramHandle = formData.get("instagramHandle")?.toString();
    const website = formData.get("website")?.toString();
    const publicEmail = formData.get("publicEmail")?.toString();
    
    if (fullName) raw.fullName = fullName;
    if (gender) raw.gender = gender;
    if (dateOfBirth) raw.dateOfBirth = dateOfBirth;
    if (role) raw.role = role;
    if (email) raw.email = email;
    if (isEmailVerified) raw.isEmailVerified = isEmailVerified === "true";
    if (bio) raw.bio = bio;
    if (instagramHandle) raw.instagramHandle = instagramHandle;
    if (website) raw.website = website;
    if (publicEmail) raw.publicEmail = publicEmail;
    
    let data;
    try {
      data = profileSchema.parse(raw);
    } catch (err) {
      throw new Error(`Validation failed: ${JSON.stringify(err)}`);
    }

    const updated = await payload.update({
      collection: "users",
      id: userId,
      data,
    });

    await setAuthCookie(updated.id);

    return { success: true, user: updated };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

const saveSchema = z.object({
  attributeIds: z.array(z.string().min(3)).min(1, "Must pass at least one ID"),
  mode: z.enum(["append", "replace"]).optional(),
});

export async function saveUserAttributesAction(formData: FormData) {
  /* 1. auth cookie → user id */
  const rawToken = await readAuthToken();
  if (!rawToken) return { error: "unauthenticated" };

  let userId: string;
  try {
    userId = (
      jwt.verify(rawToken, JWT_SECRET) as {
        id: string;
      }
    ).id;
  } catch {
    return { error: "invalid token" };
  }

  /* 2. validate incoming IDs */
  const data = saveSchema.safeParse({
    attributeIds: formData.getAll("attributeIds").map(String),
  });

  if (!data.success) return { error: data.error.flatten() };

  /* 3. update */
  await addAttributesToUser(
    userId,
    data.data.attributeIds,
    formData.get("mode")?.toString() === "append" ? "append" : "replace"
  );

  return { success: true };
}

export async function listUserAttributesAction(categorySlug?: string) {
  const rawToken = await readAuthToken();
  if (!rawToken) return { error: "unauthenticated" };

  let userId: string;
  try {
    userId = (jwt.verify(rawToken, JWT_SECRET) as { id: string }).id;
  } catch {
    return { error: "invalid token" };
  }

  /* payload depth 2 = resolve relationship → category object */
  const payload = await getPayload({
    config,
  });

  const user = await payload.findByID({
    collection: "users",
    id: userId,
    depth: 2, // attributes + their category
  });

  let attrs = (user.attributes as Attribute[]) ?? [];

  /* 4 ─ apply category filter if provided */
  if (categorySlug) {
    attrs = attrs.filter(
      (a) => (a?.category as AttributeCategory)?.slug === categorySlug
    );
  }

  return { attributes: attrs }; // array of full objects
}

/* ---------- Social Links Actions ---------- */
const socialLinksSchema = z.object({
  instagramHandle: z.string().max(50).optional(),
  website: z.string().url().optional().or(z.literal("")),
  publicEmail: z.string().email().optional().or(z.literal("")),
});

export async function updateSocialLinksAction(formData: FormData) {
  try {
    const payload = await getPayload({ config });

    const token = await readAuthToken();
    if (!token) throw new Error("Unauthenticated");

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      userId = decoded.id;
    } catch (error) {
      throw new Error("Invalid token");
    }

    // Extract data from FormData using get() method
    const raw: Record<string, unknown> = {};
    
    // Get each field individually
    const instagramHandle = formData.get("instagramHandle")?.toString();
    const website = formData.get("website")?.toString();
    const publicEmail = formData.get("publicEmail")?.toString();
    
    if (instagramHandle) raw.instagramHandle = instagramHandle;
    if (website) raw.website = website;
    if (publicEmail) raw.publicEmail = publicEmail;
    
    let data;
    try {
      data = socialLinksSchema.parse(raw);
    } catch (err) {
      throw new Error(`Validation failed: ${JSON.stringify(err)}`);
    }

    const updated = await payload.update({
      collection: "users",
      id: userId,
      data,
    });

    await setAuthCookie(updated.id);

    return { success: true, user: updated };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
