import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";

export interface EmptyStateProps {
  variant?: "Default" | "Search" | "Error";
  size?: "SM" | "MD";
  hasIcon?: boolean;
  hasActions?: boolean;
  hasSecondaryAction?: boolean;
  title?: string;
  description?: string;
  icon?: QuickIconName;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

const DEFAULT_ICONS: Record<NonNullable<EmptyStateProps["variant"]>, QuickIconName> = {
  Default: "Icon/Line / Archive",
  Search: "Icon/Line / Search",
  Error: "Icon/Line / Alert-Triangle",
};

export function EmptyState({
  variant = "Default",
  size = "SM",
  hasIcon = true,
  hasActions = true,
  hasSecondaryAction = true,
  title = "Aún no hay proyectos",
  description = "Comienza creando tu primer espacio de trabajo con tokens del sistema.",
  icon,
  primaryActionLabel = "Crear proyecto",
  secondaryActionLabel = "Explorar plantillas",
  onPrimaryAction,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  const isMD = size === "MD";
  const resolvedIcon = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-surface-border bg-surface-overlay/40",
        isMD ? "p-10 gap-5" : "p-6 gap-4",
        className
      )}
    >
      {hasIcon && (
        <div
          className={cn(
            "rounded-2xl border border-surface-border bg-surface-background shadow-sm flex items-center justify-center",
            variant === "Error" ? "text-feedback-danger" : "text-surface-foreground",
            isMD ? "size-14" : "size-11"
          )}
        >
          <Icon name={resolvedIcon} size={isMD ? 24 : 20} />
        </div>
      )}

      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className={cn(isMD ? "text-heading-xl-bold" : "text-body-base-bold", "text-surface-foreground")}>
          {title}
        </h3>
        <p className="text-body-sm-normal text-surface-foreground-muted">{description}</p>
      </div>

      {hasActions && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {hasSecondaryAction && (
            <Button variant="Outline" size="SM" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
          <Button variant="Primary" size="SM" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
