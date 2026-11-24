import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export interface SegmentItemOption {
  id: string;
  label: string;
  icon?: QuickIconName;
}

export interface SegmentControlProps {
  items: SegmentItemOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}

export function SegmentControl({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  fullWidth = false,
  className,
}: SegmentControlProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? items[0]?.id ?? "");
  const current = controlledValue ?? uncontrolled;

  const commit = (id: string) => {
    if (controlledValue === undefined) setUncontrolled(id);
    onValueChange?.(id);
  };

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center p-1 rounded-xl bg-surface-muted border border-surface-border/60 gap-1",
        fullWidth && "w-full",
        className
      )}
    >
      {items.map((item) => {
        const active = item.id === current;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => commit(item.id)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-body-xs-medium transition-[background-color,color,box-shadow] duration-150 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
              fullWidth && "flex-1",
              active
                ? "bg-surface-background text-surface-foreground shadow-sm"
                : "text-surface-foreground-muted hover:text-surface-foreground"
            )}
          >
            {item.icon && <Icon name={item.icon} size={14} />}
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
