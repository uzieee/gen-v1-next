/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { saveUserAttributesAction } from "@/app/actions/users";
import useApiQuery from "@/app/hooks/useApiQuery";
import { fetchAttributes } from "@/app/services/http/attributes";
import VibeCard from "@/components/atoms/VibeCard";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import { Attribute, AttributeCategory } from "@/payload-types";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  attributes: Attribute[];
}

export default function ConversationVibeForm({ attributes }: Props) {
  const router = useRouter();
  const [selectedVibe, setSelectedVibe] = useState<string>();

  const { data: attributesByCategory } = useApiQuery({
    payload: { categories: ["conversation-vibe"] },
    apiHandler: fetchAttributes,
    queryKey: ["attributes", "conversation-vibe"],
  });

  const { conversationTags = [] } = useMemo(() => {
    type ElementOf<T extends readonly unknown[]> = T[number];
    const categories = (attributesByCategory || []).reduce(
      (acc, curr) => {
        return {
          [curr.slug]: curr,
          ...acc,
        };
      },
      {} as {
        [s: string]: ElementOf<NonNullable<typeof attributesByCategory>>;
      }
    );

    const conversationTags = categories["conversation-vibe"]?.attributes?.map(
      (attr) => ({
        id: attr.id,
        emoji: (
          <CldImage
            width="20"
            height="20"
            src={attr.image}
            sizes="100vw"
            alt={attr.label}
          />
        ),
        label: attr.label,
      })
    );

    return {
      conversationTags,
    };
  }, [attributesByCategory]);

  useEffect(() => {
    const selectedAttributeId = attributes.find(
      (attr) =>
        (attr.category as AttributeCategory)?.slug === "conversation-vibe"
    )?.id;
    if (selectedAttributeId) setSelectedVibe(selectedAttributeId);
  }, [attributes]);

  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibe(vibeId);
  };

  async function onSubmit() {
    if (!selectedVibe) {
      router.push("/onboarding/language");
      return;
    }
    const fd = new FormData();
    fd.append("attributeIds", selectedVibe as string);
    fd.append("mode", "append");
    const res = await saveUserAttributesAction(fd);
    if (res?.error) alert(JSON.stringify(res.error));
    router.push("/onboarding/language");
  }

  const onSkip = () => {
    router.push("/onboarding/language");
  };

  return (
    <>
      <HeaderWithSteps onSkip={onSkip} action="Skip" activeIndicator={2} />
      <form action={onSubmit} className="flex flex-col gap-14 p-8">
        <div className="flex flex-col gap-7">
          <div className="text-2xl font-bold text-main-600 font-ariom">
            Conversation Vibe
          </div>
          <div className="grid grid-cols-2 gap-4">
            {conversationTags.map((vibe) => (
              <VibeCard
                key={vibe.id}
                emoji={vibe.emoji}
                label={vibe.label}
                selected={selectedVibe === vibe.id}
                onSelect={() => handleVibeSelect(vibe.id)}
              />
            ))}
          </div>
        </div>
        <FormSubmitButton loadingText="Saving..." state={"default"} />
      </form>
    </>
  );
}
