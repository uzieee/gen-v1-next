import Skeleton from "@/components/ui/skeleton";

export default function InterestsSkeleton() {
  /* helper: a pill placeholder */
  const Pill = ({ w = "w-28" }: { w?: string }) => (
    <Skeleton
      width={w}
      height="h-10"
      rounded="rounded-full"
      className="border-[1.5px] border-lime-400/10"
    />
  );

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* header row */}
      <div className="flex justify-between items-center px-6 pt-5 pb-10">
        <Skeleton width="w-20" height="h-4" />
        <Skeleton width="w-12" height="h-2" rounded="rounded-full" />
      </div>

      {/* title */}
      <Skeleton width="w-56" height="h-6" className="mx-6 mb-12" />

      {/* "Interests" label */}
      <Skeleton width="w-24" height="h-4" className="mx-6 mb-4" />

      {/* grid of pills */}
      <div className="mx-6 mb-6 flex flex-wrap gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Pill key={i} w="w-28" />
        ))}
      </div>

      {/* divider */}
      <Skeleton
        width="w-full"
        height="h-px"
        className="mx-6 mb-6 bg-zinc-700"
      />

      {/* "Sports" label */}
      <Skeleton width="w-16" height="h-4" className="mx-6 mb-4" />

      {/* more pills */}
      <div className="mx-6 flex flex-wrap gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Pill key={i} w="w-24" />
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
