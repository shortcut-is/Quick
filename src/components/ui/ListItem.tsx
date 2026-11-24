import React from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { Badge, type BadgeTone } from "./Badge";
import { Icon, type QuickIconName } from "./Icon";

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: QuickIconName;
  avatarSrc?: string;
  avatarInitials?: string;
  badgeLabel?: string;
  badgeTone?: BadgeTone;
  meta?: string;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  leadingIcon,
  avatarSrc,
  avatarInitials,
  badgeLabel,
  badgeTone = "Subtle",
  meta,
  trailing,
  showChevron = false,
  selected = false,
  onClick,
  className,
}: ListItemProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 w-full px-3.5 py-3 rounded-xl text-left transition-colors duration-150",
        onClick && "cursor-pointer hover:bg-surface-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
        selected ? "bg-surface-muted border border-surface-border" : "border border-transparent",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {(avatarSrc || avatarInitials) && (
          <Avatar
            size="32"
            type={avatarSrc ? "image" : "initials"}
            src={avatarSrc}
            initials={avatarInitials}
          />
        )}
        {leadingIcon && !avatarSrc && !avatarInitials && (
          <div className="size-9 rounded-lg bg-surface-muted flex items-center justify-center text-surface-foreground shrink-0">
            <Icon name={leadingIcon} size={18} />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-body-sm-medium text-surface-foreground truncate">{title}</span>
          {subtitle && (
            <span className="text-body-xs-normal text-surface-foreground-muted truncate">{subtitle}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badgeLabel && <Badge tone={badgeTone} label={badgeLabel} />}
        {meta && <span className="text-body-xs-medium text-surface-foreground tabular-nums">{meta}</span>}
        {trailing}
        {showChevron && <Icon name="Icon/Line / Chevron-Right" size={16} className="text-surface-foreground-muted" />}
      </div>
    </Component>
  );
}
