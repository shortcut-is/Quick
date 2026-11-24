import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";

export type ToastVariant = "Neutral" | "Success" | "Warning" | "Danger";

export interface ToastProps {
  variant?: ToastVariant;
  hasIcon?: boolean;
  hasDescription?: boolean;
  hasAction?: boolean;
  hasCloseButton?: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

const VARIANT_CONFIG: Record<ToastVariant, { ring: string; iconColor: string; icon: QuickIconName }> = {
  Neutral: { ring: "border-surface-border bg-surface-background", iconColor: "text-surface-foreground", icon: "Icon/Line / Info" },
  Success: { ring: "border-feedback-success/35 bg-surface-background", iconColor: "text-feedback-success", icon: "Icon/Line / Check-Circle" },
  Warning: { ring: "border-feedback-warning/35 bg-surface-background", iconColor: "text-feedback-warning", icon: "Icon/Line / Alert-Triangle" },
  Danger: { ring: "border-feedback-danger/35 bg-surface-background", iconColor: "text-feedback-danger", icon: "Icon/Line / Alert-circle" },
};

export function Toast({
  variant = "Neutral",
  hasIcon = true,
  hasDescription = true,
  hasAction = true,
  hasCloseButton = true,
  title = "Cambios guardados",
  description = "Tus preferencias del espacio de trabajo fueron actualizadas.",
  actionLabel = "Deshacer",
  onAction,
  onClose,
  className,
}: ToastProps) {
  const cfg = VARIANT_CONFIG[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 p-3.5 rounded-xl border shadow-lg max-w-md w-full",
        cfg.ring,
        className
      )}
    >
      {hasIcon && (
        <span className={cn("shrink-0", cfg.iconColor)}>
          <Icon name={cfg.icon} size={18} />
        </span>
      )}

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-body-sm-medium text-surface-foreground truncate">{title}</p>
        {hasDescription && description && (
          <p className="text-body-xs-normal text-surface-foreground-muted line-clamp-2">{description}</p>
        )}
      </div>

      {hasAction && (
        <Button variant="Outline" size="XS" onClick={onAction} className="shrink-0">
          {actionLabel}
        </Button>
      )}

      {hasCloseButton && (
        <Button
          variant="Ghost"
          size="XS"
          contentMode="Icon"
          icon="Icon/Line / X"
          aria-label="Cerrar aviso"
          onClick={onClose}
          className="shrink-0"
        />
      )}
    </div>
  );
}
