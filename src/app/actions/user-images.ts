"use server";

import { z } from "zod";
import jwt from "jsonwebtoken";
import { File } from "formdata-node";
import { getPayload } from "payload";
import config from "@payload-config";
import { readAuthToken } from "@/lib/read-auth-token";
import { JWT_SECRET } from "@/lib/jwt-secret";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import "dotenv/config";

const schema = z.object({
  profileImage: z.instanceof(File).optional(),
  galleryImages: z.array(z.instanceof(File)).optional(),
  galleryMode: z.enum(["append", "replace"]).default("append"),
});

export async function updateUserImagesAction(formData: FormData) {
  /* ── auth ─────────────────────────────────────────────── */
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

  /* ── validate & coerce formdata ───────────────────────── */
  const parsed = schema.safeParse({
    profileImage: formData.get("profileImage") ?? undefined,
    galleryImages: formData.getAll("galleryImages") as unknown[],
    galleryMode: formData.get("galleryMode") ?? "append",
  });
  if (!parsed.success) return { error: parsed.error.flatten() };

  const { profileImage, galleryImages, galleryMode } = parsed.data;

  /* ── upload files to Cloudinary ───────────────────────── */
  let profileURL: string | undefined;
  if (profileImage) profileURL = await uploadToCloudinary(profileImage);

  let galleryURLs: string[] | undefined;
  if (galleryImages?.length) {
    galleryURLs = await Promise.all(
      galleryImages.map((f) => uploadToCloudinary(f))
    );
  }

  /* ── update Payload user ──────────────────────────────── */
  const payload = await getPayload({
    config,
  });

  let nextGallery;
  if (galleryURLs) {
    if (galleryMode === "replace") {
      nextGallery = galleryURLs;
    } else {
      const user = await payload.findByID({
        collection: "users",
        id: userId,
        depth: 0,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const current = (user.galleryImages ?? []).map((o: any) => o.url);
      nextGallery = Array.from(new Set([...current, ...galleryURLs]));
    }
  }

  await payload.update({
    collection: "users",
    id: userId,
    data: {
      ...(profileURL && { profileImage: profileURL }),
      ...(nextGallery && {
        galleryImages: nextGallery.map((url) => ({ url })),
      }),
    },
  });

  return { success: true };
}
