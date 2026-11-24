import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  state?: "Enabled" | "Disabled";
  isDismissible?: boolean;
  label?: string;
  onDismiss?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    state = "Enabled",
    isDismissible = false,
    label,
    onDismiss,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = state === "Disabled";

  return (
    <span
      ref={ref}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-4xl bg-surface-muted text-surface-foreground text-body-xs-medium whitespace-nowrap",
        isDisabled && "opacity-45 pointer-events-none",
        className
      )}
      {...props}
    >
      <span>{children ?? label}</span>
      {isDismissible && (
        <button
          type="button"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss?.();
          }}
          aria-label={`Quitar ${label ?? (typeof children === "string" ? children : "etiqueta")}`}
          className="inline-flex items-center justify-center rounded-full size-4 text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-border/60 focus-visible:outline-none focus-visible:shadow-focus cursor-pointer"
        >
          <Icon name="Icon/Line / X" size={12} />
        </button>
      )}
    </span>
  );
});

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function TagGroup({ label, className, children, ...props }: TagGroupProps) {
  return (
    <div
      role="list"
      aria-label={label ?? "Etiquetas activas"}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
