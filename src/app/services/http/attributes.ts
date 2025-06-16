export async function fetchAttributes({
  categories,
}: {
  categories: string[];
}) {
  const qs =
    categories?.map((c) => `category=${encodeURIComponent(c)}`).join("&") ?? "";
  const res = await fetch(`/api/category-attributes${qs ? "?" + qs : ""}`);
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json() as Promise<
    {
      id: string;
      slug: string;
      title: string;
      attributes: {
        createdAt: string;
        updatedAt: string;
        label: string;
        category: string;
        image: string;
        id: string;
      }[];
    }[]
  >;
}
