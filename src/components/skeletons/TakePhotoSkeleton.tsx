"use client";
import Skeleton from "@/components/ui/skeleton";

export default function TakePhotoSkeleton() {
  /* square upload slot */
  const Slot = ({ size = "h-36 w-36" }: { size?: string }) => (
    <Skeleton
      width={size.split(" ")[1]}
      height={size.split(" ")[0]}
      rounded="rounded-2xl"
      className="border-[1.5px] border-lime-400/10"
    />
  );

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* header */}
      <div className="flex justify-between items-center px-6 pt-5 pb-16">
        <Skeleton width="w-12" height="h-4" />
        <Skeleton width="w-14" height="h-2" rounded="rounded-full" />
      </div>

      {/* title */}
      <Skeleton width="w-52" height="h-6" className="mx-6 mb-20" />

      {/* main photo slot */}
      <div className="flex justify-center mb-10">
        <Slot size="h-48 w-48" />
      </div>

      {/* 3 smaller slots */}
      <div className="grid grid-cols-3 gap-6 px-12 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Slot key={i} size="h-20 w-full" />
        ))}
      </div>

      {/* footer button */}
      <div className="mt-auto">
        <Skeleton
          width="w-full"
          height="h-14"
          rounded="rounded-t-3xl"
          className="bg-lime-400/30"
        />
      </div>
    </div>
  );
}
