import React from "react";
import { User } from "@/payload-types";

interface LikedProfilesCardProps {
  likedProfiles: User[];
  onProfileClick?: (profileId: string) => void;
}

const LikedProfilesCard = ({ likedProfiles, onProfileClick }: LikedProfilesCardProps) => {
  if (!likedProfiles || likedProfiles.length === 0) {
    return (
      <div className="bg-background border border-main-600 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-main-600 font-ariom mb-4">
          Liked Profiles
        </h3>
        <div className="text-main/50 font-chivo text-sm font-light text-center py-8">
          No liked profiles yet. Start exploring and like some profiles!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-main-600 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-main-600 font-ariom mb-4">
        Liked Profiles ({likedProfiles.length})
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {likedProfiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => onProfileClick?.(profile.id)}
            className="relative group cursor-pointer"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-main/10">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName || "Profile"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-main/20">
                  <span className="text-2xl font-bold text-main-600">
                    {(profile.fullName || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <h4 className="text-sm font-bold text-main-600 font-ariom truncate">
                {profile.fullName || "Unknown"}
              </h4>
              {profile.bio && (
                <p className="text-xs text-main/50 font-chivo truncate">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedProfilesCard;
