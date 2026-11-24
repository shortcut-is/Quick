import React from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { Badge, type BadgeTone } from "./Badge";
import { Icon, type QuickIconName } from "./Icon";
import { Radio, type RadioState } from "./RadioButton";

export type ListItemLeading = "Avatar" | "Radio" | "Icon" | "None";
export type ListItemState = "Default" | "Hover" | "Selected" | "Disabled";

export interface ListItemProps {
  title: string;
  subtitle?: string;
  hasDescription?: boolean;
  leading?: ListItemLeading;
  state?: ListItemState;
  leadingIcon?: QuickIconName;
  avatarSrc?: string;
  avatarInitials?: string;
  badgeLabel?: string;
  badgeTone?: BadgeTone;
  meta?: string;
  hasMeta?: boolean;
  hasTrailingRadio?: boolean;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  hasChevron?: boolean;
  selected?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  hasDescription = true,
  leading,
  state,
  leadingIcon,
  avatarSrc,
  avatarInitials,
  badgeLabel,
  badgeTone = "Subtle",
  meta,
  hasMeta = true,
  hasTrailingRadio = false,
  trailing,
  showChevron = false,
  hasChevron,
  selected,
  disabled = false,
  name,
  value,
  onClick,
  className,
}: ListItemProps) {
  const resolvedState: ListItemState =
    state ?? (disabled ? "Disabled" : selected ? "Selected" : "Default");
  const isSelected = Boolean(selected || resolvedState === "Selected");
  const isHover = resolvedState === "Hover";
  const isDisabled = Boolean(disabled || resolvedState === "Disabled");
  const isRadioMode = leading === "Radio" || hasTrailingRadio;
  const radioState: RadioState = isDisabled ? "Disabled" : isHover ? "Hover" : "Default";
  const resolvedChevron = hasChevron ?? showChevron;
  const resolvedLeading: ListItemLeading =
    leading ?? (avatarSrc || avatarInitials ? "Avatar" : leadingIcon ? "Icon" : "None");
  const radioInputId = React.useId();

  if (isRadioMode) {
    return (
      <label
        htmlFor={radioInputId}
        aria-disabled={isDisabled || undefined}
        className={cn(
          "flex items-center justify-between gap-3 w-full px-3.5 py-3 rounded-xl text-left transition-colors duration-150 select-none",
          !isDisabled && "cursor-pointer hover:bg-surface-muted/55 focus-within:ring-2 focus-within:ring-surface-ring",
          isSelected
            ? "bg-surface-muted border border-surface-border"
            : isHover
              ? "bg-surface-muted/55 border border-transparent"
              : "border border-transparent",
          isDisabled && "opacity-45 pointer-events-none cursor-not-allowed",
          className
        )}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {resolvedLeading === "Avatar" && (
            <Avatar
              size="32"
              type={avatarSrc ? "image" : "initials"}
              src={avatarSrc}
              initials={avatarInitials ?? "SV"}
            />
          )}
          {resolvedLeading === "Radio" && (
            <Radio
              id={radioInputId}
              name={name}
              value={value}
              selected={isSelected ? "On" : "Off"}
              state={radioState}
              disabled={isDisabled}
              onChange={onClick}
            />
          )}
          {resolvedLeading === "Icon" && (
            <div className="size-9 rounded-lg bg-surface-muted border border-surface-border flex items-center justify-center text-surface-foreground shrink-0">
              <Icon name={leadingIcon ?? "Icon/Line / User"} size={18} />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-body-sm-medium text-surface-foreground truncate">{title}</span>
            {hasDescription && subtitle && (
              <span className="text-body-xs-normal text-surface-foreground-muted truncate">{subtitle}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {badgeLabel && <Badge tone={badgeTone} label={badgeLabel} />}
          {hasMeta && meta && (
            <span className="text-body-xs-medium text-surface-foreground tabular-nums">{meta}</span>
          )}
          {hasTrailingRadio && (
            <Radio
              id={resolvedLeading === "Radio" ? undefined : radioInputId}
              name={name}
              value={value}
              selected={isSelected ? "On" : "Off"}
              state={radioState}
              disabled={isDisabled}
              onChange={resolvedLeading === "Radio" ? undefined : onClick}
            />
          )}
          {trailing}
          {resolvedChevron && (
            <Icon name="Icon/Line / Chevron-Right" size={16} className="text-surface-foreground-muted" />
          )}
        </div>
      </label>
    );
  }

  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      onClick={!isDisabled ? onClick : undefined}
      className={cn(
        "flex items-center justify-between gap-3 w-full px-3.5 py-3 rounded-xl text-left transition-colors duration-150",
        onClick &&
          !isDisabled &&
          "cursor-pointer hover:bg-surface-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
        isSelected
          ? "bg-surface-muted border border-surface-border"
          : isHover
            ? "bg-surface-muted/55 border border-transparent"
            : "border border-transparent",
        isDisabled && "opacity-45 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {resolvedLeading === "Avatar" && (
          <Avatar
            size="32"
            type={avatarSrc ? "image" : "initials"}
            src={avatarSrc}
            initials={avatarInitials ?? "SV"}
          />
        )}
        {resolvedLeading === "Icon" && (
          <div className="size-9 rounded-lg bg-surface-muted border border-surface-border flex items-center justify-center text-surface-foreground shrink-0">
            <Icon name={leadingIcon ?? "Icon/Line / User"} size={18} />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-body-sm-medium text-surface-foreground truncate">{title}</span>
          {hasDescription && subtitle && (
            <span className="text-body-xs-normal text-surface-foreground-muted truncate">{subtitle}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {badgeLabel && <Badge tone={badgeTone} label={badgeLabel} />}
        {hasMeta && meta && (
          <span className="text-body-xs-medium text-surface-foreground tabular-nums">{meta}</span>
        )}
        {trailing}
        {resolvedChevron && (
          <Icon name="Icon/Line / Chevron-Right" size={16} className="text-surface-foreground-muted" />
        )}
      </div>
    </Component>
  );
}
