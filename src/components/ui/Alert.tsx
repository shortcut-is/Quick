import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";

export type AlertVariant = "Neutral" | "Success" | "Warning" | "Danger";

export interface AlertProps {
  variant?: AlertVariant;
  hasIcon?: boolean;
  hasActions?: boolean;
  hasSecondaryAction?: boolean;
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

const VARIANT_STYLES: Record<AlertVariant, { container: string; iconColor: string; icon: QuickIconName }> = {
  Neutral: {
    container: "bg-surface-muted/45 border-surface-border text-surface-foreground",
    iconColor: "text-surface-foreground",
    icon: "Icon/Line / Info",
  },
  Success: {
    container: "bg-feedback-success-subtle border-feedback-success/30 text-surface-foreground",
    iconColor: "text-feedback-success",
    icon: "Icon/Line / Check-Circle",
  },
  Warning: {
    container: "bg-feedback-warning-subtle border-feedback-warning/35 text-surface-foreground",
    iconColor: "text-feedback-warning",
    icon: "Icon/Line / Alert-Triangle",
  },
  Danger: {
    container: "bg-feedback-danger-subtle border-feedback-danger/35 text-surface-foreground",
    iconColor: "text-feedback-danger",
    icon: "Icon/Line / Alert-circle",
  },
};

export function Alert({
  variant = "Neutral",
  hasIcon = true,
  hasActions = true,
  hasSecondaryAction = true,
  title = "Actualización del sistema disponible",
  description = "Una nueva versión de los tokens de diseño está lista para sincronizarse.",
  primaryActionLabel = "Actualizar",
  secondaryActionLabel = "Más tarde",
  onPrimaryAction,
  onSecondaryAction,
  className,
}: AlertProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role={variant === "Danger" || variant === "Warning" ? "alert" : "status"}
      className={cn("flex flex-col gap-3 p-4 rounded-2xl border", styles.container, className)}
    >
      <div className="flex items-start gap-3">
        {hasIcon && (
          <span className={cn("mt-0.5 shrink-0", styles.iconColor)}>
            <Icon name={styles.icon} size={18} />
          </span>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          {title && <h4 className="text-body-sm-bold text-surface-foreground">{title}</h4>}
          {description && <p className="text-body-sm-normal text-surface-foreground-muted">{description}</p>}
        </div>
      </div>

      {hasActions && (
        <div className="flex items-center justify-end gap-2 pt-1">
          {hasSecondaryAction && (
            <Button variant="Outline" size="XS" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            variant={variant === "Danger" ? "Destructive" : "Primary"}
            size="XS"
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
