import React from "react";
import { cn } from "@/lib/cn";

export type TooltipTail =
  | "← Left"
  | "↑ Top"
  | "→ Right"
  | "↓ Bottom"
  | "↖ Top Left"
  | "↗ Top Right"
  | "↘ Bottom Right"
  | "↙ Bottom Left";

export interface TooltipProps {
  label: string;
  tailPlacement?: TooltipTail;
  type?: "Default" | "Block";
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({
  label,
  tailPlacement = "↓ Bottom",
  type = "Default",
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const tooltipId = React.useId();

  const isTop = tailPlacement.includes("Top");
  const isLeft = tailPlacement === "← Left";
  const isRight = tailPlacement === "→ Right";

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? tooltipId : undefined}>{children}</span>

      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 px-2.5 py-1.5 rounded-lg bg-surface-invert-background text-surface-invert-foreground text-body-xs-medium shadow-md",
            type === "Block" ? "w-48 whitespace-normal" : "whitespace-nowrap",
            isTop && "top-full mt-2 left-1/2 -translate-x-1/2",
            isLeft && "left-full ml-2 top-1/2 -translate-y-1/2",
            isRight && "right-full mr-2 top-1/2 -translate-y-1/2",
            !isTop && !isLeft && !isRight && "bottom-full mb-2 left-1/2 -translate-x-1/2"
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
