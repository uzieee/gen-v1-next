"use client";

import Skeleton from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  /* event card (square) */
  const EventCard = () => (
    <Skeleton
      width="w-60"
      height="h-60"
      rounded="rounded-[32px]"
      className="shrink-0 mr-5"
    />
  );

  /* community card (large rounded) */
  const CommunityCard = () => (
    <Skeleton
      width="w-full"
      height="h-[440px]"
      rounded="rounded-[40px]"
      className="mb-6"
    />
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* header */}
      <div className="px-6 pt-12 flex justify-between items-center">
        <div>
          <Skeleton width="w-40" height="h-5" className="mb-1" />
          <Skeleton width="w-52" height="h-8" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton
            width="w-10"
            height="h-10"
            rounded="rounded-full"
            className="bg-lime-400/30"
          />
          <Skeleton width="w-10" height="h-10" rounded="rounded-full" />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-6 mt-14 mb-4 flex justify-between items-center">
        <Skeleton width="w-44" height="h-6" />
        <Skeleton width="w-14" height="h-4" />
      </div>
      <div className="pl-6 flex overflow-x-auto mb-12">
        <EventCard />
        <EventCard />
      </div>

      {/* Community */}
      <div className="px-6 mb-4 flex justify-between items-center">
        <Skeleton width="w-32" height="h-6" />
        <Skeleton width="w-14" height="h-4" />
      </div>
      <div className="px-6 flex flex-col">
        <CommunityCard />
      </div>

      {/* bottom nav */}
      <div className="mt-auto">
        <Skeleton
          width="w-full"
          height="h-20"
          rounded="rounded-t-[36px]"
          className="bg-lime-400/30"
        />
      </div>
    </div>
  );
}
