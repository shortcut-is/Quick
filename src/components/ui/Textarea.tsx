import React from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  state?: "Default" | "Focus" | "Error" | "Disabled";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id: providedId,
    label,
    hasLabel = true,
    hint,
    hasHint = true,
    state = "Default",
    disabled,
    rows = 3,
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
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={isDisabled}
        aria-invalid={isError || undefined}
        aria-describedby={hasHint && hint ? hintId : undefined}
        className={cn(
          "w-full min-h-24 p-3.5 rounded-lg border text-body-base-normal text-surface-foreground placeholder:text-surface-foreground-muted resize-y transition-shadow duration-150 focus:outline-none",
          isDisabled
            ? "bg-surface-muted/70 border-surface-border opacity-60 cursor-not-allowed"
            : isError
              ? "bg-surface-background border-2 border-feedback-danger"
              : "bg-surface-background border-surface-input focus:border-2 focus:border-surface-foreground focus:shadow-focus"
        )}
        {...props}
      />
      {hasHint && hint && (
        <p id={hintId} className={cn("text-body-xs-normal", isError ? "text-feedback-danger" : "text-surface-foreground-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
});
