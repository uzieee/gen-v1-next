import React from 'react'
import IconButton from '../atoms/IconButton'
import { ArrowLeft } from 'lucide-react'

interface HeaderProps {
  onBack: () => void
  title?: string 
  onRight?: () => void 
  rightIcon?: React.ReactNode, 
}

export default function Header({ onBack, onRight, rightIcon, title }: HeaderProps) {
  return (
    <div className="flex items-center p-3 justify-between">
        <IconButton icon={<ArrowLeft className='!w-6 !h-6'/>} onClick={onBack} variant='ghost' />
        <div className="text-xl font-bold font-ariom text-main">{title}</div>
        <IconButton icon={rightIcon} className={rightIcon ? '' : 'invisible'} onClick={onRight} variant='ghost' />
    </div>
  )
}
