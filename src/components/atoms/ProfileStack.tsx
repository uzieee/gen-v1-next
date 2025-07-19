import { FormattedMatch } from "@/app/hooks/use-formated-matches";
import React, { useState } from "react";

const ProfileCardStack = ({ profiles }: { profiles: FormattedMatch[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative h-80">
      {profiles.map((profile, index) => {
        const isActive = index === currentIndex;
        const isNext = index === (currentIndex + 1) % profiles.length;
        const isPrev =
          index === (currentIndex - 1 + profiles.length) % profiles.length;

        let transform = "";
        let zIndex = 0;

        if (isActive) {
          transform = "translateY(0) scale(1)";
          zIndex = 30;
        } else if (isNext) {
          transform = "translateY(-20px) scale(0.95)";
          zIndex = 20;
        } else if (isPrev) {
          transform = "translateY(-40px) scale(0.95)";
          zIndex = 10;
        } else {
          transform = "translateY(-50px) scale(0.95)";
          zIndex = 0;
        }

        return (
          <div
            key={profile.id}
            className="absolute inset-0 transition-all duration-500 ease-out cursor-pointer"
            style={{
              transform,
              zIndex,
            }}
            onClick={
              isActive
                ? () => setCurrentIndex((prev) => (prev + 1) % profiles.length)
                : () => setCurrentIndex(index)
            }
          >
            <div className="w-full h-full rounded-3xl overflow-hidden relative group">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: !!profile.image
                    ? `url(${profile.image})`
                    : "url(/images/gen-placeholder-min.png)",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="text-main">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-4xl font-bold">{profile.name}</h2>
                    <span className="text-2xl">{profile.flag}</span>
                  </div>

                  {profile.status && (
                    <div className="flex items-center gap-2 bg-main/20 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                      <span>{profile.icon}</span>
                      <span className="text-main text-sm font-medium">
                        {profile.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCardStack;
