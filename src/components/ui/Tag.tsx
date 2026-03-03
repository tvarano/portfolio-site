import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  color?: string;
  className?: string;
  rotate?: number;
}

export default function Tag({ label, color, className, rotate = 0 }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-patrick text-sm px-3 py-1 rounded-md border-2 border-navy/20 bg-white/70 text-navy select-none",
        className
      )}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        borderColor: color ? `${color}55` : undefined,
        color: color ? color : undefined,
      }}
    >
      {label}
    </span>
  );
}
