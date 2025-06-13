
import React from 'react'
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface TagProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tag({ icon, label, selected, onClick, className }: TagProps) {
  return (
    <Badge className={
        cn(
            'font-inter font-normal text-sm rounded-full py-2 px-3 cursor-pointer',
            selected ? 'bg-primary-200 text-main font-bold' : 
            'border-2 border-primary text-main-700',
            className
        )
    } onClick={onClick} variant={selected ? 'default' : 'outline'}>
        <span>{icon}</span>
        <span>{label}</span>
    </Badge>
  )
}
