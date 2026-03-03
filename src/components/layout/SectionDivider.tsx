interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
}

export default function SectionDivider({
  fromColor = "#FAFAF8",
  toColor = "#FAFAF8",
}: SectionDividerProps) {
  return (
    <div className="w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1440 50"
        preserveAspectRatio="none"
        className="w-full h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,25 C120,50 240,0 360,25 C480,50 600,0 720,25 C840,50 960,0 1080,25 C1200,50 1320,0 1440,25 L1440,50 L0,50 Z"
          fill={toColor}
        />
        <rect x="0" y="0" width="1440" height="25" fill={fromColor} />
      </svg>
    </div>
  );
}
