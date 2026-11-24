import React from "react";
import { cn } from "@/lib/cn";

export type ProgressBarVariant = "Default" | "Success" | "Warning" | "Danger";
export type ProgressBarSize = "SM" | "LG";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  value: number;
  label?: string;
  hasHeader?: boolean;
  hasValue?: boolean;
  caption?: string;
  hasCaption?: boolean;
}

const INDICATOR_TONE: Record<ProgressBarVariant, string> = {
  Default: "bg-primary-gradient",
  Success: "bg-feedback-success",
  Warning: "bg-feedback-warning",
  Danger: "bg-feedback-danger",
};

export function ProgressBar({
  variant = "Default",
  size = "SM",
  value,
  label = "Progreso",
  hasHeader = true,
  hasValue = true,
  caption,
  hasCaption = false,
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      {hasHeader && (
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-sm-medium text-surface-foreground">{label}</span>
          {hasValue && (
            <span className="text-body-xs-normal text-surface-foreground-muted tabular-nums">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "w-full rounded-full bg-surface-muted overflow-hidden",
          size === "LG" ? "h-4" : "h-2"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", INDICATOR_TONE[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {(hasCaption || Boolean(caption)) && caption && (
        <p className="text-body-xs-normal text-surface-foreground-muted">{caption}</p>
      )}
    </div>
  );
}
