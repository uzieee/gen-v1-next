/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import type { File } from "formdata-node";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Converts a File into a Node Readable stream */
function fileToStream(file: File): Readable {
  return Readable.from(file.stream() as any);
}

export async function uploadToCloudinary(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "users" }, // optional folder
      (err, result) => {
        if (err || !result) return reject(err);
        resolve(result.secure_url); // we store only the URL
      }
    );
    fileToStream(file).pipe(stream);
  });
}
