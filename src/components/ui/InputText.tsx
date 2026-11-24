import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export type InputTextState = "Default" | "Hover" | "Focus" | "Filled" | "Disabled" | "Error" | "Success";

export interface InputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  icon?: QuickIconName | React.ReactNode;
  hasIcon?: boolean;
  state?: InputTextState;
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  {
    id: providedId,
    label,
    hasLabel = true,
    hint,
    hasHint = true,
    icon = "Icon/Line / Command",
    hasIcon = false,
    state = "Default",
    disabled,
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
  const isSuccess = state === "Success";

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && label && (
        <label htmlFor={id} className="text-body-sm-medium text-surface-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center h-11 px-3.5 gap-2 rounded-lg border transition-shadow duration-150",
          isDisabled
            ? "bg-surface-muted/70 border-surface-border text-surface-foreground-muted opacity-60 cursor-not-allowed"
            : isError
              ? "bg-surface-background border-2 border-feedback-danger"
              : isSuccess
                ? "bg-surface-background border-2 border-feedback-success"
                : state === "Focus"
                  ? "bg-surface-background border-2 border-surface-foreground shadow-focus"
                  : state === "Hover"
                    ? "bg-surface-background border-surface-border shadow-sm"
                    : "bg-surface-background border-surface-input focus-within:border-2 focus-within:border-surface-foreground focus-within:shadow-focus"
        )}
      >
        <input
          ref={ref}
          id={id}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          aria-describedby={hasHint && hint ? hintId : undefined}
          className="w-full min-w-0 bg-surface-transparent text-body-base-normal text-surface-foreground placeholder:text-surface-foreground-muted focus:outline-none disabled:cursor-not-allowed"
          {...props}
        />
        {(hasIcon || Boolean(props.value)) && icon && (
          <span className="text-surface-foreground-muted shrink-0">
            {typeof icon === "string" ? <Icon name={icon} size={18} /> : icon}
          </span>
        )}
      </div>
      {hasHint && hint && (
        <p
          id={hintId}
          className={cn(
            "text-body-xs-normal",
            isError
              ? "text-feedback-danger"
              : isSuccess
                ? "text-feedback-success"
                : "text-surface-foreground-muted"
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
});
