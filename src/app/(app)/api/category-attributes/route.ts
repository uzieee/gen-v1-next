import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import "dotenv/config"; // loads PAYLOAD_SECRET, DATABASE_URI

/* -------------------------------------------------------------- *
 * GET /api/attributes               → all categories + attributes *
 * GET /api/attributes?category=dogs → only that category          *
 * Multiple ?category= allowed.                                    *
 * -------------------------------------------------------------- */
export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });

  /* 2 · read query params */
  const params = req.nextUrl.searchParams;
  const slugs = params.getAll("category"); // can be []
  const categoryFilter = slugs.length > 0 ? { slug: { in: slugs } } : undefined; // no filter = all

  /* 3 · fetch categories first (depth 0 → only IDs + basic fields) */
  const cats = await payload.find({
    collection: "attribute-categories",
    where: categoryFilter,
    depth: 0,
    limit: 100,
  });

  /* 4 · fetch attributes that belong to those categories */
  const catIds = cats.docs.map((c) => c.id);
  const attrs = await payload.find({
    collection: "attributes",
    where: { category: { in: catIds } },
    depth: 0,
    limit: 1000,
    sort: "label", // Sort alphabetically by label field
  });

  /* 5 · group attributes by category id */
  const grouped: Record<string, unknown[]> = {};
  attrs.docs.forEach((attr) => {
    const id = attr.category as string;
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(attr);
  });

  /* 6 · shape the response */
  const result = cats.docs.map((cat) => ({
    id: cat.id,
    slug: cat.slug,
    title: cat.title,
    attributes: grouped[cat.id] ?? [],
  }));

  return NextResponse.json(result, { status: 200 });
}

// /* Optionally block other HTTP verbs */
// export function POST() {
//   return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
// }
