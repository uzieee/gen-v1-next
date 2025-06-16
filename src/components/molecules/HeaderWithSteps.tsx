import React from 'react'

interface HeaderWithStepsProps {
    totalSteps?: number;
    activeIndicator: number;
    onSkip: () => void;
    action: string;
}

export default function HeaderWithSteps({ totalSteps = 4, activeIndicator, action, onSkip }: HeaderWithStepsProps) {
  const totalStepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center p-6 justify-between">
        <div onClick={onSkip} className="text-main-600 text-base font-bold font-ariom cursor-pointer">
            {action}
        </div>
        <div className="flex gap-2">
            {totalStepsArray.map((step) => (
                <div key={step} className={`${step == activeIndicator ? 'w-6 bg-main-700' : 'w-2 bg-primary-200'} h-2 rounded-full`}></div>
            ))}
        </div>
      </div>
  )
}
