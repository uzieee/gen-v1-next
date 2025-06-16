import { Check } from 'lucide-react'
import React from 'react'

interface SelectableListItemProps {
    icon?: string;
    language: string;
    selected: boolean;
    onToggle: () => void;
}

export default function SelectableListItem({ icon, language, selected, onToggle }: SelectableListItemProps) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-secondary-500 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
            {icon && <div className="w-9 h-9 flex items-center justify-center bg-primary-350 rounded-full text-lg">{icon}</div>}
            <div className="text-primary text-lg font-medium">{language}</div>
        </div>
        <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
            selected 
            ? 'border-primary bg-primary' 
            : 'border-secondary-500'
        }`}
        >
        {selected && (
            <Check className='w-5 h-5'/>
        )}
        </div>
    </div>
  )
}
