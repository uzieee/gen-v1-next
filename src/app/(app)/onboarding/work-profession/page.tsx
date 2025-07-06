import { listUserAttributesAction } from "@/app/actions/users";
import ProfessionForm from "./_components/ProfessionForm";
import { Attribute } from "@/payload-types";

export default async function WorkProfession() {
  const res = await listUserAttributesAction("professional-fields");
  if ("error" in res) return <p className="text-red-500">{res.error}</p>;

  return <ProfessionForm attributes={(res.attributes as Attribute[]) || []} />;
}
