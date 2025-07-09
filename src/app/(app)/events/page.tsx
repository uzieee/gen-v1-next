'use client'
import React, { useState } from 'react'
import SearchBar from '@/components/atoms/SearchBar';
import Header from '@/components/molecules/Header'
import CalendarEventCard from '@/components/atoms/CalendarEventCard';
import { useRouter } from 'next/navigation';

export default function SuggestedEvents() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const onBack = () => {
        router.back();
    };
    const events = [
        {
        id: '1',
        month: 'Jun',
        day: '12',
        title: 'Quest Festival',
        time: '15:00 PM',
        location: 'Singapore'
        },
        {
        id: '2',
        month: 'May',
        day: '5',
        title: 'Event EDM',
        time: '18:00 PM',
        location: 'Viet Nam'
        },
        {
        id: '3',
        month: 'Jun',
        day: '12',
        title: 'Coachella Music Festival',
        time: '22:00 PM',
        location: 'Singapore'
        },
        {
        id: '4',
        month: 'Sep',
        day: '7',
        title: 'Music Festival - KPOP Awards Ceremony',
        time: '20:00 PM',
        location: 'Korean'
        },
        {
        id: '5',
        month: 'Jun',
        day: '15',
        title: 'Coachella Music Festival',
        time: '19:00 PM',
        location: 'California'
        }
    ];
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleEventClick = (id: string) => {
        router.push(`/events/${id}`);
    };
    const handleFilter = () => {
    };

    return (
        <>
            <Header onBack={onBack} title={"Search"} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleFilter={handleFilter}/>
            <div className="flex flex-col gap-6 px-6 pb-6">
                <div className="text-main-600 text-3xl font-light font-ariom">Suggested events</div>
                <div className='flex flex-col gap-4'>
                    {filteredEvents.map((event) => (
                        <CalendarEventCard key={event.id} event={event} handleClick={() => handleEventClick(event.id)}/>
                    ))}
                </div>
            </div>
        </>
    )
}
