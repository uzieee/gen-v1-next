'use client';
import CustomButton from '@/components/atoms/CustomButton';
import IconButton from '@/components/atoms/IconButton';
import InfoCard from '@/components/atoms/InfoCard';
import ProgressIndicator from '@/components/atoms/ProgressIndicator';
import Tag from '@/components/atoms/Tag';
import Header from '@/components/molecules/Header';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Profile() {
    const router = useRouter();
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    const userProfile = {
        id: 1,
        name: "Alexis Stackhouse",
        flag: "🇩🇴",
        images: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
        ],
        bio: "Riya gadhvi as a choreographer, as a singer, as a computer engineer!",
        topics: ["Music", "Travel", "Tea", "Photography", "Fashion", "House Parties"],
    };

    const handleBack = () => {
        router.back();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const goToNextProfile = () => {
        if (currentProfileIndex < userProfile.images.length - 1) {
        setCurrentProfileIndex(prev => prev + 1);
        setIsLiked(false);
        }
    };

    const goToPreviousProfile = () => {
        if (currentProfileIndex > 0) {
        setCurrentProfileIndex(prev => prev - 1);
        setIsLiked(false);
        }
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const imageWidth = rect.width;
        
        // If clicked on left third, go to previous image
        if (clickX < imageWidth / 3) {
        goToPreviousProfile();
        }
        // If clicked on right third, go to next image
        else if (clickX > (imageWidth * 2) / 3) {
        goToNextProfile();
        }
    };

    return (
        <>
            <div className='overflow-auto h-[90%]'>
                <div 
                    className='relative cursor-pointer inset-0 bg-cover bg-top overflow-hidden transition-all duration-300 rounded-b-4xl h-[50vh] min-h-[50vh] max-h-[50vh]'
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${userProfile.images[currentProfileIndex]})`
                    }}
                    onClick={handleImageClick}
                >
                    <ProgressIndicator currentIndex={currentProfileIndex} total={userProfile.images.length} />
                    <Header onBack={handleBack} rightIcon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" fill="currentColor"/>
                            <path d="M15.21 22.19C15 22.19 14.79 22.16 14.58 22.11C13.96 21.94 13.44 21.55 13.11 21L12.99 20.8C12.4 19.78 11.59 19.78 11 20.8L10.89 20.99C10.56 21.55 10.04 21.95 9.42 22.11C8.79 22.28 8.14 22.19 7.59 21.86L5.87 20.87C5.26 20.52 4.82 19.95 4.63 19.26C4.45 18.57 4.54 17.86 4.89 17.25C5.18 16.74 5.26 16.28 5.09 15.99C4.92 15.7 4.49 15.53 3.9 15.53C2.44 15.53 1.25 14.34 1.25 12.88V11.12C1.25 9.66004 2.44 8.47004 3.9 8.47004C4.49 8.47004 4.92 8.30004 5.09 8.01004C5.26 7.72004 5.19 7.26004 4.89 6.75004C4.54 6.14004 4.45 5.42004 4.63 4.74004C4.81 4.05004 5.25 3.48004 5.87 3.13004L7.6 2.14004C8.73 1.47004 10.22 1.86004 10.9 3.01004L11.02 3.21004C11.61 4.23004 12.42 4.23004 13.01 3.21004L13.12 3.02004C13.8 1.86004 15.29 1.47004 16.43 2.15004L18.15 3.14004C18.76 3.49004 19.2 4.06004 19.39 4.75004C19.57 5.44004 19.48 6.15004 19.13 6.76004C18.84 7.27004 18.76 7.73004 18.93 8.02004C19.1 8.31004 19.53 8.48004 20.12 8.48004C21.58 8.48004 22.77 9.67004 22.77 11.13V12.89C22.77 14.35 21.58 15.54 20.12 15.54C19.53 15.54 19.1 15.71 18.93 16C18.76 16.29 18.83 16.75 19.13 17.26C19.48 17.87 19.58 18.59 19.39 19.27C19.21 19.96 18.77 20.53 18.15 20.88L16.42 21.87C16.04 22.08 15.63 22.19 15.21 22.19ZM12 18.49C12.89 18.49 13.72 19.05 14.29 20.04L14.4 20.23C14.52 20.44 14.72 20.59 14.96 20.65C15.2 20.71 15.44 20.68 15.64 20.56L17.37 19.56C17.63 19.41 17.83 19.16 17.91 18.86C17.99 18.56 17.95 18.25 17.8 17.99C17.23 17.01 17.16 16 17.6 15.23C18.04 14.46 18.95 14.02 20.09 14.02C20.73 14.02 21.24 13.51 21.24 12.87V11.11C21.24 10.48 20.73 9.96004 20.09 9.96004C18.95 9.96004 18.04 9.52004 17.6 8.75004C17.16 7.98004 17.23 6.97004 17.8 5.99004C17.95 5.73004 17.99 5.42004 17.91 5.12004C17.83 4.82004 17.64 4.58004 17.38 4.42004L15.65 3.43004C15.22 3.17004 14.65 3.32004 14.39 3.76004L14.28 3.95004C13.71 4.94004 12.88 5.50004 11.99 5.50004C11.1 5.50004 10.27 4.94004 9.7 3.95004L9.59 3.75004C9.34 3.33004 8.78 3.18004 8.35 3.43004L6.62 4.43004C6.36 4.58004 6.16 4.83004 6.08 5.13004C6 5.43004 6.04 5.74004 6.19 6.00004C6.76 6.98004 6.83 7.99004 6.39 8.76004C5.95 9.53004 5.04 9.97004 3.9 9.97004C3.26 9.97004 2.75 10.48 2.75 11.12V12.88C2.75 13.51 3.26 14.03 3.9 14.03C5.04 14.03 5.95 14.47 6.39 15.24C6.83 16.01 6.76 17.02 6.19 18C6.04 18.26 6 18.57 6.08 18.87C6.16 19.17 6.35 19.41 6.61 19.57L8.34 20.56C8.55 20.69 8.8 20.72 9.03 20.66C9.27 20.6 9.47 20.44 9.6 20.23L9.71 20.04C10.28 19.06 11.11 18.49 12 18.49Z" fill="currentColor"/>
                        </svg>
                    } />
                    <div className="absolute bottom-0 flex items-end justify-between px-4 pb-3.5 w-full">
                        <div className='flex flex-col gap-2.5'>
                            <div className="text-2xl font-medium text-main font-hellix">
                                {userProfile.name} {userProfile.flag}
                            </div>
                            <div className="flex gap-1">
                                <IconButton 
                                size='sm'
                                variant='ghost'
                                className='bg-main/10 w-8 h-8 rounded-full hover:bg-main/10'
                                icon={
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.5 10.525C20.5 5.00502 16.02 0.525024 10.5 0.525024C4.98 0.525024 0.5 5.00502 0.5 10.525C0.5 15.365 3.94 19.395 8.5 20.325V13.525H6.5V10.525H8.5V8.02502C8.5 6.09502 10.07 4.52502 12 4.52502H14.5V7.52502H12.5C11.95 7.52502 11.5 7.97502 11.5 8.52502V10.525H14.5V13.525H11.5V20.475C16.55 19.975 20.5 15.715 20.5 10.525Z" fill="#F4F4F6"/>
                                    </svg>
                                }
                                />
                                <IconButton 
                                size='sm'
                                variant='ghost'
                                className='bg-main/10 w-8 h-8 rounded-full hover:bg-main/10'
                                icon={
                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.92268 4.36847C9.52405 4.36847 9.14948 4.43037 8.79897 4.55416C8.44845 4.67107 8.1323 4.79142 7.85052 4.91522C7.56873 5.03901 7.32131 5.1009 7.10825 5.1009C6.88832 5.1009 6.64089 5.04245 6.36598 4.92553C6.09794 4.80862 5.80928 4.69514 5.5 4.58511C5.19072 4.46819 4.86082 4.40974 4.51031 4.40974C3.85052 4.40974 3.21134 4.59198 2.59278 4.95648C1.9811 5.3141 1.47938 5.84709 1.08763 6.55545C0.695876 7.25693 0.5 8.12691 0.5 9.16538C0.5 10.1351 0.661512 11.0979 0.984536 12.0538C1.31443 13.0029 1.70962 13.8075 2.1701 14.4678C2.56873 15.0248 2.95704 15.5028 3.33505 15.9017C3.71306 16.3006 4.15292 16.5 4.65464 16.5C4.98454 16.5 5.26976 16.445 5.51031 16.3349C5.75773 16.2249 6.01546 16.1149 6.2835 16.0048C6.55842 15.8948 6.89863 15.8398 7.30412 15.8398C7.72337 15.8398 8.0567 15.8948 8.30412 16.0048C8.55155 16.108 8.7921 16.2146 9.02577 16.3246C9.25945 16.4278 9.55842 16.4794 9.92268 16.4794C10.4656 16.4794 10.9296 16.273 11.3144 15.8604C11.7062 15.4478 12.0704 14.9973 12.4072 14.509C12.7921 13.9451 13.067 13.4327 13.232 12.972C13.4038 12.5112 13.4931 12.267 13.5 12.2395C13.4863 12.2326 13.3694 12.1707 13.1495 12.0538C12.9364 11.9369 12.689 11.7547 12.4072 11.5071C12.1323 11.2526 11.8883 10.9191 11.6753 10.5064C11.4691 10.0938 11.366 9.59177 11.366 9.00032C11.366 8.48453 11.4485 8.04094 11.6134 7.66957C11.7783 7.29132 11.9708 6.98184 12.1907 6.74113C12.4107 6.49355 12.61 6.30787 12.7887 6.18407C12.9674 6.05341 13.067 5.97776 13.0876 5.95712C12.7302 5.44133 12.3316 5.07339 11.8918 4.85332C11.4588 4.62637 11.0601 4.48882 10.6959 4.44068C10.3316 4.39254 10.0739 4.36847 9.92268 4.36847ZM9.35567 3.05835C9.60309 2.75575 9.80584 2.41188 9.96392 2.02676C10.122 1.63475 10.201 1.23243 10.201 0.819794C10.201 0.696003 10.1907 0.589405 10.1701 0.5C9.77148 0.513755 9.35223 0.634107 8.91237 0.861057C8.47251 1.08801 8.10825 1.37341 7.81959 1.71728C7.59278 1.97174 7.39003 2.29497 7.21134 2.68698C7.03265 3.0721 6.9433 3.47099 6.9433 3.88362C6.9433 3.94552 6.94674 4.00398 6.95361 4.05899C6.96048 4.11401 6.96735 4.15184 6.97423 4.17247C7.04295 4.18622 7.11512 4.1931 7.19072 4.1931C7.55498 4.1931 7.93986 4.0865 8.34536 3.87331C8.75086 3.65323 9.08763 3.38158 9.35567 3.05835Z" fill="#F4F4F6"/>
                                    </svg>
                                }
                                />
                                <IconButton 
                                size='sm'
                                variant='ghost'
                                className='bg-main/10 w-8 h-8 rounded-full hover:bg-main/10'
                                icon={
                                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.04013 12.0283C0.184296 9.47739 1.89596 3.52417 7.88846 3.52417V1.82382C7.88121 1.67014 7.92031 1.51769 8.00119 1.38431C8.08207 1.25093 8.20137 1.14216 8.34513 1.07072C8.48888 0.999289 8.65114 0.968152 8.8129 0.980961C8.97465 0.993769 9.12921 1.04999 9.25846 1.14305L13.8243 4.54454C13.9313 4.62657 14.0176 4.73024 14.0769 4.84796C14.1362 4.96568 14.167 5.09448 14.167 5.22492C14.167 5.35537 14.1362 5.48416 14.0769 5.60188C14.0176 5.7196 13.9313 5.82327 13.8243 5.9053L9.25846 9.3068C9.12926 9.3998 8.97479 9.45601 8.81312 9.46884C8.65144 9.48168 8.48925 9.45061 8.34553 9.37927C8.2018 9.30794 8.08249 9.19928 8.00155 9.06603C7.9206 8.93277 7.88138 8.78043 7.88846 8.62681V6.92567C1.89596 7.77624 1.04013 12.0283 1.04013 12.0283Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                }
                                />
                            </div>
                        </div>
                        <div
                        onClick={handleLike}
                        className={
                            cn(
                                'cursor-pointer w-14 h-14 rounded-full border',
                                'flex items-center justify-center', 
                                'transition-colors duration-200',
                                isLiked ? 'text-badge-red border-badge-red bg-main-400 hover:bg-main-400/90' : 'text-main border-main bg-main-400/60 hover:bg-main-400/70'
                            )}
                        >
                            {isLiked ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.56 3.84998C4.90771 3.84998 2.75 6.01068 2.75 8.68998C2.75 11.9405 4.25068 14.5449 6.13923 16.4799C8.03683 18.4241 10.2799 19.6419 11.6223 20.1002L11.6296 20.1027C11.6944 20.1256 11.8286 20.15 12 20.15C12.1714 20.15 12.3056 20.1256 12.3704 20.1027L12.3777 20.1002C13.7201 19.6419 15.9632 18.4241 17.8608 16.4799C19.7493 14.5449 21.25 11.9405 21.25 8.68998C21.25 6.01068 19.0923 3.84998 16.44 3.84998C14.8778 3.84998 13.477 4.60909 12.6021 5.78714C12.4606 5.97766 12.2373 6.08998 12 6.08998C11.7627 6.08998 11.5394 5.97766 11.3979 5.78714C10.5225 4.60847 9.13147 3.84998 7.56 3.84998Z" fill="currentColor"/>
                                </svg>
                            )  : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.56 3.84998C4.90771 3.84998 2.75 6.01068 2.75 8.68998C2.75 11.9405 4.25068 14.5449 6.13923 16.4799C8.03683 18.4241 10.2799 19.6419 11.6223 20.1002L11.6296 20.1027L11.6296 20.1027C11.6944 20.1256 11.8286 20.15 12 20.15C12.1714 20.15 12.3056 20.1256 12.3704 20.1027L12.3777 20.1002L12.3777 20.1002C13.7201 19.6419 15.9632 18.4241 17.8608 16.4799C19.7493 14.5449 21.25 11.9405 21.25 8.68998C21.25 6.01068 19.0923 3.84998 16.44 3.84998C14.8778 3.84998 13.477 4.60909 12.6021 5.78714C12.4606 5.97766 12.2373 6.08998 12 6.08998C11.7627 6.08998 11.5394 5.97766 11.3979 5.78714C10.5225 4.60847 9.13147 3.84998 7.56 3.84998ZM1.25 8.68998C1.25 5.18927 4.07229 2.34998 7.56 2.34998C9.29674 2.34998 10.8646 3.05596 12.0003 4.19469C13.1385 3.05561 14.7122 2.34998 16.44 2.34998C19.9277 2.34998 22.75 5.18927 22.75 8.68998C22.75 12.4395 21.0107 15.4001 18.9342 17.5276C16.8683 19.6443 14.4235 20.9861 12.8657 21.5186C12.5914 21.6147 12.2773 21.65 12 21.65C11.7227 21.65 11.4086 21.6147 11.1343 21.5186C9.57655 20.9861 7.13169 19.6443 5.06577 17.5276C2.98932 15.4001 1.25 12.4395 1.25 8.68998Z" fill="currentColor"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
                <div className='pt-6 px-5 flex flex-col gap-3'>
                    <InfoCard title="About me ai Gen" className='flex flex-col gap-3'>
                        <div className="text-main/50 font-chivo text-sm font-light">{userProfile.bio}</div>
                    </InfoCard>
                    <InfoCard title="Lets talk about" className='flex flex-col gap-3'>
                        <div className="flex flex-wrap gap-2">
                            {userProfile.topics.map((topic) => (
                                <Tag
                                    key={topic}
                                    label={topic}
                                    className='border-none bg-main/30 shadow-md font-hellix hover:bg-main/30'
                                />
                            ))}
                        </div>
                    </InfoCard>
                    <InfoCard title="Work">
                    </InfoCard>
                </div>
            </div>
            <CustomButton
                onClick={() => {}}
                className='w-full rounded-b-none rounded-2xl bottom-0 fixed'
            >
            Conversation starter
            </CustomButton>
        </>
    );
}
