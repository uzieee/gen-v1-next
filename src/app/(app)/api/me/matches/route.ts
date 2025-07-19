// app/api/matches/route.ts
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { topMatches } from "@/lib/affinity/nearest";
// import { JWT_SECRET } from "@/lib/jwt-secret";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  /* ── 1 · extract token ─────────────────────────────────────── */
  let token: string | undefined;

  const auth = req.headers.get("authorization") || "";
  const [, maybeToken] = auth.split(" ");
  if (auth.startsWith("JWT ") && maybeToken) token = maybeToken;
  if (!token) token = req.cookies.get("payload-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  /* ── 2 · verify ─────────────────────────────────────────────── */
  let userId: string;
  try {
    const decoded = jwt.verify(token, process.env.PAYLOAD_SECRET!) as {
      id: string;
      collection: string;
    };
    if (decoded.collection !== "users") throw new Error("not a user token");
    userId = decoded.id;
  } catch {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }

  // 2) init Payload
  const payload = await getPayload({
    config: payloadConfig,
  });

  // 3) load current user (depth=2 for full profile)
  const me = await payload.findByID({
    collection: "users",
    id: userId,
    depth: 2,
  });
  if (!me) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 4) compute top matches
  const top = await topMatches(me, payload, 10);
  if (!top.length) {
    return NextResponse.json({ matches: [] });
  }

  // 5) fetch user docs with depth=1
  const { docs: users } = await payload.find({
    collection: "users",
    where: { id: { in: top.map((t) => t.id) } },
    depth: 2,
  });

  // 6) attach scores and sort
  const matches = users
    .map((u) => {
      const score = top.find((t) => t.id === u.id)!.score;
      return { user: u, score };
    })
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ matches });
}
