import React from "react";
import { cn } from "@/lib/cn";

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

export function Overlay({ open = true, className, ...props }: OverlayProps) {
  if (!open) return null;
  return (
    <div
      aria-hidden="true"
      className={cn("fixed inset-0 z-40 bg-surface-overlay backdrop-blur-[2px]", className)}
      {...props}
    />
  );
}
