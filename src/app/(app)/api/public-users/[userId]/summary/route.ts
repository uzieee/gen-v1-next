/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/users/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: any) {
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

  // Fetch user with depth=2 (populates attributes, profession → professionalField, startups → industries)
  const user = await payload.findByID({
    collection: "users",
    id: userId,
    depth: 2,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
