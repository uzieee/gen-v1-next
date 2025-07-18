/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/users/[userId]/pending-sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: any) {
  const { userId } = await params;
  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  const payload = await getPayload({
    config: payloadConfig,
  });

  // 1) find all assignments for this user
  const { docs: assignments } = await payload.find({
    collection: "table-assignments",
    where: { user: { equals: userId } },
    depth: 0,
    limit: 1000,
  });

  if (!assignments.length) {
    return NextResponse.json([]);
  }

  // 2) extract unique session IDs
  const sessionIds = Array.from(
    new Set(assignments.map((a) => a.session as string))
  );

  // 3) only sessions starting in the future
  // const nowIso = new Date().toISOString();
  const { docs: sessions } = await payload.find({
    collection: "sessions",
    where: {
      id: { in: sessionIds },
      // startTime: { greater_than: nowIso },
    },
    depth: 1, // populate topic, event ref if you like
    sort: "startTime", // ascending
    limit: 100,
  });

  const results = assignments.map((a) => ({
    tableNumber: a.tableNumber,
    ...sessions.find((s) => s.id === a.session),
  }));

  return NextResponse.json(results);
}
