interface WavyDividerProps {
  flip?: boolean;
  from?: string;
  to?: string;
  className?: string;
}

export default function WavyDivider({
  flip = false,
  from = "transparent",
  to = "#FEFAE0",
  className,
}: WavyDividerProps) {
  // When flipped, swap rect/path colors so from=above and to=below remain visually correct
  // after scaleY(-1) inverts the DOM element's top and bottom.
  const rectColor = flip ? to : from;
  const pathColor = flip ? from : to;

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className ?? ""}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="80" fill={rectColor} />
        <path
          d="M0,40 C240,90 480,0 720,40 C960,90 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={pathColor}
        />
      </svg>
    </div>
  );
}
