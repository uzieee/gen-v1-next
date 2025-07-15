"use client";
import React, { useState } from "react";
import SearchBar from "@/components/atoms/SearchBar";
import Header from "@/components/molecules/Header";
import CalendarEventCard from "@/components/atoms/CalendarEventCard";
import { useRouter } from "next/navigation";
import useApiQuery from "@/app/hooks/use-api-query";
import { fetchEvents } from "@/app/services/http/events";

export default function SuggestedEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  const { data: eventsData } = useApiQuery({
    apiHandler: fetchEvents,
    payload: {
      page: 1,
      limit: 10,
    },
    queryKey: ["events", "home-page"],
  });

  const filteredEvents = (eventsData?.events || []).filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.streetAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEventClick = (id: string) => {
    router.push(`/events/${id}`);
  };
  const handleFilter = () => {};

  return (
    <>
      <Header onBack={onBack} title={"Search"} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleFilter={handleFilter}
      />
      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="text-main-600 text-3xl font-light font-ariom">
          Suggested events
        </div>
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <CalendarEventCard
              key={event.slug}
              event={event}
              handleClick={() => handleEventClick(event?.slug || "")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
