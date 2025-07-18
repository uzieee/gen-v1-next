/* very small job-title → bucket map. Expand as desired */
export function mapJobTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("engineer") || t.includes("developer")) return "engineering";
  if (t.includes("design")) return "design";
  if (t.includes("marketing")) return "marketing";
  if (t.includes("product")) return "product";
  if (t.includes("sales") || t.includes("biz dev")) return "sales";
  return "general";
}
