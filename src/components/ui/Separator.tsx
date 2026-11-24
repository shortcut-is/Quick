import React from "react";
import { cn } from "@/lib/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  direction?: "Horizontal" | "Vertical";
}

export function Separator({ direction = "Horizontal", className, ...props }: SeparatorProps) {
  if (direction === "Vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch bg-surface-border shrink-0", className)}
        {...props}
      />
    );
  }
  return (
    <hr
      className={cn("h-px w-full border-0 bg-surface-border shrink-0", className)}
      {...props}
    />
  );
}
