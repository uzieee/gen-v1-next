import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/jwt-secret";
import { cookies } from "next/headers";

export async function setAuthCookie(userId: string) {
  const token = jwt.sign({ id: userId, collection: "users" }, JWT_SECRET, {
    expiresIn: "30d",
  });

  (await cookies()).set("payload-token", encodeURIComponent(token), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return token;
}
