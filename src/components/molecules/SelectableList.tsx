import React from 'react'
import SelectableListItem from '../atoms/SelectableListItem'

interface SelectableListProps {
    items: Array<{ name: string, icon?: string }>;
    selectedItems: string[];
    handleToggle: (item: string) => void;
    item: string;
}

export default function SelectableList({
    items,
    selectedItems,
    handleToggle,
    item
}: SelectableListProps) {
  return (
    <>
        {items.length === 0 ? (
            <div className="text-center text-secondary-500">
                {item} not found.
            </div>
        ) : (
            items.map((item) => (
                <SelectableListItem
                    key={item.name}
                    language={item.name}
                    icon={item.icon}
                    selected={selectedItems.includes(item.name)}
                    onToggle={() => handleToggle(item.name)}
                />
            ))
        )}
    </>
  )
}
