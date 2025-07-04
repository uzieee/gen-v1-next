import { listUserAttributesAction } from "@/app/actions/users";
import LanguagesCountries from "./_components/LanguagesCountries";
import { Attribute } from "@/payload-types";

export default async function AttributeListServer() {
  const res = await listUserAttributesAction();
  if ("error" in res) return <p className="text-red-500">{res.error}</p>;

  return (
    <LanguagesCountries attributes={(res.attributes as Attribute[]) || []} />
  );
}
