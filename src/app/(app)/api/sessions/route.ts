import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    
    const { docs: sessions } = await payload.find({
      collection: "sessions",
      depth: 1,
      sort: "-createdAt",
    });

    return NextResponse.json({ docs: sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
