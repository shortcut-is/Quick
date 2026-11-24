import React from "react";
import { cn } from "@/lib/cn";

export interface RadioProps {
  id?: string;
  name?: string;
  value?: string;
  state?: "Default" | "Disabled";
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
        onChange={() => {
          if (!isDisabled) onChange?.();
        }}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "size-5 rounded-full flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-150",
          "peer-focus-visible:shadow-focus peer-focus-visible:ring-2 peer-focus-visible:ring-surface-ring",
          isSelected
            ? "bg-primary-gradient border border-transparent"
            : "bg-surface-background border border-surface-input peer-hover:border-surface-foreground/50",
          isDisabled && "opacity-45 cursor-not-allowed"
        )}
      >
        {isSelected && <span className="size-2 rounded-full bg-primary-foreground" />}
      </span>
    </span>
  );
}

export interface RadioButtonProps {
  id?: string;
  name?: string;
  value?: string;
  label: string;
  description?: string;
  hasDescription?: "Off" | "On";
  state?: "Enabled" | "Disabled";
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
  const showDesc = (hasDescription === "On" || Boolean(description)) && hasDescription !== "Off" && Boolean(description);

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
        state={isDisabled ? "Disabled" : "Default"}
        aria-describedby={showDesc ? descId : undefined}
        onChange={onSelectChange}
        className="mt-0.5"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-body-sm-medium text-surface-foreground">{label}</span>
        {showDesc && (
          <span id={descId} className="text-body-xs-normal text-surface-foreground-muted">
            {description}
          </span>
        )}
      </span>
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
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  label,
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
      aria-labelledby={label ? labelId : undefined}
      className={cn("flex flex-col gap-2.5", className)}
    >
      {label && (
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
