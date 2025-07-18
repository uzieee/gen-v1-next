interface AvatarPlaceholderProps {
  fullName: string;
  className?: string;
  noRing?: boolean;
}

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  fullName,
  noRing = false,
  className = "",
}) => {
  // Extract initials
  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("") || "U";

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer neon ring */}
      {!noRing && (
        <circle
          cx="100"
          cy="100"
          r="96"
          stroke="#E3EA24"
          strokeWidth="8"
          fill="none"
        />
      )}

      {/* Dark grey background */}
      {!noRing && <circle cx="100" cy="100" r="88" fill="#1A1A1A" />}

      {/* Neon glow filter */}
      {!noRing && (
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="6"
              floodColor="#E3EA24"
              floodOpacity="0.6"
            />
          </filter>
        </defs>
      )}

      {/* Inner circle with glow */}
      {!noRing && (
        <circle cx="100" cy="100" r="88" fill="#1A1A1A" filter="url(#glow)" />
      )}

      {/* User initials */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Poppins, Inter, sans-serif"
        fontSize="60"
        fill="#FFFFFF"
        fontWeight="600"
      >
        {initials}
      </text>
    </svg>
  );
};

export default AvatarPlaceholder;
