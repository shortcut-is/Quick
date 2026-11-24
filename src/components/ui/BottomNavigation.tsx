import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export interface BottomNavItem {
  id: string;
  label: string;
  icon: QuickIconName;
  badge?: string;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function BottomNavigation({
  items,
  activeId,
  onSelect,
  className,
}: BottomNavigationProps) {
  return (
    <nav
      aria-label="Navegación inferior"
      className={cn(
        "flex items-center justify-around w-full px-2 py-1.5 border-t border-surface-border bg-surface-background/95 backdrop-blur-sm",
        className
      )}
    >
      {items.slice(0, 5).map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onSelect(item.id)}
            className={cn(
              "relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] px-2 py-1 rounded-xl transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
              active
                ? "text-surface-foreground font-medium"
                : "text-surface-foreground-muted hover:text-surface-foreground"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center px-3 py-1 rounded-full transition-colors",
                active && "bg-surface-muted"
              )}
            >
              <Icon name={item.icon} size={18} />
            </span>
            <span className="text-body-xs-medium leading-none">{item.label}</span>
            {item.badge && (
              <span className="absolute top-1 right-2.5 min-w-4 h-4 px-1 rounded-full bg-feedback-danger text-feedback-foreground text-[10px] font-bold flex items-center justify-center tabular-nums">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
