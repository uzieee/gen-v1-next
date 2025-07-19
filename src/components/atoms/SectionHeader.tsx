import React from "react";

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({
  title,
  emoji,
  onSeeAll,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between text-main font-syne pr-3">
      <div className="text-base font-bold">
        {title} {emoji}
      </div>
      {onSeeAll && (
        <div
          onClick={onSeeAll}
          className="text-xs font-medium transition-all cursor-pointer active:scale-95"
        >
          See All
        </div>
      )}
    </div>
  );
}
