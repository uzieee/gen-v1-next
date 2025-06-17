import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config";

type Mode = "append" | "replace";

/**
 * Append attribute IDs to a user.
 * Prevents duplicates and touches no other fields.
 */
export async function addAttributesToUser(
  userId: string,
  attributeIds: string[],
  mode: Mode = "append"
) {
  if (attributeIds.length === 0) return;

  /* init Payload head-less once per runtime */
  const payload = await getPayload({ config });

  /* fetch current IDs (depth 0 = raw IDs only) */
  const user = await payload.findByID({
    collection: "users",
    id: userId,
    depth: 0,
  });
  const current = Array.isArray(user.attributes)
    ? user.attributes.map(String)
    : [];

  /* compute the new array based on mode */
  const next =
    mode === "replace"
      ? [...new Set(attributeIds.map(String))] // authoritative
      : [...new Set([...current, ...attributeIds.map(String)])]; // merge

  /* skip write if nothing changed */
  if (
    next.length === current.length &&
    next.every((id) => current.includes(id))
  )
    return;

  await payload.update({
    collection: "users",
    id: userId,
    data: { attributes: next },
  });
}
