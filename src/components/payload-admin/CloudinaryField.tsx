/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useField } from "@payloadcms/ui";
import { CldUploadButton, CldImage } from "next-cloudinary";

export const CloudinaryField: React.FC = () => {
  const { value, setValue } = useField<string>();

  return (
    <div id={value?.toString()} className="flex items-center gap-3">
      <p className="text-white text-[1rem]">Header Image</p>
      {value && (
        // <img
        //   src={value}
        //   alt="preview"
        //   style={{
        //     width: 120,
        //     height: 60,
        //     objectFit: "cover",
        //     borderRadius: 8,
        //   }}
        // />
        <CldImage
          width="110"
          height="110"
          src={value}
          sizes="100vw"
          className="mt-8"
          alt={"gallery image"}
        />
      )}

      <CldUploadButton
        className="mt-8"
        uploadPreset="genv1_default" // define in Cloudinary console
        onSuccess={(res: any) => {
          console.log({ success: res });
          setValue(res?.info?.url);
        }}
        options={{ folder: "genv1-assets", cropping: false }}
      >
        {value ? "Change image" : "Upload image"}
      </CldUploadButton>
    </div>
  ) as any;
};
