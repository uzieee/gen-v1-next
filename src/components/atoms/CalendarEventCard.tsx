import React from 'react'

interface CalendarEventCardProps {
    event: {
        month: string;
        day: string;
        title: string;
        time: string;
        location: string;
    };
    handleClick?: () => void;
}

export default function CalendarEventCard({ event, handleClick }: CalendarEventCardProps) {
    return (
        <div className="flex items-start gap-4 transition-colors cursor-pointer" onClick={handleClick}>
            <div className="flex flex-col items-center py-7 px-8 rounded-4xl font-ariom text-main-600 w-[104px] h-[104px] bg-black/15">
                <div className="text-sm">{event.month}</div>
                <div className="text-lg">{event.day}</div>
            </div>
            
            <div className="flex flex-col gap-1 font-ariom font-light">
                <h3 className="text-main-600 text-lg line-clamp-2">{event.title}</h3>
                <div className="flex items-center gap-8 text-secondary text-sm">
                <span>{event.time}</span>
                <span>{event.location}</span>
                </div>
            </div>
        </div>
    )
}
