import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export type BadgeAppearance = "Label" | "Label + Icon" | "Dot";
export type BadgeTone = "Bold" | "Subtle" | "Outline" | "Info" | "Success" | "Warning" | "Danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: BadgeAppearance;
  tone?: BadgeTone;
  label?: string;
  icon?: QuickIconName | React.ReactNode;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  Bold: "bg-surface-foreground text-surface-background border border-transparent",
  Subtle: "bg-surface-muted text-surface-foreground-muted border border-transparent",
  Outline: "bg-surface-background text-surface-foreground border border-surface-border",
  Info: "bg-feedback-info-subtle text-feedback-info-bold border border-transparent",
  Success: "bg-feedback-success-subtle text-feedback-success-bold border border-transparent",
  Warning: "bg-feedback-warning-subtle text-feedback-warning-bold border border-transparent",
  Danger: "bg-feedback-danger-subtle text-feedback-danger-bold border border-transparent",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  Bold: "bg-surface-background",
  Subtle: "bg-surface-foreground-muted",
  Outline: "bg-surface-foreground",
  Info: "bg-feedback-info",
  Success: "bg-feedback-success",
  Warning: "bg-feedback-warning",
  Danger: "bg-feedback-danger",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    appearance = "Label",
    tone = "Subtle",
    label,
    icon = "Icon/Line / Zap",
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-body-xs-medium whitespace-nowrap shrink-0",
        TONE_CLASSES[tone],
        className
      )}
      {...props}
    >
      {appearance === "Dot" && (
        <span className={cn("size-1.5 rounded-full shrink-0", DOT_CLASSES[tone])} aria-hidden="true" />
      )}
      {appearance === "Label + Icon" &&
        (typeof icon === "string" ? <Icon name={icon} size={12} /> : icon)}
      <span>{children ?? label}</span>
    </span>
  );
});
