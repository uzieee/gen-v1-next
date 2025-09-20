import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    
    const { docs: events } = await payload.find({
      collection: "events",
      depth: 1,
      sort: "-date",
    });

    return NextResponse.json({ docs: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
