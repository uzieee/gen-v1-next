/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CustomButton from '@/components/atoms/CustomButton';
import PhotoSlot from '@/components/atoms/PhotoSlot';
import HeaderWithSteps from '@/components/molecules/HeaderWithSteps'
import { IPhotosDetails, photosSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

export default function TakeAPhoto() {
    const router = useRouter();
    const {
        formState: { isValid, errors },
        setValue,
        handleSubmit,
    } = useForm<IPhotosDetails>({
        resolver: zodResolver(photosSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        criteriaMode: "all"
    });
    const [photos, setPhotos] = useState({
        main: null,
        photo1: null,
        photo2: null,
        photo3: null,
    });

    const handlePhotoUpload = (photoKey: string) => {
        // Simulate photo upload
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                setPhotos(prev => ({
                    ...prev,
                    [photoKey]: (e.target as FileReader).result
                }));
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const onSubmit: SubmitHandler<IPhotosDetails> = (data) => {
        console.log('Selected photos:', data);
        router.push("/onboarding/signup");
    };

    const onSkip = () => {
        router.push("/onboarding/signup");
    };

    useEffect(() => {
        if (Object.values(photos).filter(photo => photo !== null).length !== 0) {
            setValue('photos', Object.values(photos).filter(photo => photo !== null));
        }
    }, [photos]);

    return (
        <>
            <HeaderWithSteps
                onSkip={onSkip}
                action="Skip"
                activeIndicator={5}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-14 p-8"
            >
                <div className="flex flex-col gap-7">
                    <div className="text-2xl font-bold text-main-600 font-ariom">We will take care</div>
                    <div className="flex flex-col gap-10 items-center my-14">
                        {/* Main Photo */}
                        <PhotoSlot
                            photo={photos.main}
                            onUpload={() => handlePhotoUpload('main')}
                            onEdit={() => handlePhotoUpload('main')}
                            size="large"
                        />
                        {/* Grid Layout for smaller photos */}
                        <div className="grid grid-cols-3 gap-4">
                            <PhotoSlot 
                                photo={photos.photo1}
                                onUpload={() => handlePhotoUpload('photo1')}
                                onEdit={() => handlePhotoUpload('photo1')}
                                size="normal"
                            />
                            <PhotoSlot 
                                photo={photos.photo2}
                                onUpload={() => handlePhotoUpload('photo2')}
                                onEdit={() => handlePhotoUpload('photo2')}
                                size="normal"
                            />
                            <PhotoSlot 
                                photo={photos.photo3}
                                onUpload={() => handlePhotoUpload('photo3')}
                                onEdit={() => handlePhotoUpload('photo3')}
                                size="normal"
                            />
                        </div>
                    </div>
                    {errors.photos && (
                        <div className="text-red-500 text-sm">
                            {errors.photos.message}
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
    )
}
