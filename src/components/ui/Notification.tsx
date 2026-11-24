import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";

export type NotificationType = "Neutral" | "Success" | "Warning" | "Danger";

export interface NotificationProps {
  type?: NotificationType;
  hasAction?: boolean;
  isDismissible?: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const TYPE_STYLES: Record<NotificationType, { border: string; iconColor: string; icon: QuickIconName }> = {
  Neutral: { border: "border-surface-border bg-surface-background", iconColor: "text-surface-foreground", icon: "Icon/Line / Info" },
  Success: { border: "border-feedback-success/35 bg-feedback-success-subtle", iconColor: "text-feedback-success", icon: "Icon/Line / Check-Circle" },
  Warning: { border: "border-feedback-warning/35 bg-feedback-warning-subtle", iconColor: "text-feedback-warning", icon: "Icon/Line / Alert-Triangle" },
  Danger: { border: "border-feedback-danger/35 bg-feedback-danger-subtle", iconColor: "text-feedback-danger", icon: "Icon/Line / Alert-circle" },
};

export function Notification({
  type = "Neutral",
  hasAction = true,
  isDismissible = true,
  title = "Transferencia completada",
  description = "Se enviaron $2,450.00 MXN a la cuenta termina en 4821.",
  actionLabel = "Ver recibo",
  onAction,
  onDismiss,
  className,
}: NotificationProps) {
  const styles = TYPE_STYLES[type];

  return (
    <div
      role="region"
      aria-label={title}
      className={cn("flex items-start gap-3 p-4 rounded-2xl border shadow-sm", styles.border, className)}
    >
      <span className={cn("mt-0.5 shrink-0", styles.iconColor)}>
        <Icon name={styles.icon} size={18} />
      </span>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex flex-col gap-0.5">
          <p className="text-body-sm-bold text-surface-foreground">{title}</p>
          {description && <p className="text-body-xs-normal text-surface-foreground-muted">{description}</p>}
        </div>
        {hasAction && (
          <div>
            <Button variant="Outline" size="XS" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        )}
      </div>

      {isDismissible && (
        <Button
          variant="Ghost"
          size="XS"
          contentMode="Icon"
          icon="Icon/Line / X"
          aria-label="Cerrar notificación"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
