import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export interface ButtonGroupAction {
  id: string;
  label: string;
  icon?: QuickIconName;
  onClick?: () => void;
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  use?: "SplitAction" | "SegmentedActions" | "StepperCounter";
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  onMenuClick?: () => void;
  actions?: ButtonGroupAction[];
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onStepChange?: (next: number) => void;
}

export function ButtonGroup({
  use = "SegmentedActions",
  primaryLabel = "Publicar cambios",
  onPrimaryClick,
  onMenuClick,
  actions = [
    { id: "copy", label: "Copiar", icon: "Icon/Line / Copy" },
    { id: "share", label: "Compartir", icon: "Icon/Line / Share" },
    { id: "export", label: "Exportar", icon: "Icon/Line / Download" },
  ],
  value = 100,
  min = 25,
  max = 200,
  step = 25,
  unit = "%",
  onStepChange,
  className,
  ...props
}: ButtonGroupProps) {
  if (use === "SplitAction") {
    return (
      <div
        role="group"
        className={cn(
          "inline-flex items-center h-10 rounded-lg overflow-hidden bg-primary-gradient text-primary-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={onPrimaryClick}
          className="h-full px-3.5 text-body-sm-medium hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus cursor-pointer"
        >
          {primaryLabel}
        </button>
        <div className="w-px h-full bg-primary-foreground/25" aria-hidden="true" />
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Más opciones"
          className="inline-flex items-center justify-center size-10 hover:opacity-90 focus-visible:outline-none focus-visible:shadow-focus cursor-pointer"
        >
          <Icon name="Icon/Line / Chevron-Down" size={16} />
        </button>
      </div>
    );
  }

  if (use === "StepperCounter") {
    return (
      <div
        role="group"
        aria-label="Control incremental"
        className={cn(
          "inline-flex items-center h-10 rounded-lg overflow-hidden bg-surface-background border border-surface-border shadow-sm",
          className
        )}
        {...props}
      >
        <button
          type="button"
          aria-label="Disminuir"
          disabled={value <= min}
          onClick={() => onStepChange?.(Math.max(min, value - step))}
          className="inline-flex items-center justify-center w-9 h-full text-body-sm-bold text-surface-foreground hover:bg-surface-muted/60 disabled:opacity-40 cursor-pointer"
        >
          −
        </button>
        <div className="w-px h-full bg-surface-border" aria-hidden="true" />
        <span className="inline-flex items-center justify-center min-w-14 h-full px-2 bg-surface-muted/40 text-body-sm-medium text-surface-foreground tabular-nums">
          {value}
          {unit}
        </span>
        <div className="w-px h-full bg-surface-border" aria-hidden="true" />
        <button
          type="button"
          aria-label="Aumentar"
          disabled={value >= max}
          onClick={() => onStepChange?.(Math.min(max, value + step))}
          className="inline-flex items-center justify-center w-9 h-full text-surface-foreground hover:bg-surface-muted/60 disabled:opacity-40 cursor-pointer"
        >
          <Icon name="Icon/Line / Plus" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center h-10 rounded-lg overflow-hidden bg-surface-background border border-surface-border shadow-sm divide-x divide-surface-border",
        className
      )}
      {...props}
    >
      {actions.map((act) => (
        <button
          key={act.id}
          type="button"
          onClick={act.onClick}
          className="inline-flex items-center gap-1.5 h-full px-3 text-body-sm-medium text-surface-foreground hover:bg-surface-muted/60 focus-visible:outline-none focus-visible:shadow-focus cursor-pointer"
        >
          {act.icon && <Icon name={act.icon} size={16} />}
          <span>{act.label}</span>
        </button>
      ))}
    </div>
  );
}
