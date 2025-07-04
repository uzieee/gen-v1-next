"use client";

import { CldImage } from "next-cloudinary";
import { useField } from "@payloadcms/ui";
import React from "react";

export const CloudinaryCell: React.FC = () => {
  const { value } = useField<string>();
  return (
    <div>
      {value && (
        <CldImage
          width="110"
          height="110"
          src={value}
          sizes="100vw"
          alt={"gallery image"}
        />
      )}
      {/* {data.url || "Untitled"} */}
    </div>
  );
};

export default CloudinaryCell;
