import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    
    const { docs: users } = await payload.find({
      collection: "users",
      depth: 0,
      sort: "fullName",
      limit: 100, // Limit to prevent large responses
    });

    return NextResponse.json({ docs: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
