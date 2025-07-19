// components/skeletons/NotificationsSkeleton.tsx
"use client";

import Skeleton from "@/components/ui/skeleton";

export default function NotificationsSkeleton() {
  // simulate 5 notifications
  const items = Array.from({ length: 5 });

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <Skeleton width="w-6" height="h-6" rounded="rounded-full" />
        <Skeleton width="w-24" height="h-6" rounded="rounded" />
        <Skeleton width="w-6" height="h-6" rounded="rounded-full" />
      </div>

      <div className="divide-y divide-white/5">
        {items.map((_, idx) => (
          <div key={idx} className="flex items-center px-4 py-5 gap-4">
            {/* Avatar */}
            <Skeleton width="w-10" height="h-10" rounded="rounded-full" />

            {/* Text block */}
            <div className="flex-1 space-y-2">
              <Skeleton width="w-1/3" height="h-4" rounded="rounded" />
              <Skeleton width="w-2/3" height="h-3" rounded="rounded" />
            </div>

            {/* Actions or timestamp */}
            {idx < 3 ? (
              <div className="flex gap-2">
                <Skeleton width="w-20" height="h-8" rounded="rounded-full" />
                <Skeleton width="w-20" height="h-8" rounded="rounded-full" />
              </div>
            ) : (
              <Skeleton width="w-16" height="h-4" rounded="rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
