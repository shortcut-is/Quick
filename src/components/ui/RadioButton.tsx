import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export type RadioState = "Default" | "Hover" | "Focus" | "Error" | "Disabled";

export interface RadioProps {
  id?: string;
  name?: string;
  value?: string;
  state?: RadioState;
  selected?: "Off" | "On";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onChange?: () => void;
  className?: string;
}

export function Radio({
  id,
  name,
  value,
  state = "Default",
  selected = "Off",
  disabled,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  onChange,
  className,
}: RadioProps) {
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isSelected = selected === "On";
  const isError = state === "Error";
  const isFocus = state === "Focus";
  const isHover = state === "Hover";

  return (
    <span className={cn("relative inline-flex items-center justify-center shrink-0", className)}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={isError || undefined}
        onChange={() => {
          if (!isDisabled) onChange?.();
        }}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "size-5 rounded-full flex items-center justify-center transition-[background-color,border-color,box-shadow,opacity] duration-150",
          "peer-focus-visible:shadow-focus peer-focus-visible:ring-2 peer-focus-visible:ring-surface-ring",
          isFocus && "shadow-focus ring-2 ring-surface-ring",
          isSelected
            ? isError
              ? "bg-feedback-danger border border-transparent"
              : cn("bg-primary-gradient border border-transparent", isHover && "opacity-90")
            : isError
              ? "bg-feedback-danger-subtle border-2 border-feedback-danger"
              : isFocus
                ? "bg-surface-background border-2 border-surface-foreground"
                : isHover
                  ? "bg-surface-muted border-2 border-surface-foreground"
                  : "bg-surface-background border-2 border-surface-input peer-hover:border-surface-foreground/60",
          isDisabled && "opacity-45 cursor-not-allowed"
        )}
      >
        {isSelected && <span className="size-2 rounded-full bg-primary-foreground" />}
      </span>
    </span>
  );
}

export type RadioButtonState = "Enabled" | "Hover" | "Focus" | "Error" | "Disabled";

export interface RadioButtonProps {
  id?: string;
  name?: string;
  value?: string;
  label: string;
  description?: string;
  hasDescription?: "Off" | "On";
  state?: RadioButtonState;
  selected?: "Off" | "On";
  disabled?: boolean;
  onSelectChange?: () => void;
  className?: string;
}

export function RadioButton({
  id: providedId,
  name,
  value,
  label,
  description,
  hasDescription,
  state = "Enabled",
  selected = "Off",
  disabled,
  onSelectChange,
  className,
}: RadioButtonProps) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const descId = `${id}-desc`;
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isError = state === "Error";
  const showDesc = (hasDescription === "On" || Boolean(description)) && hasDescription !== "Off" && Boolean(description);
  const innerState: RadioState = state === "Enabled" ? "Default" : state;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-3 select-none min-h-6",
        isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      <Radio
        id={id}
        name={name}
        value={value}
        selected={selected}
        state={isDisabled ? "Disabled" : innerState}
        aria-describedby={showDesc ? descId : undefined}
        onChange={onSelectChange}
        className="mt-0.5"
      />
      <span className="flex flex-col gap-0.5">
        <span className={cn("text-body-sm-medium", isError ? "text-feedback-danger" : "text-surface-foreground")}>
          {label}
        </span>
        {showDesc && (
          <span id={descId} className="text-body-xs-normal text-surface-foreground-muted">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export interface RadioCardProps {
  id?: string;
  name?: string;
  value?: string;
  state?: "Default" | "Hover" | "Focus" | "Disabled";
  selected?: "Off" | "On";
  hasIcon?: boolean;
  icon?: QuickIconName;
  hasDescription?: boolean;
  hasMeta?: boolean;
  title: string;
  description?: string;
  meta?: string;
  disabled?: boolean;
  onSelectChange?: () => void;
  className?: string;
}

export function RadioCard({
  id: providedId,
  name,
  value,
  state = "Default",
  selected = "Off",
  hasIcon = false,
  icon = "Icon/Line / Credit-card",
  hasDescription = true,
  hasMeta = false,
  title,
  description,
  meta,
  disabled,
  onSelectChange,
  className,
}: RadioCardProps) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const descId = `${id}-desc`;
  const isSelected = selected === "On";
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isFocus = state === "Focus";
  const isHover = state === "Hover";
  const showDesc = Boolean(hasDescription && description);

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center gap-3 w-full p-4 rounded-xl transition-[background-color,border-color,box-shadow] duration-150 select-none",
        isSelected
          ? "bg-surface-muted border-2 border-surface-foreground"
          : isHover
            ? "bg-surface-muted/60 border border-surface-border"
            : "bg-surface-background border border-surface-border hover:bg-surface-muted/50",
        isFocus && "border-2 border-surface-foreground shadow-focus",
        isDisabled ? "opacity-45 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className
      )}
    >
      <Radio
        id={id}
        name={name}
        value={value}
        selected={selected}
        state={isDisabled ? "Disabled" : state}
        aria-describedby={showDesc ? descId : undefined}
        onChange={onSelectChange}
      />

      {hasIcon && (
        <span className="size-9 rounded-lg bg-surface-background border border-surface-border flex items-center justify-center text-surface-foreground shrink-0">
          <Icon name={icon} size={18} />
        </span>
      )}

      <span className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-body-sm-medium text-surface-foreground truncate">{title}</span>
        {showDesc && (
          <span id={descId} className="text-body-xs-normal text-surface-foreground-muted">
            {description}
          </span>
        )}
      </span>

      {hasMeta && meta && (
        <span className="text-body-sm-medium text-surface-foreground tabular-nums shrink-0">{meta}</span>
      )}
    </label>
  );
}

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  hasLabel?: boolean;
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  label,
  hasLabel = true,
  name: providedName,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
}: RadioGroupProps) {
  const autoName = React.useId();
  const labelId = React.useId();
  const name = providedName ?? autoName;
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? options[0]?.value ?? "");
  const current = controlledValue ?? uncontrolled;

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) setUncontrolled(val);
    onValueChange?.(val);
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={hasLabel && label ? labelId : undefined}
      className={cn("flex flex-col gap-2.5", className)}
    >
      {hasLabel && label && (
        <span id={labelId} className="text-body-sm-medium text-surface-foreground">
          {label}
        </span>
      )}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <RadioButton
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            hasDescription={opt.description ? "On" : "Off"}
            state={opt.disabled ? "Disabled" : "Enabled"}
            selected={current === opt.value ? "On" : "Off"}
            onSelectChange={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
