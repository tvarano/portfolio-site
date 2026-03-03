import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RetroBoxProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  surface?: string;
  offset?: number;
  style?: CSSProperties;
}

export default function RetroBox({
  children,
  className,
  accentColor,
  surface,
  offset = 5,
  style,
}: RetroBoxProps) {
  const color = accentColor ?? "var(--ink)";
  return (
    <div
      className={cn("relative", className)}
      style={{
        border: `3px solid ${color}`,
        boxShadow: `${offset}px ${offset}px 0px ${color}`,
        background: surface ?? "white",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
