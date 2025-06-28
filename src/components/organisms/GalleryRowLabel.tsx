import type { PayloadClientReactComponent, RowLabelComponent } from "payload";
import { CldImage } from "next-cloudinary";

import { useRowLabel } from "@payloadcms/ui";
import React from "react";

export const GalleryRowLabel: PayloadClientReactComponent<
  RowLabelComponent
> = () => {
  const { data } = useRowLabel<{ url: string }>();
  return (
    <div
      id="custom-array-row-label"
      style={{ color: "coral", textTransform: "uppercase" }}
    >
      <CldImage
        width="20"
        height="20"
        src={data.url}
        sizes="100vw"
        alt={"gallery image"}
      />
      {data.url || "Untitled"}
    </div>
  );
};
