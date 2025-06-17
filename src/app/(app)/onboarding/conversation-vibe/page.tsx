import { listUserAttributesAction } from "@/app/actions/users";
import ConversationVibeForm from "./_components/ConversationVibeForm";
import { Attribute } from "@/payload-types";

export default async function AttributeListServer() {
  const res = await listUserAttributesAction();
  if ("error" in res) return <p className="text-red-500">{res.error}</p>;

  return (
    <ConversationVibeForm attributes={(res.attributes as Attribute[]) || []} />
  );
}
