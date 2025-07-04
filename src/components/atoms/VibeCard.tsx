import React from "react";

interface VibeCardProps {
  emoji: React.ReactNode;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function VibeCard({
  emoji,
  label,
  selected,
  onSelect,
}: VibeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex flex-col items-center gap-2 py-4 mx-auto rounded-2xl border cursor-pointer transition-all duration-200 border-primary ${
        selected ? "bg-primary-200/15" : "bg-transparent hover:bg-primary-200/5"
      }`}
    >
      <div className="w-14 h-14 bg-primary-350 rounded-full flex items-center justify-center">
        <span>{emoji}</span>
      </div>
      <span
        className={`${selected ? "text-primary" : "text-main-600"} text-base font-normal font-inter`}
      >
        {label}
      </span>
    </button>
  );
}
