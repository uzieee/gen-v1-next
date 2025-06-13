import React from 'react'
import Tag from '../atoms/Tag';

interface TagGroupProps {
    title: string;
    tags: { id: string; icon: React.ReactNode; label: string }[];
    selectedTags: string[];
    onTagToggle: (tagId: string) => void;
    defaultLength?: number;
    showAll?: boolean;
    onShowAll?: () => void;
}

export default function TagGroup({ title, tags, selectedTags, onTagToggle, defaultLength = 8, showAll = false, onShowAll }: TagGroupProps) {
  return (
    <div className="flex flex-col gap-5">
        <h2 className="font-inter font-medium text-lg text-main-700">{title}</h2>
        <div className="flex flex-wrap gap-2">
            {tags.slice(0, showAll ? tags.length : defaultLength).map((tag) => (
                <Tag
                key={tag.id}
                icon={tag.icon}
                label={tag.label}
                selected={selectedTags.includes(tag.id)}
                onClick={() => onTagToggle(tag.id)}
                />
            ))}
        </div>
        {!showAll && tags.length > 8 && (
        <div 
            onClick={onShowAll}
            className="w-fit text-main-700 underline text-xs hover:text-secondary-400 cursor-pointer"
        >
            Show all
        </div>
        )}
    </div>
  )
}
