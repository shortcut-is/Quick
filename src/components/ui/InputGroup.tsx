import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export interface InputGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  use?: "Prefix" | "Suffix" | "Password" | "Action";
  state?: "Default" | "Focus" | "Error";
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  addonText?: string;
  hasAddonIcon?: boolean;
  addonIcon?: QuickIconName;
  onActionClick?: () => void;
}

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(function InputGroup(
  {
    id: providedId,
    use = "Prefix",
    state = "Default",
    label,
    hasLabel = true,
    hint,
    hasHint = true,
    addonText,
    hasAddonIcon = false,
    addonIcon = "Icon/Line / Globe",
    onActionClick,
    className,
    type,
    ...props
  },
  ref
) {
  const autoId = React.useId();
  const id = providedId ?? autoId;
  const hintId = `${id}-hint`;
  const [showPassword, setShowPassword] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const isError = state === "Error";

  const resolvedType =
    use === "Password" ? (showPassword ? "text" : "password") : type ?? "text";

  const resolvedAddon =
    addonText ??
    (use === "Prefix" ? "https://" : use === "Suffix" ? ".quick.ds" : use === "Action" ? "Copiar" : "Mostrar");

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (props.value && navigator.clipboard) {
      navigator.clipboard.writeText(String(props.value)).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && label && (
        <label htmlFor={id} className="text-body-sm-medium text-surface-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center h-11 rounded-lg bg-surface-background transition-shadow duration-150",
          isError
            ? "border-2 border-feedback-danger"
            : state === "Focus"
              ? "border-2 border-surface-foreground shadow-focus"
              : "border border-surface-input focus-within:border-2 focus-within:border-surface-foreground focus-within:shadow-focus"
        )}
      >
        {use === "Prefix" && (
          <div className="flex items-center h-full px-3 gap-1.5 rounded-l-lg bg-surface-muted border-r border-surface-border text-body-sm-medium text-surface-foreground-muted shrink-0">
            {hasAddonIcon && <Icon name={addonIcon} size={16} />}
            <span>{resolvedAddon}</span>
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={resolvedType}
          aria-invalid={isError || undefined}
          aria-describedby={hasHint && hint ? hintId : undefined}
          className="w-full min-w-0 h-full px-3 bg-surface-transparent text-body-base-normal text-surface-foreground placeholder:text-surface-foreground-muted focus:outline-none"
          {...props}
        />

        {use === "Suffix" && (
          <div className="flex items-center h-full px-3 rounded-r-lg bg-surface-muted border-l border-surface-border text-body-sm-medium text-surface-foreground-muted shrink-0">
            <span>{resolvedAddon}</span>
          </div>
        )}

        {use === "Password" && (
          <button
            type="button"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
            className="flex items-center h-full px-3 gap-1.5 text-body-xs-medium text-surface-foreground-muted hover:text-surface-foreground cursor-pointer shrink-0"
          >
            <Icon name="Icon/Line / Shield" size={16} />
            <span>{showPassword ? "Ocultar" : resolvedAddon}</span>
          </button>
        )}

        {use === "Action" && (
          <button
            type="button"
            onClick={handleAction}
            className="flex items-center h-full px-3 gap-1.5 rounded-r-lg bg-surface-muted border-l border-surface-border text-body-sm-medium text-surface-foreground hover:bg-surface-border/70 cursor-pointer shrink-0"
          >
            <Icon name={copied ? "Icon/Line / Check-Circle" : "Icon/Line / Copy"} size={16} />
            <span>{copied ? "Copiado" : resolvedAddon}</span>
          </button>
        )}
      </div>
      {hasHint && hint && (
        <p id={hintId} className={cn("text-body-xs-normal", isError ? "text-feedback-danger" : "text-surface-foreground-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
});
