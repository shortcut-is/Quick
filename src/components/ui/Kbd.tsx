import React from "react";
import { cn } from "@/lib/cn";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "Subtle" | "Outline" | "Solid";
  size?: "SM" | "MD";
  hasModifier?: boolean;
  modifierKey?: string;
  keyLabel?: string;
}

const VARIANT_CLASSES = {
  Subtle: "bg-surface-muted text-surface-foreground border border-transparent",
  Outline: "bg-surface-background text-surface-foreground border border-surface-border shadow-sm",
  Solid: "bg-surface-invert-background text-primary-foreground border border-transparent",
};

export function Kbd({
  variant = "Subtle",
  size = "SM",
  hasModifier = true,
  modifierKey = "⌘",
  keyLabel = "K",
  className,
  children,
  ...props
}: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center gap-0.5 font-sans font-medium rounded-md shrink-0 select-none",
        size === "SM" ? "px-1.5 py-0.5 text-body-xs-medium min-w-5" : "px-2 py-1 text-body-sm-medium min-w-6",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {hasModifier && modifierKey && <span>{modifierKey}</span>}
          <span>{keyLabel}</span>
        </>
      )}
    </kbd>
  );
}
