"use client";
import CustomButton from "@/components/atoms/CustomButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";

const SplashContent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const router = useRouter();

  const backgroundPhotoSlides = useMemo(
    () => [
      {
        id: 1,
        photos: [
          {
            id: 1,
            image:
              "/images/mysterious-subject-in-neon-lit-futuristic-setting.jpg",
            position: "object-bottom object-none",
          },
          {
            id: 2,
            image:
              "/images/rise-humanoids-with-advanced-headgear-generative-ai.jpg",
            position: "object-cover",
          },
          {
            id: 3,
            image: "/images/futuristic-sci-fi-figure.jpg",
            position: "object-bottom-left object-none",
          },
          {
            id: 4,
            image: "/images/ethereal-marine-anemone.jpg",
            position: "object-right object-cover",
          },
          {
            id: 5,
            image: "/images/neon-lit-desert-night.jpg",
            position: "object-cover",
          },
          {
            id: 6,
            image:
              "/images/advanced-technological-robot-interacting-with-money-finance.jpg",
            position: "object-left object-cover",
          },
          {
            id: 7,
            image: "/images/futuristic-digital-portrait.jpg",
            position: "object-cover",
          },
          {
            id: 8,
            image:
              "/images/high-tech-portrait-young-girl-with-futuristic-style.jpg",
            position: "object-cover",
          },
          {
            id: 9,
            image: "/images/hip-hop-dancer-studio.jpg",
            position: "object-cover",
          },
          {
            id: 10,
            image: "/images/tech-workspace-focus.jpg",
            position: "object-cover",
          },
          {
            id: 11,
            image: "/images/illuminated-supertree-grove-at-twilight.jpg",
            position: "object-cover",
          },
        ],
      },
      {
        id: 2,
        photos: [
          {
            id: 1,
            image:
              "/images/advanced-technological-robot-interacting-with-money-finance.jpg",
            position: "object-left object-cover",
          },
          {
            id: 2,
            image: "/images/illuminated-supertree-grove-at-twilight.jpg",
            position: "object-cover",
          },
          {
            id: 3,
            image:
              "/images/rise-humanoids-with-advanced-headgear-generative-ai.jpg",
            position: "object-cover",
          },
          {
            id: 4,
            image: "/images/hip-hop-dancer-studio.jpg",
            position: "object-cover",
          },
          {
            id: 5,
            image: "/images/tech-workspace-focus.jpg",
            position: "object-cover",
          },
          {
            id: 6,
            image:
              "/images/high-tech-portrait-young-girl-with-futuristic-style.jpg",
            position: "object-cover",
          },
          {
            id: 7,
            image:
              "/images/mysterious-subject-in-neon-lit-futuristic-setting.jpg",
            position: "object-bottom object-none",
          },
          {
            id: 8,
            image: "/images/futuristic-digital-portrait.jpg",
            position: "object-cover",
          },
          {
            id: 9,
            image: "/images/neon-lit-desert-night.jpg",
            position: "object-cover",
          },
          {
            id: 10,
            image: "/images/ethereal-marine-anemone.jpg",
            position: "object-right object-cover",
          },
          {
            id: 11,
            image: "/images/futuristic-sci-fi-figure.jpg",
            position: "object-bottom-left object-none",
          },
        ],
      },
      {
        id: 3,
        photos: [
          {
            id: 1,
            image: "/images/hip-hop-dancer-studio.jpg",
            position: "object-cover",
          },
          {
            id: 2,
            image: "/images/ethereal-marine-anemone.jpg",
            position: "object-right object-cover",
          },
          {
            id: 3,
            image:
              "/images/mysterious-subject-in-neon-lit-futuristic-setting.jpg",
            position: "object-bottom object-none",
          },
          {
            id: 4,
            image: "/images/futuristic-digital-portrait.jpg",
            position: "object-cover",
          },
          {
            id: 5,
            image:
              "/images/advanced-technological-robot-interacting-with-money-finance.jpg",
            position: "object-left object-cover",
          },
          {
            id: 6,
            image: "/images/tech-workspace-focus.jpg",
            position: "object-cover",
          },
          {
            id: 7,
            image: "/images/neon-lit-desert-night.jpg",
            position: "object-cover",
          },
          {
            id: 8,
            image:
              "/images/high-tech-portrait-young-girl-with-futuristic-style.jpg",
            position: "object-cover",
          },
          {
            id: 9,
            image:
              "/images/rise-humanoids-with-advanced-headgear-generative-ai.jpg",
            position: "object-cover",
          },
          {
            id: 10,
            image: "/images/futuristic-sci-fi-figure.jpg",
            position: "object-bottom-left object-none",
          },
          {
            id: 11,
            image: "/images/illuminated-supertree-grove-at-twilight.jpg",
            position: "object-cover",
          },
        ],
      },
    ],
    []
  );

  const layouts = useMemo(
    () => [
      {
        span: "col-span-2 row-span-2",
        position: "col-start-1 row-start-1",
        radius: "rounded-br-3xl",
      }, // Top left
      {
        span: "col-span-5 row-span-4",
        position: "col-start-3 row-start-1",
        radius: "rounded-b-3xl",
      }, // Top middle
      {
        span: "col-span-2 row-span-2",
        position: "col-start-8 row-start-1",
        radius: "rounded-bl-3xl",
      }, // Top right

      {
        span: "col-span-2 row-span-4",
        position: "col-start-1 row-start-3",
        radius: "rounded-r-3xl",
      }, // Left side
      {
        span: "col-span-5 row-span-4",
        position: "col-start-3 row-start-5",
        radius: "rounded-3xl",
      }, // Center
      {
        span: "col-span-2 row-span-4",
        position: "col-start-8 row-start-3",
        radius: "rounded-l-3xl",
      }, // Right side

      {
        span: "col-span-2 row-span-4",
        position: "col-start-1 row-start-7",
        radius: "rounded-r-3xl",
      }, // Center Left Bottom
      {
        span: "col-span-5 row-span-4",
        position: "col-start-3 row-start-9",
        radius: "rounded-t-3xl",
      }, // Bottom Center Center
      {
        span: "col-span-2 row-span-4",
        position: "col-start-8 row-start-7",
        radius: "rounded-l-3xl",
      }, // Center Right Bottom

      {
        span: "col-span-2 row-span-2",
        position: "col-start-1 row-start-11",
        radius: "rounded-tr-3xl",
      }, // Bottom left
      {
        span: "col-span-2 row-span-2",
        position: "col-start-8 row-start-11",
        radius: "rounded-tl-3xl",
      }, // Bottom Right
    ],
    []
  );

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundPhotoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [backgroundPhotoSlides.length]);

  // Trigger animation reset when slide changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [currentSlide]);

  const currentSlidePhotos = useMemo(() => {
    return backgroundPhotoSlides[currentSlide] || backgroundPhotoSlides[0];
  }, [backgroundPhotoSlides, currentSlide]);

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const onGetStarted = () => {
    router.push("/onboarding/signin");
  };

  return (
    <div className="relative h-screen sm:h-[940px] bg-background overflow-hidden">
      {/* Animated Photo Collage Background */}
      <div
        key={animationKey}
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      >
        <div className="grid grid-cols-9 grid-rows-12 gap-4 h-full w-full">
          {currentSlidePhotos.photos.map((photo, index) => {
            const layout = layouts[index] || {
              span: "col-span-1 row-span-1",
              position: "",
              radius: "rounded-lg",
            };

            return (
              <div
                key={`${animationKey}-${photo.id}-${index}`}
                className={`${layout.span} ${layout.position} relative overflow-hidden ${layout.radius} animate-fade-in`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Image
                  src={photo.image}
                  alt={`Background ${photo.id}`}
                  className={`absolute inset-0 w-full h-full ${photo.position} transition-transform duration-700 hover:scale-105`}
                  width={400}
                  height={400}
                  priority={index < 5}
                  quality={85}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 left-4 top-1/2 bg-gradient-to-b from-black/0 via-transparent to-black/70" />

      {/* Content Card */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <div className="bg-main/20 backdrop-blur-sm rounded-3xl py-6 px-8 text-center text-main font-syne flex flex-col items-center">
          <div className="pb-4 tracking-wide uppercase font-semibold text-3xl leading-tight">
            A new space for global minds
          </div>
          <div className="pb-6 leading-relaxed font-normal text-sm text-main/80">
            Connect, discover, and tap into a global community — in person and
            across borders
          </div>
          <CustomButton
            variant="primary"
            onClick={onGetStarted}
            className="rounded-full hover:scale-105 transition-transform duration-200"
            textClassName="font-syne"
            size="lg"
          >
            Unlock & Elevate
          </CustomButton>
        </div>
      </div>

      {/* Enhanced Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
        {backgroundPhotoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
              index === currentSlide
                ? "bg-main w-3 h-3"
                : "bg-secondary-900 w-2 h-2 hover:bg-main/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashContent;
