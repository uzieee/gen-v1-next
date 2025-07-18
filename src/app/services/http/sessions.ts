import { Session, User } from "@/payload-types";

export async function fetchPendingSessions(params: {
  userId: string;
}): Promise<(Session & { tableNumber: number })[]> {
  const res = await fetch(
    `/api/public-users/${params.userId}/pending-sessions`,
    {
      //   next: { revalidate: 60 }, // cache 60 s (opt.)
    }
  );

  if (!res.ok) throw new Error("Failed to fetch events");

  return res.json() as Promise<(Session & { tableNumber: number })[]>;
}

export interface EventInfo {
  id: string;
  name: string;
  slug?: string;
  // add other event properties as needed
}

export interface SessionInfo {
  id: string;
  sessionNumber: number;
  startTime: string; // ISO timestamp
  duration: number; // minutes
  topic: string;
  event: EventInfo;
}

export interface Attendee {
  user: User;
  questions: { text: string }[];
}

export interface SessionTableResponse {
  session: SessionInfo;
  tableNumber: number;
  attendees: Attendee[];
}

/**
 * Fetches the details (users + questions) for a single table in a session.
 * @param sessionId  the ID of the session
 * @param tableNumber 1-based table index
 */
export async function fetchSessionTable({
  sessionId,
  tableNumber,
}: {
  sessionId: string;
  tableNumber: number;
}): Promise<SessionTableResponse> {
  const qs = new URLSearchParams({ tableNumber: tableNumber.toString() });
  const res = await fetch(
    `/api/round-table-sessions/${encodeURIComponent(sessionId)}?${qs.toString()}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      `Failed to load table ${tableNumber} for session ${sessionId}: ${
        err?.error ?? res.statusText
      }`
    );
  }
  return (await res.json()) as SessionTableResponse;
}
