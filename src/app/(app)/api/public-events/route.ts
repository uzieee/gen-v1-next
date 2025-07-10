/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config"; // adjust path if different

export const dynamic = "force-dynamic"; // required for parameterised GET

export async function GET(req: NextRequest) {
  try {
    /* ------------------------------------------------------------------ */
    /* 1 ─ parse query params                                             */
    /* ------------------------------------------------------------------ */
    const url = new URL(req.url);
    const qp = url.searchParams;

    const page = Math.max(Number(qp.get("page") ?? 1), 1);
    const limit = Math.min(Number(qp.get("limit") ?? 12), 100);
    const skip = (page - 1) * limit;

    // const lat = Number(qp.get("lat"));
    // const lng = Number(qp.get("lng"));
    // const distanceKm = Number(qp.get("distanceKm"));
    const dateStr = qp.get("date"); // YYYY-MM-DD
    const hourStr = qp.get("hour"); // HH:mm
    const category = qp.get("category"); // category id

    /* ------------------------------------------------------------------ */
    /* 2 ─ build Mongo query                                              */
    /* ------------------------------------------------------------------ */
    const query: Record<string, any> = {};

    if (category) query.category = category;

    if (dateStr) {
      const start = new Date(`${dateStr}T00:00:00Z`);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      query.date = { $gte: start, $lt: end };
    }

    if (hourStr) {
      const [h, m] = hourStr.split(":").map(Number);
      query.$expr = {
        $and: [
          { $eq: [{ $hour: "$date" }, h] },
          { $eq: [{ $minute: "$date" }, m ?? 0] },
        ],
      };
    }

    // if (!Number.isNaN(lat) && !Number.isNaN(lng) && !Number.isNaN(distanceKm)) {
    //   query.location = {
    //     $nearSphere: {
    //       $geometry: { type: "Point", coordinates: [lng, lat] },
    //       $maxDistance: distanceKm * 1000,
    //     },
    //   };
    // }

    /* ------------------------------------------------------------------ */
    /* 3 ─ run query via Payload (local)                                  */
    /* ------------------------------------------------------------------ */
    const payload = await getPayload({
      config: payloadConfig,
    });

    const POPULATE = [
      { path: "organizer", select: "name about headerImage" },
      { path: "headerImage" }, // media upload
      // { path: 'tickets' },           // example if you later embed refs
    ];

    const [events, total] = await Promise.all([
      payload.db.collections.events
        .find(query)
        .sort({ date: 1 }) // soonest first
        .skip(skip)
        .limit(limit)
        .populate(POPULATE) // ← pulls the linked docs
        .lean(), // plain JS objects
      payload.db.collections.events.countDocuments(query),
    ]);

    return NextResponse.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      events,
    });
  } catch (err) {
    console.error("[GET /api/events]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
