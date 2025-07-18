/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/events/[key]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export const dynamic = "force-dynamic";

/* which relationships you want populated */
const POPULATE = [
  { path: "organizer", select: "name about headerImage" },
  { path: "headerImage" },
];

export async function GET(_req: NextRequest, { params }: any) {
  try {
    const key = await params.slug; // id OR slug

    const payload = await getPayload({
      config: payloadConfig,
    });

    /* decide if key looks like a 24-char ObjectId */
    const isObjectId = /^[a-f\d]{24}$/i.test(key);

    const query = isObjectId ? { _id: key } : { slug: key };

    const event = await payload.db.collections.events
      .findOne(query)
      .populate(POPULATE)
      .lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (err) {
    console.error("[GET /api/events/:key]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
