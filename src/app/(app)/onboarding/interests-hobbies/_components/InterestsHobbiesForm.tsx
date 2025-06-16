/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useApiQuery from "@/app/hooks/useApiQuery";
import { fetchAttributes } from "@/app/services/http/attributes";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import TagGroup from "@/components/molecules/TagGroup";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { CldImage } from "next-cloudinary";
import { saveUserAttributesAction } from "@/app/actions/users";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import { Attribute } from "@/payload-types";

interface Props {
  attributes: Attribute[];
}

export default function InterestsHobbies({ attributes }: Props) {
  const router = useRouter();
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showAllSports, setShowAllSports] = useState(false);

  useEffect(() => {
    setSelectedAttributes(attributes.map((attr) => attr.id));
  }, [attributes]);

  const { data: attributesByCategory } = useApiQuery({
    payload: { categories: ["interests", "sports"] },
    apiHandler: fetchAttributes,
    queryKey: ["attributes", "interests", "sports"],
  });

  const { interestTags = [], sportTags = [] } = useMemo(() => {
    type ElementOf<T extends readonly unknown[]> = T[number];
    const categories = (attributesByCategory || []).reduce(
      (acc, curr) => {
        return {
          [curr.slug]: curr,
          ...acc,
        };
      },
      {} as { [s: string]: ElementOf<NonNullable<typeof attributesByCategory>> }
    );

    const interestTags = categories["interests"]?.attributes?.map((attr) => ({
      id: attr.id,
      icon: (
        <CldImage
          width="20"
          height="20"
          src={attr.image}
          sizes="100vw"
          alt={attr.label}
        />
      ),
      label: attr.label,
    }));

    const sportTags = categories["sports"]?.attributes?.map((attr) => ({
      id: attr.id,
      icon: (
        <CldImage
          width="20"
          height="20"
          src={attr.image}
          sizes="100vw"
          alt={attr.label}
        />
      ),
      label: attr.label,
    }));

    return { interestTags, sportTags };
  }, [attributesByCategory]);

  const handleAttributeToggle = (tagId: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const onSkip = () => {
    router.push("/onboarding/conversation-vibe");
  };

  async function onSubmit() {
    const fd = new FormData();
    selectedAttributes.forEach((id) => fd.append("attributeIds", id));
    const res = await saveUserAttributesAction(fd);
    if (res?.error) alert(JSON.stringify(res.error));
    router.push("/onboarding/conversation-vibe");
  }

  return (
    <>
      <HeaderWithSteps
        onSkip={onSkip}
        action="Save & Skip"
        activeIndicator={1}
      />
      <form action={onSubmit} className="flex flex-col gap-14 p-8">
        <div className="flex flex-col gap-7">
          <div className="text-2xl font-bold text-main-600 font-ariom">
            Interests & Hobbies
          </div>
          <div className="flex flex-col gap-5">
            {/* Interests Section */}
            <TagGroup
              title="Interests"
              tags={interestTags || []}
              selectedTags={selectedAttributes}
              onTagToggle={handleAttributeToggle}
              showAll={showAllInterests}
              onShowAll={() => setShowAllInterests(true)}
            />
            <hr className="text-main/15" />
            {/* Sports Section */}
            <TagGroup
              title="Sports"
              tags={sportTags}
              selectedTags={selectedAttributes}
              onTagToggle={handleAttributeToggle}
              showAll={showAllSports}
              onShowAll={() => setShowAllSports(true)}
            />
          </div>
        </div>
        <FormSubmitButton
          className="absolute left-0 right-0 bottom-0 rounded-bl-[0px] rounded-br-[0px] rounded-t-[1rem] h-[4rem]"
          state={"default"}
        />
      </form>
    </>
  );
}
