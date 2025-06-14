/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomButton from "@/components/atoms/CustomButton";
import HeaderWithSteps from "@/components/molecules/HeaderWithSteps";
import TagGroup from "@/components/molecules/TagGroup";
import { IInterestsHobbiesDetails, interestsHobbiesSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function InterestsHobbies() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showAllSports, setShowAllSports] = useState(false);
  const {
    formState: { isValid, errors },
    setValue,
    handleSubmit,
} = useForm<IInterestsHobbiesDetails>({
    resolver: zodResolver(interestsHobbiesSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all"
});

  const interestTags = [
    { id: 'animals', icon: '🐼', label: 'Animals' },
    { id: 'cooking', icon: '🍽️', label: 'Cooking' },
    { id: 'foodies', icon: '🍔', label: 'Foodies' },
    { id: 'movies', icon: '🎬', label: 'Movies' },
    { id: 'travel', icon: '✈️', label: 'Travel' },
    { id: 'outdoors', icon: '🏕️', label: 'Outdoors' },
    { id: 'video-games', icon: '🎮', label: 'Video Games' },
    { id: 'board-games', icon: '🎲', label: 'Board Games' },
    { id: 'reading', icon: '📖', label: 'Reading Book' },
    { id: 'museum', icon: '🏛️', label: 'Museum' },
    { id: 'music', icon: '🎵', label: 'Music' },
    { id: 'art', icon: '🎨', label: 'Art' },
    { id: 'photography', icon: '📸', label: 'Photography' },
    { id: 'dancing', icon: '💃', label: 'Dancing' },
  ];

  const sportTags = [
    { id: 'football', icon: '⚽', label: 'Football' },
    { id: 'baseball', icon: '⚾', label: 'Baseball' },
    { id: 'cycling', icon: '🚴', label: 'Cycling' },
    { id: 'swimming', icon: '🏊', label: 'Swimming' },
    { id: 'rafting', icon: '🛶', label: 'Rafting' },
    { id: 'ski', icon: '⛷️', label: 'Ski' },
    { id: 'tennis', icon: '🎾', label: 'Tennis' },
    { id: 'badminton', icon: '🏸', label: 'Badminton' },
  ];

  const handleInterestToggle = (tagId: string) => {
    setSelectedInterests(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSportToggle = (tagId: string) => {
    setSelectedSports(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const onSubmit: SubmitHandler<IInterestsHobbiesDetails> = (data) => {
    console.log('Selected interests:', data);
    router.push("/onboarding/conversation-vibe");
  };

  const onSkip = () => {
    router.push("/onboarding/conversation-vibe");
  };

  useEffect(() => {
    setValue('interests', selectedInterests, { shouldValidate: true });
  }, [selectedInterests])

  useEffect(() => {
    setValue('sports', selectedSports, { shouldValidate: true });
  }, [selectedSports])

  return (
    <>
      <HeaderWithSteps 
        onSkip={onSkip}
        action="Save & Skip"
        activeIndicator={1}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-14 p-8"
      >
        <div className="flex flex-col gap-7">
            <div className="text-2xl font-bold text-main-600 font-ariom">Interests & Hobbies</div>
            <div className="flex flex-col gap-5">
                {/* Interests Section */}
                <TagGroup
                title="Interests"
                tags={interestTags}
                selectedTags={selectedInterests}
                onTagToggle={handleInterestToggle}
                showAll={showAllInterests}
                onShowAll={() => setShowAllInterests(true)}
                />
                {errors.interests && (
                <div className="text-sm my-2 transition-colors text-error">
                    {errors.interests.message}
                </div>
                )}
                <hr className="text-main/15"/>
                {/* Sports Section */}
                <TagGroup
                title="Sports"
                tags={sportTags}
                selectedTags={selectedSports}
                onTagToggle={handleSportToggle}
                showAll={showAllSports}
                onShowAll={() => setShowAllSports(true)}
                />
                {errors.sports && (
                <div className="text-sm my-2 transition-colors text-error">
                    {errors.sports.message}
                </div>
                )}
            </div>
        </div>
        <CustomButton
          type="submit"
          className="w-full rounded-2xl"
          state={isValid ? "default" : "disabled"}
        >
          Continue
        </CustomButton>
      </form>
    </>
  );
}
