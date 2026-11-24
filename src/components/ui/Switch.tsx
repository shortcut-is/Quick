import React from "react";
import { cn } from "@/lib/cn";

export interface SwitchStandaloneProps {
  id?: string;
  state?: "Enabled" | "Disabled";
  selected?: "Off" | "On";
  defaultSelected?: "Off" | "On";
  size?: "Small" | "Large";
  disabled?: boolean;
  "aria-label"?: string;
  onSelectedChange?: (next: "On" | "Off") => void;
  className?: string;
}

export function SwitchStandalone({
  id,
  state = "Enabled",
  selected: controlledSelected,
  defaultSelected = "Off",
  size = "Small",
  disabled,
  "aria-label": ariaLabel,
  onSelectedChange,
  className,
}: SwitchStandaloneProps) {
  const [internal, setInternal] = React.useState<"On" | "Off">(defaultSelected);
  const current = controlledSelected ?? internal;
  const isOn = current === "On";
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isLarge = size === "Large";

  const toggle = () => {
    if (isDisabled) return;
    const next: "On" | "Off" = isOn ? "Off" : "On";
    if (controlledSelected === undefined) setInternal(next);
    onSelectedChange?.(next);
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex items-center shrink-0 rounded-full p-0.5 transition-colors duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring focus-visible:shadow-focus",
        isLarge ? "w-11 h-6" : "w-9 h-5",
        isOn ? "bg-primary-gradient" : "bg-surface-input",
        isDisabled && "opacity-45 cursor-not-allowed",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "rounded-full shadow-sm transition-transform duration-150",
          isLarge ? "size-5" : "size-4",
          isOn
            ? cn("bg-primary-foreground", isLarge ? "translate-x-5" : "translate-x-4")
            : "bg-surface-background dark:bg-surface-foreground translate-x-0"
        )}
      />
    </button>
  );
}

export interface SwitchProps extends SwitchStandaloneProps {
  label: string;
  description?: string;
}

export function Switch({
  id: providedId,
  label,
  description,
  state = "Enabled",
  disabled,
  className,
  ...rest
}: SwitchProps) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const isDisabled = Boolean(disabled || state === "Disabled");

  return (
    <div className={cn("inline-flex items-center gap-3", isDisabled && "opacity-60", className)}>
      <SwitchStandalone id={id} state={state} disabled={isDisabled} {...rest} />
      <label
        htmlFor={id}
        className={cn(
          "flex flex-col select-none",
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <span className="text-body-sm-medium text-surface-foreground">{label}</span>
        {description && <span className="text-body-xs-normal text-surface-foreground-muted">{description}</span>}
      </label>
    </div>
  );
}
