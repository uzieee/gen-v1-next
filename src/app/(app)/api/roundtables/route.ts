import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    
    const { docs: roundtables } = await payload.find({
      collection: "roundtables",
      depth: 2,
      sort: "-createdAt",
    });

    return NextResponse.json({ docs: roundtables });
  } catch (error) {
    console.error("Error fetching roundtables:", error);
    return NextResponse.json(
      { error: "Failed to fetch roundtables" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.event || !data.session || !data.topic) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate dates
    if (data.startTime && data.endTime) {
      const startTime = new Date(data.startTime);
      const endTime = new Date(data.endTime);
      
      if (startTime >= endTime) {
        return NextResponse.json(
          { error: "End time must be after start time" },
          { status: 400 }
        );
      }
    }

    const roundtable = await payload.create({
      collection: "roundtables",
      data: {
        name: data.name,
        event: data.event,
        session: data.session,
        topic: data.topic,
        description: data.description || "",
        moderator: data.moderator || null,
        maxParticipants: data.maxParticipants || 8,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        status: data.status || "scheduled",
        meetingLink: data.meetingLink || "",
        iceBreakerPrompts: data.iceBreakerPrompts || [],
      },
    });

    return NextResponse.json(roundtable);
  } catch (error) {
    console.error("Error creating roundtable:", error);
    return NextResponse.json(
      { error: "Failed to create roundtable" },
      { status: 500 }
    );
  }
}
