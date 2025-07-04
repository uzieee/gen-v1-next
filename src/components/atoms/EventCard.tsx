interface EventCardProps {
    event?: {
        id: string;
        title: string;
        category: string;
        location: string;
        direction: string;
        time: string;
        image: string;
    };
    isLoading?: boolean;
}

export default function EventCard({ event, isLoading }: EventCardProps) {
    return (
        <div className="max-w-xs">
            {isLoading || !event ? 
                <div className="relative w-60 mx-auto h-56 bg-secondary-800 rounded-3xl mr-4 animate-pulse">
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 w-11/12">
                        <div className="h-16 rounded-2xl w-full bg-main/30 flex flex-col justify-end">
                            <div className="w-5 h-5 bg-secondary-800 rounded-full animate-pulse m-2.5"></div>
                        </div>
                    </div>
                </div>
            : 
                <div className="relative w-60 mx-auto h-56 rounded-3xl mr-4">
                    <div 
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl`}
                        style={{ 
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), url(${event.image})`,
                        }}
                    />
                    <div className="relative h-full flex flex-col justify-end">
                        <div className="m-2.5 p-2.5 bg-main/30 rounded-2xl flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="text-main text-xs font-semibold font-syne">{event.title}</div>
                                <div className="flex items-center gap-0.5">
                                    <span className="text-main text-[10px] font-medium font-syne">{event.category}</span>
                                    <div className='flex items-center justify-center w-3 h-3 border-2 border-main rounded-full'>
                                        <div className="w-1.5 h-1.5 bg-badge-red rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 bg-secondary-800 rounded-full"></div>
                                    <div className='font-syne text-main text-xs flex flex-col'>
                                        <div className="font-semibold">{event.location}</div>
                                        <div className='font-normal'>{event.direction}</div>
                                    </div>
                                </div>
                                <div className='text-xs font-medium font-syne text-main'>{event.time}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
