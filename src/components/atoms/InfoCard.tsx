import { cn } from '@/lib/utils';
import React from 'react'

interface InfoCardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export default function InfoCard({ title, children, className = "" }: InfoCardProps) {
  return (
    <div className={
        cn('bg-background-100 rounded-2xl p-3.5 font-chivo', className)}>
        <div className="text-main text-base font-medium">{title}</div>
        {children}
    </div>
  )
}
