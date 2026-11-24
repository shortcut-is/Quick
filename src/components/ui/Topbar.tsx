import React from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Kbd } from "./Kbd";
import { Tabs, type TabItemOption } from "./Tabs";

export interface TopbarProps {
  variant?: "Desktop" | "DesktopTabs" | "MobileAppBar";
  brandName?: string;
  title?: string;
  tabs?: TabItemOption[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  onCommandClick?: () => void;
  onBackClick?: () => void;
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  userInitials?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Topbar({
  variant = "Desktop",
  brandName = "Quick v1.2",
  title,
  tabs = [],
  activeTab,
  onTabChange,
  onCommandClick,
  onBackClick,
  theme = "light",
  onThemeToggle,
  userInitials = "SV",
  actions,
  className,
}: TopbarProps) {
  if (variant === "MobileAppBar") {
    return (
      <header
        className={cn(
          "flex items-center justify-between h-14 px-4 border-b border-surface-border bg-surface-background/95 backdrop-blur-sm",
          className
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {onBackClick ? (
            <Button
              variant="Ghost"
              size="XS"
              contentMode="Icon"
              icon="Icon/Line / Chevron-Left"
              aria-label="Regresar"
              onClick={onBackClick}
            />
          ) : (
            <span className="size-8 rounded-lg bg-primary-gradient text-primary-foreground flex items-center justify-center shrink-0">
              <Icon name="Icon/Line / Zap" size={16} />
            </span>
          )}
          <span className="text-body-base-bold text-surface-foreground truncate">
            {title ?? brandName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onThemeToggle && (
            <Button
              variant="Ghost"
              size="XS"
              contentMode="Icon"
              icon={theme === "dark" ? "Icon/Line / Sun" : "Icon/Line / Moon"}
              aria-label="Cambiar tema"
              onClick={onThemeToggle}
            />
          )}
          {actions}
          <Avatar type="initials" size="24" initials={userInitials} />
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "flex flex-col border-b border-surface-border bg-surface-background/95 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="size-9 rounded-xl bg-primary-gradient text-primary-foreground flex items-center justify-center shrink-0">
            <Icon name="Icon/Line / Zap" size={18} />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-body-base-bold text-surface-foreground truncate">{brandName}</span>
            {title && (
              <span className="text-body-xs-normal text-surface-foreground-muted truncate">{title}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onCommandClick && (
            <button
              type="button"
              onClick={onCommandClick}
              aria-label="Abrir paleta de comandos"
              className="hidden sm:inline-flex items-center justify-between gap-4 h-9 px-3 rounded-lg border border-surface-border bg-surface-muted/40 hover:bg-surface-muted text-surface-foreground-muted hover:text-surface-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring"
            >
              <span className="inline-flex items-center gap-2 text-body-xs-normal">
                <Icon name="Icon/Line / Search" size={14} />
                <span>Buscar componente...</span>
              </span>
              <Kbd variant="Outline" size="SM" modifierKey="⌘" keyLabel="K" />
            </button>
          )}

          {onThemeToggle && (
            <Button
              variant="Outline"
              size="XS"
              hasLeftIcon
              leftIcon={theme === "dark" ? "Icon/Line / Sun" : "Icon/Line / Moon"}
              onClick={onThemeToggle}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
          )}

          {actions}
          <Avatar type="initials" size="32" initials={userInitials} />
        </div>
      </div>

      {variant === "DesktopTabs" && tabs.length > 0 && (
        <div className="px-4 sm:px-6">
          <Tabs items={tabs} value={activeTab} onValueChange={onTabChange} className="border-b-0" />
        </div>
      )}
    </header>
  );
}
