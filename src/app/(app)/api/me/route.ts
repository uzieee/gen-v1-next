import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getPayload } from "payload";
import payloadConfig from "@payload-config"; // adjust path

/******************************************************************
 * GET /api/me?depth=2
 *
 * • Reads the JWT from either:
 *      1.  Authorization:  JWT <token>
 *      2.  payload-token cookie
 * • Verifies signature with PAYLOAD_SECRET
 * • Fetches the user from Payload at requested depth
 * • Returns 200 { user }   or   401 { error: 'unauthenticated' }
 ******************************************************************/
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

  /* ── 3 · payload init ───────────────────────────────────────── */
  const payload = await getPayload({
    config: payloadConfig,
  });

  /* ── 4 · depth param (default 0) ────────────────────────────── */
  const depth = Number(req.nextUrl.searchParams.get("depth") ?? "0");

  /* ── 5 · fetch user ─────────────────────────────────────────── */
  const user = await payload.findByID({
    collection: "users",
    id: userId,
    depth: isNaN(depth) ? 0 : depth,
  });

  return NextResponse.json({ user }, { status: 200 });
}
