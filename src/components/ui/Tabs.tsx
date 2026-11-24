import React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { Icon, type QuickIconName } from "./Icon";

export interface TabItemOption {
  id: string;
  label: string;
  icon?: QuickIconName;
  badge?: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItemOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  className?: string;
}

export function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
}: TabsProps) {
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
        "flex items-center gap-1 border-b border-surface-border overflow-x-auto no-scrollbar",
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
            disabled={item.disabled}
            onClick={() => commit(item.id)}
            className={cn(
              "relative inline-flex items-center gap-2 px-3.5 py-2.5 text-body-sm-medium whitespace-nowrap transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring rounded-t-lg",
              active
                ? "text-surface-foreground"
                : "text-surface-foreground-muted hover:text-surface-foreground",
              item.disabled && "opacity-45 pointer-events-none"
            )}
          >
            {item.icon && <Icon name={item.icon} size={16} />}
            <span>{item.label}</span>
            {item.badge && <Badge tone={active ? "Bold" : "Subtle"} label={item.badge} />}
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-top rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
