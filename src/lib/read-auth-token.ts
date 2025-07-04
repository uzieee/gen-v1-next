import { cookies } from "next/headers";

export async function readAuthToken(): Promise<string | null> {
  const raw = (await cookies()).get("payload-token")?.value;
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
