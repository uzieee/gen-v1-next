/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<Record<string, any>> }
) {
  const qp = new URL(req.url).searchParams;
  const tableNumber = Number(qp.get("table"));
  if (isNaN(tableNumber) || tableNumber < 1) {
    return NextResponse.json(
      { error: "Missing or invalid tableNumber" },
      { status: 400 }
    );
  }

  const slug = (await params).slug;

  const payload = await getPayload({
    config: payloadConfig,
  });

  // find the event
  const { docs: events = [] } = await payload.find({
    collection: "events",
    where: { slug: { equals: slug } },
    depth: 0,
  });
  const [event] = events;
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  // find all sessions for that event
  const { docs: sessions } = await payload.find({
    collection: "sessions",
    where: { event: { equals: event.id } },
    depth: 0,
    limit: 100,
  });
  const sessionIds = sessions.map((s) => s.id);

  // find assignments matching tableNumber
  const { docs: assignments } = await payload.find({
    collection: "table-assignments",
    where: {
      session: { in: sessionIds },
      tableNumber: { equals: tableNumber },
    },
    depth: 1, // populate user & session.topic
    limit: 1000,
  });

  return NextResponse.json(assignments);
}
