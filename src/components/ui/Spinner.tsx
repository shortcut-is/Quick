import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "SM" | "MD" | "LG";
  variant?: "Default" | "Muted";
  hasLabel?: boolean;
  label?: string;
}

const SPINNER_SIZES = { SM: 16, MD: 20, LG: 24 };

export function Spinner({
  size = "SM",
  variant = "Default",
  hasLabel = true,
  label = "Cargando...",
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2",
        variant === "Muted" ? "text-surface-foreground-muted" : "text-surface-foreground",
        className
      )}
      {...props}
    >
      <Icon name="Icon/Line / Loader" size={SPINNER_SIZES[size]} className="animate-spin" />
      {hasLabel && <span className="text-body-sm-normal">{label}</span>}
      {!hasLabel && <span className="sr-only">{label}</span>}
    </div>
  );
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "Line" | "Circle" | "Card" | "Row" | "AvatarRow";
}

export function Skeleton({ shape = "Line", className, ...props }: SkeletonProps) {
  if (shape === "AvatarRow") {
    return (
      <div className={cn("flex items-center gap-3 w-full", className)} {...props}>
        <div className="size-10 rounded-full bg-surface-muted animate-pulse shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3.5 w-2/3 rounded-md bg-surface-muted animate-pulse" />
          <div className="h-3 w-1/2 rounded-md bg-surface-muted animate-pulse" />
        </div>
      </div>
    );
  }
  if (shape === "Circle") {
    return <div className={cn("size-10 rounded-full bg-surface-muted animate-pulse", className)} {...props} />;
  }
  if (shape === "Card") {
    return <div className={cn("h-28 w-full rounded-xl bg-surface-muted animate-pulse", className)} {...props} />;
  }
  return <div className={cn("h-4 w-full rounded-md bg-surface-muted animate-pulse", className)} {...props} />;
}
