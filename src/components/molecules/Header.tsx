import React from 'react'
import IconButton from '../atoms/IconButton'
import { ArrowLeft } from 'lucide-react'

export default function Header({ onBack, title }: { onBack: () => void, title?: string }) {
  return (
    <div className="flex items-center p-3 justify-between">
        <IconButton icon={<ArrowLeft className='!w-6 !h-6'/>} onClick={onBack} variant='ghost' />
        <div className="text-xl font-bold font-ariom text-main">{title}</div>
        <IconButton icon={<ArrowLeft />} className='invisible'/>
    </div>
  )
}
