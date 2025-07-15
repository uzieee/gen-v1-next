import { Event } from "@/payload-types";
import dayjs from "dayjs";
import React from "react";

interface CalendarEventCardProps {
  event: Event;
  handleClick?: () => void;
}

export default function CalendarEventCard({
  event,
  handleClick,
}: CalendarEventCardProps) {
  return (
    <div
      className="flex items-start gap-4 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center py-7 px-8 rounded-4xl font-ariom text-main-600 w-[104px] h-[104px] bg-black/15">
        <div className="text-sm">{dayjs(event.date).format("MMM")}</div>
        <div className="text-lg">{dayjs(event.date).format("DD")}</div>
      </div>

      <div className="flex flex-col gap-1 font-ariom font-light">
        <h3 className="text-main-600 text-lg line-clamp-2">{event.name}</h3>
        <div className="flex items-center gap-8 text-secondary text-sm">
          <span>{dayjs(event.date).format("HH:mm")}</span>
          <span>{event.streetAddress}</span>
        </div>
      </div>
    </div>
  );
}
