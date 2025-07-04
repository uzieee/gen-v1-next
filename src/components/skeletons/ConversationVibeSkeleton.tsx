"use client";
import Skeleton from "@/components/ui/skeleton";

export default function ConversationVibeSkeleton() {
  /* one square card */
  const Card = () => (
    <Skeleton
      width="w-full"
      height="h-32"
      rounded="rounded-3xl"
      className="border-[1.5px] border-lime-400/10"
    />
  );

  return (
    <div className="min-h-screen bg-background flex flex-col text-white">
      {/* header row */}
      <div className="flex justify-between items-center px-6 pt-5 pb-8">
        <Skeleton width="w-12" height="h-4" />
        <Skeleton width="w-14" height="h-2" rounded="rounded-full" />
      </div>

      {/* title (two lines) */}
      <Skeleton width="w-40" height="h-6" className="mx-6 mb-1" />
      <Skeleton width="w-20" height="h-6" className="mx-6 mb-8" />

      {/* 2-col grid of 6 cards */}
      <div className="px-6 grid grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>

      {/* sticky footer button */}
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
