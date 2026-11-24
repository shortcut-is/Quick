import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface InputSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  options: SelectOption[];
  placeholder?: string;
  state?: "Default" | "Error" | "Disabled";
}

export const InputSelect = React.forwardRef<HTMLSelectElement, InputSelectProps>(function InputSelect(
  {
    id: providedId,
    label,
    hasLabel = true,
    hint,
    hasHint = true,
    options,
    placeholder,
    state = "Default",
    disabled,
    style,
    className,
    ...props
  },
  ref
) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const hintId = `${id}-hint`;
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isError = state === "Error";

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && label && (
        <label htmlFor={id} className="text-body-sm-medium text-surface-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={id}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          aria-describedby={hasHint && hint ? hintId : undefined}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            ...style,
          }}
          className={cn(
            "quick-select w-full h-11 pl-3.5 pr-10 rounded-lg border appearance-none text-body-base-normal text-surface-foreground cursor-pointer transition-shadow duration-150 focus:outline-none",
            isDisabled
              ? "bg-surface-muted/70 border-surface-border opacity-60 cursor-not-allowed"
              : isError
                ? "bg-surface-background border-2 border-feedback-danger"
                : "bg-surface-background border-surface-input focus:border-2 focus:border-surface-foreground focus:shadow-focus"
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          name="Icon/Line / Chevron-Down"
          size={18}
          className="pointer-events-none absolute right-3 text-surface-foreground-muted"
        />
      </div>
      {hasHint && hint && (
        <p id={hintId} className={cn("text-body-xs-normal", isError ? "text-feedback-danger" : "text-surface-foreground-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
});
