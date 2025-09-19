import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { readAuthToken } from "@/lib/read-auth-token";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/jwt-secret";

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Get user from token
    const token = await readAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      userId = decoded.id;
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const unreadOnly = searchParams.get("unreadOnly") === "true";

    // Build where clause
    const where: any = {
      user: { equals: userId },
    };

    if (unreadOnly) {
      where.isRead = { equals: false };
    }

    // Fetch notifications
    const result = await payload.find({
      collection: "notifications",
      where,
      sort: "-createdAt", // Most recent first
      page,
      limit,
      depth: 2, // Include related user data
    });

    return NextResponse.json({
      notifications: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Get user from token
    const token = await readAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      userId = decoded.id;
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { notificationId, isRead } = body;

    if (!notificationId || typeof isRead !== "boolean") {
      return NextResponse.json(
        { error: "Missing notificationId or isRead" },
        { status: 400 }
      );
    }

    // Update notification
    const updated = await payload.update({
      collection: "notifications",
      id: notificationId,
      data: { isRead },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}
