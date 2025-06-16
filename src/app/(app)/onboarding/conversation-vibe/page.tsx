/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomButton from '@/components/atoms/CustomButton';
import VibeCard from '@/components/atoms/VibeCard';
import HeaderWithSteps from '@/components/molecules/HeaderWithSteps';
import { IVibeDetails, vibeSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export default function ConversationVibe() {
    const router = useRouter();
    const [selectedVibe, setSelectedVibe] = useState<string>();
    const {
        formState: { isValid, errors },
        setValue,
        handleSubmit,
    } = useForm<IVibeDetails>({
        resolver: zodResolver(vibeSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        criteriaMode: "all"
    });

    const vibeOptions = [
        { id: 'chill', emoji: '😄', label: 'Chill' },
        { id: 'introvert', emoji: '😭', label: 'Introvert' },
        { id: 'anxiety', emoji: '😰', label: 'Anxiety' },
        { id: 'extrovert', emoji: '😡', label: 'Extrovert' },
        { id: 'okay', emoji: '🙂', label: 'Okay' },
        { id: 'love', emoji: '😘', label: 'Love' },
    ];

    const handleVibeSelect = (vibeId: string) => {
        setSelectedVibe(vibeId);
    };

    const onSubmit: SubmitHandler<IVibeDetails> = (data) => {
        console.log('Selected vibe:', data);
        router.push("/onboarding/language-country");
    };

    const onSkip = () => {
        router.push("/onboarding/language-country");
    };

    useEffect(() => {
        if (selectedVibe){
            setValue('vibe', selectedVibe, { shouldValidate: true });
        }
    }, [selectedVibe])

    return (
        <>
        <HeaderWithSteps
            onSkip={onSkip}
            action="Skip"
            activeIndicator={2}
        />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-14 p-8"
        >
            <div className="flex flex-col gap-7">
                <div className="text-2xl font-bold text-main-600 font-ariom">Conversation Vibe</div>
                <div className="grid grid-cols-2 gap-4">
                    {vibeOptions.map((vibe) => (
                        <VibeCard
                        key={vibe.id}
                        emoji={vibe.emoji}
                        label={vibe.label}
                        selected={selectedVibe === vibe.id}
                        onSelect={() => handleVibeSelect(vibe.id)}
                        />
                    ))}
                </div>
                {errors.vibe && (
                    <div className="text-red-500 text-sm">
                        {errors.vibe.message}
                    </div>
                )}
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
