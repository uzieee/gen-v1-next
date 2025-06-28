import React from "react";
import SelectableListItem from "../atoms/SelectableListItem";

interface SelectableListProps {
  items: Array<{ label: string; icon?: string; id: string }>;
  selectedItems: string[];
  handleToggle: (item: string) => void;
  item: string;
}

export default function SelectableList({
  items,
  selectedItems,
  handleToggle,
  item,
}: SelectableListProps) {
  return (
    <>
      {items.length === 0 ? (
        <div className="text-center text-secondary-500">{item} not found.</div>
      ) : (
        items.map((item) => (
          <SelectableListItem
            key={item.label}
            language={item.label}
            icon={item.icon}
            selected={selectedItems.includes(item.id)}
            onToggle={() => handleToggle(item.id)}
          />
        ))
      )}
    </>
  );
}
