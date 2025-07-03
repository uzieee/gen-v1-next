"use client";
import Skeleton from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  /* pill tag */
  const Pill = ({ w = "w-20" }: { w?: string }) => (
    <Skeleton
      width={w}
      height="h-7"
      rounded="rounded-full"
      className="bg-white/5"
    />
  );

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* cover / profile photo */}
      <Skeleton
        width="w-full"
        height="h-[45vh]"
        className="rounded-b-3xl rounded-t-[0]"
      />

      {/* "About me" card */}
      <div className="px-5 space-y-4 mt-10">
        <Skeleton width="w-full" height="h-20" rounded="rounded-xl" />
      </div>

      {/* "Let's talk about" tags */}
      <div className="px-5 mt-6 space-y-4">
        <Skeleton width="w-36" height="h-4" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Pill key={i} w="w-24" />
          ))}
        </div>
      </div>

      {/* conversation starter button */}
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
