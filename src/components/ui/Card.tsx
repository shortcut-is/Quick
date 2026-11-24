import React from "react";
import { cn } from "@/lib/cn";
import { Badge, type BadgeTone } from "./Badge";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Default" | "Elevated" | "Interactive";
}

export function Card({ variant = "Default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-border bg-surface-background text-surface-foreground",
        variant === "Elevated" && "shadow-md",
        variant === "Interactive" &&
          "shadow-sm transition-[border-color,box-shadow,transform] duration-150 hover:border-surface-foreground/30 hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-body-lg-bold text-surface-foreground", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-body-sm-normal text-surface-foreground-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-end gap-2 p-5 pt-3 border-t border-surface-border/60", className)}
      {...props}
    />
  );
}

export interface StatCardProps {
  title: string;
  value: string;
  delta?: string;
  deltaTone?: BadgeTone;
  icon?: QuickIconName;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  delta,
  deltaTone = "Success",
  icon = "Icon/Line / Chart",
  subtitle,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-body-xs-medium text-surface-foreground-muted">{title}</span>
        <span className="size-8 rounded-lg bg-surface-muted flex items-center justify-center text-surface-foreground">
          <Icon name={icon} size={16} />
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-heading-2xl-bold text-surface-foreground tabular-nums">{value}</span>
        {delta && <Badge tone={deltaTone} label={delta} />}
      </div>
      {subtitle && <p className="text-body-xs-normal text-surface-foreground-muted">{subtitle}</p>}
    </Card>
  );
}

export type PromoCardSize = "SM" | "MD" | "LG";

export interface PromoCardProps {
  size?: PromoCardSize;
  badgeLabel?: string;
  badgeTone?: BadgeTone;
  hasBadge?: boolean;
  title: string;
  description?: string;
  meta?: string;
  hasMeta?: boolean;
  actionLabel?: string;
  hasFooter?: boolean;
  onAction?: () => void;
  className?: string;
}

const PROMO_CONTAINER_CLASSES: Record<PromoCardSize, string> = {
  SM: "p-4 gap-3 rounded-xl shadow-none",
  MD: "p-6 gap-4 rounded-2xl shadow-sm",
  LG: "p-8 gap-5 rounded-3xl shadow-md",
};

const PROMO_TITLE_CLASSES: Record<PromoCardSize, string> = {
  SM: "text-body-lg-bold",
  MD: "text-heading-xl-bold",
  LG: "text-heading-2xl-bold",
};

const PROMO_DESC_CLASSES: Record<PromoCardSize, string> = {
  SM: "text-body-sm-normal",
  MD: "text-body-sm-normal",
  LG: "text-body-base-normal",
};

const PROMO_META_CLASSES: Record<PromoCardSize, string> = {
  SM: "text-body-xs-normal",
  MD: "text-body-xs-normal",
  LG: "text-body-sm-normal",
};

export function PromoCard({
  size = "MD",
  badgeLabel = "Promo",
  badgeTone = "Bold",
  hasBadge = true,
  title,
  description,
  meta,
  hasMeta = true,
  actionLabel = "See how to use",
  hasFooter = true,
  onAction,
  className,
}: PromoCardProps) {
  return (
    <Card className={cn("flex flex-col", PROMO_CONTAINER_CLASSES[size], className)}>
      <div className="flex flex-col items-start gap-2">
        {hasBadge && badgeLabel && <Badge tone={badgeTone} label={badgeLabel} />}
        <h3 className={cn("text-surface-foreground", PROMO_TITLE_CLASSES[size])}>{title}</h3>
        {description && (
          <p className={cn("text-surface-foreground-muted", PROMO_DESC_CLASSES[size])}>{description}</p>
        )}
      </div>
      {hasFooter && (
        <div className="flex items-center justify-between gap-3 pt-1">
          {hasMeta && meta ? (
            <span className={cn("text-surface-foreground-muted", PROMO_META_CLASSES[size])}>{meta}</span>
          ) : (
            <span />
          )}
          <Button
            type="button"
            variant="Outline"
            size={size === "SM" ? "SM" : "MD"}
            onClick={onAction}
            className="shrink-0"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </Card>
  );
}
