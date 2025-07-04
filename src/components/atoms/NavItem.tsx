import React, { ReactNode } from 'react'

export default function NavItem({ 
    icon, 
    label, 
    hasRedDot = false,
    isActive, 
    onClick,
}: {
    icon: ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    hasRedDot?: boolean;
}) {
    return (
        <div 
            onClick={onClick}
            className="flex flex-col items-center relative transition-colors cursor-pointer"
        >
            {isActive ? (
                <>
                    <div className="absolute -top-2 w-2 h-2 bg-background rounded-full"></div>
                    <span className={`font-ariom text-base font-bold text-background`}>
                        {label}
                    </span>
                </>
            ) : (
                <>
                    {hasRedDot && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></div>
                    )}
                    {icon}
                </>
            )}
        </div>
    );
}
