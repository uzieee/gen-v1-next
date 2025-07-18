export default function generateAvatarSVG(fullName: string): string {
  // Helper to extract initials
  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() || "")
      .slice(0, 2)
      .join("") || "U"; // default to "U" for unknown

  // Return SVG string
  return `
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="100"
      cy="100"
      r="96"
      stroke="#E3EA24"
      stroke-width="8"
      fill="none"
    />
    <circle
      cx="100"
      cy="100"
      r="88"
      fill="#1A1A1A"
    />
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#E3EA24" flood-opacity="0.6"/>
    </filter>
    <circle
      cx="100"
      cy="100"
      r="88"
      fill="#1A1A1A"
      filter="url(#glow)"
    />
    <text
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="middle"
      font-family="Poppins, Inter, sans-serif"
      font-size="60"
      fill="#FFFFFF"
      font-weight="600"
    >
      ${initials}
    </text>
  </svg>
    `.trim();
}
