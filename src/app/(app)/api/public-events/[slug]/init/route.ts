/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { rotate, chunk } from "@/lib/utils";
import { genQuestions, genTopic } from "@/payload-hooks/roundtables";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<Record<string, any>> }
) {
  const payload = await getPayload({
    config: payloadConfig,
  });

  const slug = (await params).slug;

  // 1. fetch the event
  const { docs } = await payload.find({
    collection: "events",
    where: { slug: { equals: slug } },
    depth: 1,
  });

  const [event] = docs || [];

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const {
    numberOfSessions,
    numberOfTables,
    maxUsersPerTable,
    date: eventStart,
    sessionDuration,
    name: eventName,
  } = event;

  // 2. clear existing sessions & assignments
  const { docs: oldSessions } = await payload.find({
    collection: "sessions",
    where: { event: { equals: event.id } },
    limit: 100,
  });

  const sessIds = oldSessions.map((s) => s.id);
  if (sessIds.length) {
    await payload.delete({
      collection: "table-assignments",
      where: { session: { in: sessIds } },
    });
    await payload.delete({
      collection: "sessions",
      where: { id: { in: sessIds } },
    });
  }

  // 3. get all ticket holders
  // const { docs: tickets } = await payload.find({
  //   collection: "tickets",
  //   where: { event: { equals: event.id } },
  //   depth: 1,
  //   limit: 1000,
  // });
  const { docs: users } = await payload.find({
    collection: "users",
    where: {
      role: {
        equals: "member",
      },
    },
    depth: 2,
  });

  if (!users.length) {
    return NextResponse.json({ error: "No ticket holders" }, { status: 400 });
  }
  const userCount = users.length;

  // 4. create sessions + assignments
  const createdSessions: any[] = [];
  for (let i = 1; i <= numberOfSessions; i++) {
    // compute start time
    const start = new Date(eventStart);
    start.setMinutes(start.getMinutes() + (i - 1) * sessionDuration);

    // 4.a — create session
    const session = await payload.create({
      collection: "sessions",
      data: {
        event: event.id,
        sessionNumber: i,
        startTime: start.toISOString(),
        duration: sessionDuration,
      },
    });

    // 4.b — generate topic
    const topic = await genTopic(eventName, i);
    await payload.update({
      collection: "sessions",
      id: session.id,
      data: { topic },
    });

    // 4.c — assign users to tables
    const offset = Math.floor(((i - 1) * userCount) / numberOfTables);
    const rotated = rotate(users, offset);
    const groups = chunk(rotated, maxUsersPerTable);

    // Get all users for this session (flatten all groups)
    const sessionUsers = groups.flat();

    // Generate questions for all users in this session in one batch
    const allQuestions = await genQuestions(sessionUsers, topic);

    console.log({ allQuestions });

    for (let t = 0; t < numberOfTables; t++) {
      const group = groups[t] ?? [];
      for (const user of group) {
        // Get the pre-generated questions for this user
        const userQuestions = allQuestions[user.id] || [
          `What's your perspective on ${topic}?`,
          `How does ${topic} connect to your interests or work?`,
        ];

        await payload.create({
          collection: "table-assignments",
          data: {
            session: session.id,
            tableNumber: t + 1,
            user: user.id,
            questions: userQuestions.map((q) => ({ text: q })),
          },
        });
      }
    }

    createdSessions.push(session);
  }

  return NextResponse.json({
    ok: true,
    sessionsCreated: createdSessions.length,
  });
}
