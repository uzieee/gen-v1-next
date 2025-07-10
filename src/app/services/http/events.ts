import { Event } from "@/payload-types";

/* services/http/events.ts
   -------------------------------------------------------------------------- */
export interface FetchEventsParams {
  /** ISO day, e.g. "2025-07-20" */
  date?: string;
  /** "HH:mm" 24-hour string */
  hour?: string;
  /** Category (event collection’s relationship id) */
  category?: string;
  /** Centre point for geo filter */
  lat?: number;
  lng?: number;
  /** Radius in **kilometres** */
  distanceKm?: number;
  /** Pagination (defaults page=1 limit=12) */
  page?: number;
  limit?: number;
}

export interface EventsResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  events: Event[];
}

/**
 * Fetch paginated events. All filter params are optional.
 *
 * ```ts
 * const data = await fetchEvents({ lat:-1.95, lng:30.06, distanceKm:25 })
 * ```
 */
export async function fetchEvents(
  params: FetchEventsParams = {}
): Promise<EventsResponse> {
  const qs = new URLSearchParams();

  if (params.lat !== undefined) qs.append("lat", params.lat.toString());
  if (params.lng !== undefined) qs.append("lng", params.lng.toString());
  if (params.distanceKm !== undefined)
    qs.append("distanceKm", params.distanceKm.toString());

  if (params.date) qs.append("date", params.date);
  if (params.hour) qs.append("hour", params.hour);
  if (params.category) qs.append("category", params.category);

  qs.append("page", (params.page ?? 1).toString());
  qs.append("limit", (params.limit ?? 12).toString());

  const res = await fetch(`/api/public-events?${qs.toString()}`, {
    next: { revalidate: 60 }, // cache 60 s (opt.)
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json() as Promise<EventsResponse>;
}

/* services/http/fetch-event.ts
   ----------------------------------------------------------------------- */
export async function fetchEvent({ key }: { key: string }): Promise<Event> {
  const res = await fetch(`/api/public-events/${encodeURIComponent(key)}`, {
    // optional: cache for 30 s on the client
    next: { revalidate: 30 },
  });

  if (res.status === 404) throw new Error("Event not found");

  if (!res.ok) throw new Error("Failed to fetch event");

  return res.json() as Promise<Event>;
}
