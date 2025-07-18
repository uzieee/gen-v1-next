// app/api/sessions/[sessionId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const url = new URL(req.url);
  const tn = url.searchParams.get("tableNumber");

  // 1) validate inputs
  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing sessionId parameter" },
      { status: 400 }
    );
  }
  if (!tn) {
    return NextResponse.json(
      { error: "Missing tableNumber query parameter" },
      { status: 400 }
    );
  }
  const tableNumber = parseInt(tn, 10);
  if (isNaN(tableNumber) || tableNumber < 1) {
    return NextResponse.json({ error: "Invalid tableNumber" }, { status: 400 });
  }

  // 2) init Payload
  const payload = await getPayload({
    config: payloadConfig,
  });

  // 3) fetch session (+ its event)
  const session = await payload.findByID({
    collection: "sessions",
    id: sessionId,
    depth: 1, // populates session.event
  });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // 4) fetch only this table’s assignments
  const { docs: assignments } = await payload.find({
    collection: "table-assignments",
    where: {
      session: { equals: sessionId },
      tableNumber: { equals: tableNumber },
    },
    depth: 1, // populates each a.user
    limit: 1000,
  });

  // 5) shape attendees
  const attendees = assignments.map((a) => ({
    user: a.user, // populated user doc
    questions: a.questions, // [{ text }, …]
  }));

  // 6) return only that table
  return NextResponse.json({
    session: {
      id: session.id,
      sessionNumber: session.sessionNumber,
      startTime: session.startTime,
      duration: session.duration,
      topic: session.topic,
      event: session.event,
    },
    tableNumber,
    attendees,
  });
}
