import { cn } from '@/lib/utils'
import React from 'react'

interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
  className?: string;
}

export default function ProgressIndicator({currentIndex, total, className}: ProgressIndicatorProps) {
  return (
    <div className={
        cn('px-3.5 pt-3.5 pb-0.5 w-full flex gap-1 justify-center',
            className
        )}>
        {Array.from({ length: total }, (_, index) => (
        <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 w-full ${
            index === currentIndex 
                ? 'bg-main' 
                : 'bg-main/40'
            }`}
        />
        ))}
    </div>
  )
}
