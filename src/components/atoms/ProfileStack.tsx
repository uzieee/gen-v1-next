import { FormattedMatch } from "@/app/hooks/use-formated-matches";
import { toggleLikeProfileAction } from "@/app/actions/likes";
import { refreshIceBreakerAction, likeIceBreakerAction } from "@/app/actions/ice-breakers";
import React, { useState } from "react";

interface ProfileCardProps {
  profile: FormattedMatch;
  onLike: (profileId: string) => void;
  isLiked: boolean;
  isLoading: boolean;
  iceBreaker?: string;
  onRefreshIceBreaker?: (profileId: string) => void;
  onLikeIceBreaker?: (profileId: string, iceBreaker: string) => void;
  isRefreshingIceBreaker?: boolean;
}

const ProfileCard = ({ 
  profile, 
  onLike, 
  isLiked, 
  isLoading, 
  iceBreaker, 
  onRefreshIceBreaker, 
  onLikeIceBreaker, 
  isRefreshingIceBreaker 
}: ProfileCardProps) => {
  return (
    <div className="w-full max-w-sm h-80 rounded-3xl overflow-hidden relative group flex-shrink-0">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20" />

      {/* Heart Like Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike(profile.id);
        }}
        disabled={isLoading}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isLiked ? "#ef4444" : "none"}
            stroke={isLiked ? "#ef4444" : "#ffffff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="text-main">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <span className="text-lg">{profile.flag}</span>
          </div>

          {profile.status && (
            <div className="flex items-center gap-2 bg-main/20 backdrop-blur-sm rounded-full px-2 py-1 w-fit mb-3">
              <span className="text-sm">{profile.icon}</span>
              <span className="text-main text-xs font-medium">
                {profile.status}
              </span>
            </div>
          )}
        </div>

        {/* Ice Breaker Section */}
        {iceBreaker && (
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white text-sm font-semibold">💬 Ice Breaker</h3>
              <div className="flex gap-1">
                {/* Like Ice Breaker Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikeIceBreaker?.(profile.id, iceBreaker);
                  }}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  title="Like this ice breaker"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                
                {/* Refresh Ice Breaker Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRefreshIceBreaker?.(profile.id);
                  }}
                  disabled={isRefreshingIceBreaker}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Get a new ice breaker"
                >
                  {isRefreshingIceBreaker ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                      <path d="M3 21v-5h5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              {iceBreaker}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileCardStack = ({ profiles }: { profiles: FormattedMatch[] }) => {
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [iceBreakers, setIceBreakers] = useState<Record<string, string>>({});
  const [refreshingIceBreakers, setRefreshingIceBreakers] = useState<Set<string>>(new Set());

  const handleLike = async (profileId: string) => {
    if (loading.has(profileId)) return; // Prevent multiple clicks
    
    setLoading(prev => new Set(prev).add(profileId));
    
    try {
      const result = await toggleLikeProfileAction(profileId);
      
      if (result.success) {
        setLikedProfiles(prev => {
          const newSet = new Set(prev);
          if (result.isLiked) {
            newSet.add(profileId);
          } else {
            newSet.delete(profileId);
          }
          return newSet;
        });
      } else {
        console.error("Failed to toggle like:", result.error);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(profileId);
        return newSet;
      });
    }
  };

  const handleRefreshIceBreaker = async (profileId: string) => {
    if (refreshingIceBreakers.has(profileId)) return;
    
    setRefreshingIceBreakers(prev => new Set(prev).add(profileId));
    
    try {
      const result = await refreshIceBreakerAction(profileId);
      
      if (result.success && result.iceBreaker) {
        setIceBreakers(prev => ({
          ...prev,
          [profileId]: result.iceBreaker,
        }));
      } else {
        console.error("Failed to refresh ice breaker:", result.error);
      }
    } catch (error) {
      console.error("Error refreshing ice breaker:", error);
    } finally {
      setRefreshingIceBreakers(prev => {
        const newSet = new Set(prev);
        newSet.delete(profileId);
        return newSet;
      });
    }
  };

  const handleLikeIceBreaker = async (profileId: string, iceBreaker: string) => {
    try {
      const result = await likeIceBreakerAction(profileId, iceBreaker);
      
      if (!result.success) {
        console.error("Failed to like ice breaker:", result.error);
      }
    } catch (error) {
      console.error("Error liking ice breaker:", error);
    }
  };

  // Initialize ice breakers for profiles that don't have them
  React.useEffect(() => {
    profiles.forEach(profile => {
      if (!iceBreakers[profile.id]) {
        // Use the profile's current ice breaker or a default one
        const profileIceBreaker = profile.iceBreaker || 
                                 "What's the most exciting project you're working on right now?";
        setIceBreakers(prev => ({
          ...prev,
          [profile.id]: profileIceBreaker,
        }));
      }
    });
  }, [profiles, iceBreakers]);

  return (
    <div className="flex flex-col items-center space-y-6 max-h-96 overflow-y-auto scrollbar-hide">
      {profiles.map((profile, index) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onLike={handleLike}
          isLiked={likedProfiles.has(profile.id)}
          isLoading={loading.has(profile.id)}
          iceBreaker={iceBreakers[profile.id]}
          onRefreshIceBreaker={handleRefreshIceBreaker}
          onLikeIceBreaker={handleLikeIceBreaker}
          isRefreshingIceBreaker={refreshingIceBreakers.has(profile.id)}
        />
      ))}
    </div>
  );
};

export default ProfileCardStack;
