/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CldImage } from "next-cloudinary"
import { PayloadClientReactComponent } from "payload"

export const ProfileImageCell: PayloadClientReactComponent<any> = ({ data }: any) =>
  data ? (
    <CldImage
        width="80"
        height="80"
        src={data as string}
        sizes="100vw"
        alt={"Profile image"}
      />
  ) : null