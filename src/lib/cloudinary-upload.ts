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
  // Check if Cloudinary is configured
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary not configured. Please check your environment variables.");
  }

  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        folder: "users",
        resource_type: "auto", // Automatically detect image/video
        quality: "auto", // Auto-optimize quality
        fetch_format: "auto", // Auto-optimize format
      },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return reject(new Error(`Failed to upload image: ${err.message}`));
        }
        if (!result) {
          return reject(new Error("No result from Cloudinary upload"));
        }
        console.log(`✅ Image uploaded successfully: ${result.secure_url}`);
        resolve(result.secure_url);
      }
    );
    
    try {
      fileToStream(file).pipe(stream);
    } catch (error) {
      console.error("Error creating file stream:", error);
      reject(new Error("Failed to process file for upload"));
    }
  });
}
