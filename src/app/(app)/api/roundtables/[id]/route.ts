import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayload({ config });
    
    const resolvedParams = await params;
    const roundtable = await payload.findByID({
      collection: "roundtables",
      id: resolvedParams.id,
      depth: 2,
    });

    return NextResponse.json(roundtable);
  } catch (error) {
    console.error("Error fetching roundtable:", error);
    return NextResponse.json(
      { error: "Roundtable not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayload({ config });
    const data = await request.json();

    // Validate dates if provided
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

    const resolvedParams = await params;
    const roundtable = await payload.update({
      collection: "roundtables",
      id: resolvedParams.id,
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
    console.error("Error updating roundtable:", error);
    return NextResponse.json(
      { error: "Failed to update roundtable" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayload({ config });
    
    const resolvedParams = await params;
    await payload.delete({
      collection: "roundtables",
      id: resolvedParams.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting roundtable:", error);
    return NextResponse.json(
      { error: "Failed to delete roundtable" },
      { status: 500 }
    );
  }
}
