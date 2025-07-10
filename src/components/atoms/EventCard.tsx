import { Event, Organizer } from "@/payload-types";
import dayjs from "dayjs";
import { CldImage } from "next-cloudinary";
import AvatarPlaceholder from "../molecules/AvatarPlaceholder";

interface EventCardProps {
  event?: Event;
  isLoading?: boolean;
  className?: string;
  onSelect?: () => void;
}

export default function EventCard({
  event,
  isLoading,
  className,
  onSelect,
}: EventCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`max-w-xs snap-start flex-shrink-0 transition-transform active:scale-95 ${className || ""}`}
    >
      {isLoading || !event ? (
        <div className="relative w-60 h-56 bg-secondary-800 rounded-3xl animate-pulse">
          <div className="absolute bottom-2.5 left-2.5 right-2.5 w-11/12">
            <div className="h-16 rounded-2xl w-full bg-main/30 flex flex-col justify-end">
              <div className="w-5 h-5 bg-secondary-800 rounded-full animate-pulse m-2.5"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-60 h-56 rounded-3xl">
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), url(${event.headerImage})`,
            }}
          />
          <div className="relative h-full flex flex-col justify-end">
            <div className="m-2.5 p-2.5 bg-main/30 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-main text-xs font-semibold font-syne">
                  {event.name}
                </div>
                {event.categories[0] && (
                  <div className="flex items-center gap-0.5">
                    <span className="text-main text-[10px] font-medium font-syne capitalize">
                      {event.categories[0]}
                      {event.categories.length > 1 &&
                        ` & ${event.categories.length - 1} more`}
                    </span>
                    {new Date(event.date).toDateString() ===
                      new Date().toDateString() && (
                      <div className="flex items-center justify-center w-3 h-3 border-2 border-main rounded-full">
                        <div className="w-1.5 h-1.5 bg-badge-red rounded-full"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 bg-secondary-800 rounded-full overflow-hidden relative">
                    {(event?.organizer as Organizer).headerImage ? (
                      <CldImage
                        width="24"
                        height="24"
                        src={(event?.organizer as Organizer).headerImage || ""}
                        sizes="100vw"
                        alt={(event?.organizer as Organizer).slug || "N/A"}
                      />
                    ) : (
                      <AvatarPlaceholder
                        fullName={(event?.organizer as Organizer).name}
                        className="!w-6 !h-6"
                      />
                    )}
                  </div>
                  <div className="font-syne text-main text-xs flex flex-col">
                    <div className="font-semibold">{event.streetAddress}</div>
                    <div className="font-normal">
                      {dayjs(event.date).isSame(dayjs(), "day")
                        ? "Today"
                        : dayjs(event.date).format("ddd, MMM D, YYYY")}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium font-syne text-main">
                  {dayjs(event.date).format("h:mm A")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
