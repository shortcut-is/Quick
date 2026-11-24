import React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { Icon } from "./Icon";

export interface CollapsibleProps {
  variant?: "Card" | "Ghost";
  state?: "Collapsed" | "Expanded";
  defaultExpanded?: boolean;
  title?: string;
  hasBadge?: boolean;
  badgeLabel?: string;
  onStateChange?: (next: "Expanded" | "Collapsed") => void;
  children: React.ReactNode;
  className?: string;
}

export function Collapsible({
  variant = "Card",
  state,
  defaultExpanded = false,
  title = "Configuración avanzada",
  hasBadge = true,
  badgeLabel = "3",
  onStateChange,
  children,
  className,
}: CollapsibleProps) {
  const panelId = React.useId();
  const [internal, setInternal] = React.useState(defaultExpanded);
  const expanded = state !== undefined ? state === "Expanded" : internal;

  const toggle = () => {
    const next = !expanded;
    if (state === undefined) setInternal(next);
    onStateChange?.(next ? "Expanded" : "Collapsed");
  };

  return (
    <div
      className={cn(
        "w-full rounded-xl transition-colors",
        variant === "Card"
          ? "border border-surface-border bg-surface-background"
          : "bg-surface-transparent",
        className
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          "flex items-center justify-between w-full gap-3 px-3.5 py-2.5 text-left cursor-pointer rounded-xl",
          "hover:bg-surface-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-body-sm-medium text-surface-foreground truncate">{title}</span>
          {hasBadge && badgeLabel && <Badge tone="Subtle" label={badgeLabel} />}
        </div>
        <Icon
          name="Icon/Line / Chevron-Down"
          size={16}
          className={cn(
            "text-surface-foreground-muted shrink-0 transition-transform duration-150",
            expanded && "rotate-180"
          )}
        />
      </button>

      {expanded && (
        <div id={panelId} className="px-3.5 pb-3.5 pt-2 border-t border-surface-border/50">
          {children}
        </div>
      )}
    </div>
  );
}
