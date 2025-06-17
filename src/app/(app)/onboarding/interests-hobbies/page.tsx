import { listUserAttributesAction } from "@/app/actions/users";
import InterestsHobbies from "./_components/InterestsHobbiesForm";
import { Attribute } from "@/payload-types";

export default async function AttributeListServer() {
  const res = await listUserAttributesAction();
  if ("error" in res) return <p className="text-red-500">{res.error}</p>;

  return (
    <InterestsHobbies attributes={(res.attributes as Attribute[]) || []} />
  );
}
