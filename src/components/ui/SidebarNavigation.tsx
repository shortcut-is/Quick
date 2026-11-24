import { cn } from "@/lib/cn";
import { Avatar } from "./Avatar";
import { Icon, type QuickIconName } from "./Icon";
import { Separator } from "./Separator";
import { SwitchStandalone } from "./Switch";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: QuickIconName;
  badge?: string;
}

export interface SidebarNavigationProps {
  mode?: "Expanded" | "Collapsed";
  hasModeSwitch?: boolean;
  hasWorkspaceGroup?: boolean;
  brandName?: string;
  items: SidebarNavItem[];
  workspaceItems?: SidebarNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  testMode?: boolean;
  onTestModeChange?: (val: boolean) => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  className?: string;
}

export function SidebarNavigation({
  mode = "Expanded",
  hasModeSwitch = true,
  hasWorkspaceGroup = true,
  brandName = "Quick",
  items,
  workspaceItems = [],
  activeId,
  onSelect,
  testMode = false,
  onTestModeChange,
  userName = "Stephany Villegas",
  userRole = "Design Systems",
  userInitials = "SV",
  className,
}: SidebarNavigationProps) {
  const collapsed = mode === "Collapsed";

  const renderGroup = (entries: SidebarNavItem[]) =>
    entries.map((item) => {
      const active = item.id === activeId;
      return (
        <button
          key={item.id}
          type="button"
          title={collapsed ? item.label : undefined}
          aria-current={active ? "page" : undefined}
          onClick={() => onSelect(item.id)}
          className={cn(
            "flex items-center gap-3 w-full h-10 rounded-lg text-body-sm-medium transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
            collapsed ? "justify-center px-0" : "px-3 justify-between",
            active
              ? "bg-surface-muted text-surface-foreground"
              : "bg-surface-transparent text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted/50"
          )}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <Icon name={item.icon} size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </span>
          {!collapsed && item.badge && (
            <span className="px-1.5 py-0.5 rounded-full bg-surface-background border border-surface-border text-body-xs-medium text-surface-foreground-muted tabular-nums">
              {item.badge}
            </span>
          )}
        </button>
      );
    });

  return (
    <aside
      aria-label="Navegación lateral"
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-surface-border bg-surface-background p-3 gap-4 shrink-0 transition-[width] duration-150",
        collapsed ? "w-[72px]" : "w-[248px]",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className={cn("flex items-center gap-2.5 px-1.5 py-1", collapsed && "justify-center px-0")}>
          <span className="size-8 rounded-lg bg-primary-gradient text-primary-foreground flex items-center justify-center shrink-0">
            <Icon name="Icon/Line / Zap" size={16} />
          </span>
          {!collapsed && (
            <span className="text-body-base-bold text-surface-foreground truncate">{brandName}</span>
          )}
        </div>

        <Separator />

        <nav className="flex flex-col gap-1">{renderGroup(items)}</nav>

        {hasWorkspaceGroup && workspaceItems.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-1">
              {!collapsed && (
                <span className="px-3 py-1 text-body-xs-medium text-surface-foreground-muted">
                  Workspace
                </span>
              )}
              {renderGroup(workspaceItems)}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {hasModeSwitch && !collapsed && (
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-surface-muted/60 border border-surface-border/70">
            <div className="flex flex-col min-w-0">
              <span className="text-body-xs-medium text-surface-foreground">Modo Sandbox</span>
              <span className="text-body-xs-normal text-surface-foreground-muted">Datos simulados</span>
            </div>
            <SwitchStandalone
              size="Small"
              aria-label="Alternar modo sandbox"
              selected={testMode ? "On" : "Off"}
              onSelectedChange={(next) => onTestModeChange?.(next === "On")}
            />
          </div>
        )}

        <Separator />

        <div className={cn("flex items-center gap-2.5 px-1.5 py-1", collapsed && "justify-center px-0")}>
          <Avatar type="initials" size="32" initials={userInitials} />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-body-xs-medium text-surface-foreground truncate">{userName}</span>
              <span className="text-body-xs-normal text-surface-foreground-muted truncate">{userRole}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
