import { User } from "payload";

export async function fetchUser({ userId }: { userId: string }): Promise<User> {
  const res = await fetch(`/api/public-users/${userId}/summary`, {
    // revalidate cache every 60 seconds (optional)
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    throw new Error(`User ${userId} not found`);
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch user ${userId}: ${res.statusText}`);
  }

  return res.json() as Promise<User>;
}
