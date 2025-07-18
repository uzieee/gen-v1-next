"use client";

import Skeleton from "@/components/ui/skeleton";

export default function EventDetailSkeleton() {
  /* small round icon */
  const Icon = () => (
    <Skeleton width="w-6" height="h-6" rounded="rounded-full" />
  );

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-6">
        <Icon />
        <Skeleton width="w-40" height="h-6" />
        <Icon />
      </div>

      {/* hero image + badge */}
      <div className="relative m-6 mt-8">
        <Skeleton width="w-full" height="h-64" rounded="rounded-3xl" />
      </div>

      {/* progress bar bar */}
      <div className="mx-auto mb-6">
        <Skeleton width="w-24" height="h-2" rounded="rounded-full" />
      </div>

      {/* time & address rows */}
      <div className="px-6 space-y-4">
        <div className="flex items-center gap-3">
          <Icon />
          <Skeleton width="w-28" height="h-5" />
        </div>
        <div className="flex items-center gap-3">
          <Icon />
          <Skeleton width="w-40" height="h-5" />
        </div>
      </div>

      {/* about */}
      <div className="px-6 mt-10">
        <Skeleton width="w-24" height="h-6" className="mb-3" />
        <Skeleton width="w-full" height="h-4" className="mb-2" />
        <Skeleton width="w-5/6" height="h-4" className="mb-2" />
        <Skeleton width="w-3/4" height="h-4" />
      </div>

      {/* location section */}
      <div className="px-6 mt-10">
        <Skeleton width="w-28" height="h-6" className="mb-4" />
        <div className="w-full p-6 h-32 rounded-3xl">
          {/* placeholder row in box */}
          <div className="flex items-center gap-3">
            <Icon />
            <div className="flex flex-col gap-2">
              <Skeleton width="w-40" height="h-4" />
              <Skeleton width="w-24" height="h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* sticky RSVP button */}
      <div className="mt-auto">
        <Skeleton
          width="w-full"
          height="h-16"
          rounded="rounded-t-[36px]"
          className="bg-lime-400/30"
        />
      </div>
    </div>
  );
}
