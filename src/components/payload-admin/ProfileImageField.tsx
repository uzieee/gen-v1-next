'use client'

import { useField } from "@payloadcms/ui";
import { CldImage } from "next-cloudinary";

export const ProfileImageField: React.FC = () => {
  const { value } = useField<string>()


  return (
    <div className="flex items-center gap-3">
      {value && <CldImage
        width="110"
        height="110"
        src={value}
        sizes="100vw"
        alt={"gallery image"}
      />}
      {/* <CldUploadWidget onSuccess={}>
            {({ open }) => {
                return (
                <button onClick={() => open()}>
                    Upload an Image
                </button>
                );
            }}
      </CldUploadWidget> */}
    </div>
  )
}
