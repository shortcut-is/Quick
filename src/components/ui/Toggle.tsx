import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "Outline" | "Ghost";
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  hasLabel?: boolean;
  label?: string;
  hasIcon?: boolean;
  icon?: QuickIconName | React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    variant = "Outline",
    pressed: controlledPressed,
    defaultPressed = false,
    onPressedChange,
    hasLabel = true,
    label,
    hasIcon = true,
    icon = "Icon/Line / Grid",
    disabled = false,
    onClick,
    className,
    children,
    ...props
  },
  ref
) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultPressed);
  const isPressed = controlledPressed !== undefined ? controlledPressed : uncontrolled;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !isPressed;
    if (controlledPressed === undefined) setUncontrolled(next);
    onPressedChange?.(next);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-pressed={isPressed}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center h-10 px-3 rounded-lg gap-1.5 text-body-sm-medium select-none cursor-pointer transition-colors duration-150",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "disabled:opacity-45 disabled:pointer-events-none",
        variant === "Outline"
          ? isPressed
            ? "bg-surface-muted text-surface-foreground border border-surface-foreground"
            : "bg-surface-background text-surface-foreground-muted border border-surface-border hover:bg-surface-muted/50"
          : isPressed
            ? "bg-surface-muted text-surface-foreground border border-transparent"
            : "bg-surface-transparent text-surface-foreground-muted border border-transparent hover:bg-surface-muted/50",
        className
      )}
      {...props}
    >
      {hasIcon &&
        (typeof icon === "string" ? <Icon name={icon} size={16} /> : icon)}
      {hasLabel && (children ?? label) && <span>{children ?? label}</span>}
    </button>
  );
});

export interface ToggleGroupItem {
  value: string;
  label: string;
  icon?: QuickIconName;
  disabled?: boolean;
}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  selection?: "Single" | "Multiple";
  items: ToggleGroupItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export function ToggleGroup({
  selection = "Single",
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupProps) {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(
    defaultValue ?? (items[0] ? [items[0].value] : [])
  );
  const current = controlledValue ?? uncontrolled;

  const toggleItem = (itemVal: string) => {
    let next: string[];
    if (selection === "Single") {
      next = [itemVal];
    } else {
      next = current.includes(itemVal)
        ? current.filter((v) => v !== itemVal)
        : [...current, itemVal];
    }
    if (controlledValue === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center p-1 gap-1 rounded-lg bg-surface-background border border-surface-border",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Toggle
          key={item.value}
          variant="Ghost"
          pressed={current.includes(item.value)}
          disabled={item.disabled}
          onPressedChange={() => toggleItem(item.value)}
          icon={item.icon}
          hasIcon={Boolean(item.icon)}
          label={item.label}
          className="h-8 px-2.5"
        />
      ))}
    </div>
  );
}
