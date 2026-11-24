import React from "react";
import { cn } from "@/lib/cn";

export type CheckboxSelection = "Unchecked" | "Checked" | "Indeterminate";
export type CheckboxState = "Enabled" | "Disabled";

export interface CheckboxStandaloneProps {
  id?: string;
  name?: string;
  checked?: CheckboxSelection;
  defaultChecked?: CheckboxSelection;
  state?: CheckboxState;
  disabled?: boolean;
  error?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onCheckedChange?: (next: "Checked" | "Unchecked") => void;
  className?: string;
}

export function CheckboxStandalone({
  id,
  name,
  checked: controlledChecked,
  defaultChecked = "Unchecked",
  state = "Enabled",
  disabled,
  error = false,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  onCheckedChange,
  className,
}: CheckboxStandaloneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internal, setInternal] = React.useState<CheckboxSelection>(defaultChecked);
  const current = controlledChecked ?? internal;
  const isDisabled = Boolean(disabled || state === "Disabled");
  const isChecked = current === "Checked";
  const isIndeterminate = current === "Indeterminate";

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleChange = () => {
    if (isDisabled) return;
    const next: "Checked" | "Unchecked" = isChecked ? "Unchecked" : "Checked";
    if (controlledChecked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <span className={cn("relative inline-flex items-center justify-center shrink-0", className)}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={error || undefined}
        onChange={handleChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "size-5 rounded-md flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-150",
          "peer-focus-visible:shadow-focus peer-focus-visible:ring-2 peer-focus-visible:ring-surface-ring",
          isChecked || isIndeterminate
            ? "bg-primary-gradient border border-transparent text-primary-foreground"
            : error
              ? "bg-surface-background border-2 border-feedback-danger"
              : "bg-surface-background border border-surface-input peer-hover:border-surface-foreground/50",
          isDisabled && "opacity-45 cursor-not-allowed"
        )}
      >
        {isChecked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        {isIndeterminate && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M5 12h14" />
          </svg>
        )}
      </span>
    </span>
  );
}

export interface CheckboxProps extends CheckboxStandaloneProps {
  label: string;
  description?: string;
  hasDescription?: "No" | "Yes";
}

export function Checkbox({
  id: providedId,
  label,
  description,
  hasDescription,
  state = "Enabled",
  disabled,
  error = false,
  className,
  ...rest
}: CheckboxProps) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const descId = `${id}-desc`;
  const isDisabled = Boolean(disabled || state === "Disabled");
  const showDesc = (hasDescription === "Yes" || Boolean(description)) && hasDescription !== "No" && Boolean(description);

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-3 select-none min-h-6",
        isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      <CheckboxStandalone
        id={id}
        state={state}
        disabled={isDisabled}
        error={error}
        aria-describedby={showDesc ? descId : undefined}
        className="mt-0.5"
        {...rest}
      />
      <span className="flex flex-col gap-0.5">
        <span className={cn("text-body-sm-medium", error ? "text-feedback-danger" : "text-surface-foreground")}>
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

export interface CheckboxGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function CheckboxGroup({ label, children, className }: CheckboxGroupProps) {
  const labelId = React.useId();
  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      className={cn("flex flex-col gap-2.5", className)}
    >
      {label && (
        <span id={labelId} className="text-body-sm-medium text-surface-foreground">
          {label}
        </span>
      )}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
