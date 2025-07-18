/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { saveUserAttributesAction } from "@/app/actions/users";
import useApiQuery from "@/app/hooks/use-api-query";
import { fetchAttributes } from "@/app/services/http/attributes";
import Tag from "@/components/atoms/Tag";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import SelectableList from "@/components/molecules/SelectableList";
import TextField from "@/components/molecules/TextField";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Attribute } from "@/payload-types";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  attributes: Attribute[];
}

export default function LanguageCountries({ attributes = [] }: Props) {
  const router = useRouter();
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("language");

  const searchParams = useSearchParams();
  const isQuickEdit = searchParams.get("quick");

  useEffect(() => {
    if (attributes.length)
      setSelectedAttributes(attributes.map((attr) => attr.id));
  }, [attributes]);

  const { data: attributesByCategory } = useApiQuery({
    payload: { categories: ["countries", "languages"] },
    apiHandler: fetchAttributes,
    queryKey: ["attributes", "countries", "languages"],
  });

  const { allLanguages = [], allCountries = [] } = useMemo(() => {
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

    const allCountries = categories["countries"]?.attributes?.map((attr) => ({
      id: attr.id,
      icon: attr.image,
      label: attr.label,
    }));

    const allLanguages = categories["languages"]?.attributes?.map((attr) => ({
      id: attr.id,
      label: attr.label,
      icon: undefined,
    }));

    return { allCountries, allLanguages };
  }, [attributesByCategory]);

  const filteredLanguages = allLanguages.filter((language) =>
    language.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCountries = allCountries.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttributeToggle = (tagId: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const onSkip = () => {
    if (isQuickEdit) {
      router.replace("/profile");
    } else router.push("/onboarding/work-profession");
  };

  async function onSubmit() {
    const fd = new FormData();
    selectedAttributes.forEach((id) => fd.append("attributeIds", id));
    const res = await saveUserAttributesAction(fd);
    if (res?.error) alert(JSON.stringify(res.error));
    if (isQuickEdit) {
      router.replace("/profile");
    } else router.push("/onboarding/work-profession");
  }

  const { selectedLanguages, selectedCountries } = useMemo(() => {
    const selectedLanguages = allLanguages.filter(
      (lang) => selectedAttributes.indexOf(lang.id) > -1
    );
    const selectedCountries = allCountries.filter(
      (country) => selectedAttributes.indexOf(country.id) > -1
    );
    return { selectedLanguages, selectedCountries };
  }, [selectedAttributes, allLanguages, allCountries]);

  const isValid = useMemo(() => {
    return activeTab == "language"
      ? selectedLanguages.length > 0
      : selectedCountries.length > 0;
  }, [selectedLanguages, selectedCountries, activeTab]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      setSearchQuery("");
    }
  }, [activeTab]);

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col">
      <HeaderWithSteps onSkip={onSkip} action="Skip" activeIndicator={3} />
      <form
        action={onSubmit}
        className="flex flex-col flex-1 overflow-y-scroll gap-14 px-8"
      >
        <div className="flex flex-col flex-1 gap-7 mb-16">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold text-main-600 font-ariom">
              {activeTab == "language"
                ? "What languages do you speak or understand?"
                : "Where in the world do you feel connected?"}
            </div>
            <div className="text-sm text-secondary-800 font-ariom">
              {activeTab == "language"
                ? "Select all that apply — every language is part of your story."
                : "Select the places that have shaped your story — through heritage, lived experience, or meaningful travel (select all that apply)."}
            </div>
          </div>
          {/* Search Bar */}
          <TextField
            placeholder={
              activeTab == "language"
                ? "Search languages..."
                : "Search countries..."
            }
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-main-600 focus:border-primary focus:outline-none rounded-2xl px-4 h-14"
            icon={<Search className="!w-6 !h-6 text-main-600" />}
            suffix={searchQuery && <X className="!w-5 !h-5 text-main-600" />}
            handleClear={() => setSearchQuery("")}
          />
          <div className="flex gap-3 flex-wrap max-h-24 overflow-y-auto">
            {(activeTab == "language"
              ? selectedLanguages
              : selectedCountries
            ).map((item) => (
              <Tag
                key={item.id}
                label={item.label}
                icon={item.icon}
                className="border-2"
              />
            ))}
          </div>
          <Tabs
            className="flex overflow-y-scroll flex-col flex-1"
            defaultValue={activeTab}
            activationMode="manual"
          >
            <TabsList className="flex items-center gap-6 shadow-none">
              <TabsTrigger
                value="language"
                className={cn(
                  "w-fit text-sm font-bold font-ariom px-4 py-2.5 cursor-pointer flex-none rounded-2xl",
                  activeTab === "language"
                    ? "text-background !bg-primary"
                    : "text-secondary-500"
                )}
                onClick={() => setActiveTab("language")}
              >
                Language
              </TabsTrigger>
              <TabsTrigger
                value="countries"
                className={cn(
                  "w-fit text-sm font-bold font-ariom px-4 py-2.5 cursor-pointer flex-none rounded-2xl",
                  activeTab === "countries"
                    ? "text-background !bg-primary"
                    : "text-secondary-500"
                )}
                onClick={() => setActiveTab("countries")}
              >
                Countries
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="language"
              className="mt-10 flex-1 overflow-y-scroll"
            >
              <SelectableList
                item="language"
                items={filteredLanguages}
                selectedItems={selectedAttributes}
                handleToggle={handleAttributeToggle}
              />
            </TabsContent>
            <TabsContent
              value="countries"
              className="mt-10 flex-1 overflow-y-auto"
            >
              <SelectableList
                item="country"
                items={filteredCountries}
                selectedItems={selectedAttributes}
                handleToggle={handleAttributeToggle}
              />
            </TabsContent>
          </Tabs>
          <FormSubmitButton
            className="absolute left-0 right-0 bottom-0 rounded-bl-[0px] rounded-br-[0px] rounded-t-[1rem] h-[4rem]"
            state={isValid ? "default" : "disabled"}
          />
        </div>
      </form>
    </div>
  );
}
