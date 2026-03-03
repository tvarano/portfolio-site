import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  color?: string;
  className?: string;
}

export default function Tag({ label, color, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-xs px-4 py-1.5 rounded-full border-2 bg-white/70 text-ink select-none uppercase tracking-widest",
        "hover:scale-105 hover:-translate-y-0.5 transition-transform cursor-default",
        className
      )}
      style={{
        borderColor: color ?? "var(--ink)",
        color: color ?? "var(--ink)",
      }}
    >
      {label}
    </span>
  );
}
