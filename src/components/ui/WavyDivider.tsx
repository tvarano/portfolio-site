interface WavyDividerProps {
  flip?: boolean;
  color?: string;
  className?: string;
}

export default function WavyDivider({
  flip = false,
  color = "#FAFAF8",
  className,
}: WavyDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className ?? ""}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 C1300,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
