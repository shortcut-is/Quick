import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon, type QuickIconName } from "./Icon";
import { Kbd } from "./Kbd";

export interface DropdownMenuEntry {
  id: string;
  label: string;
  icon?: QuickIconName;
  shortcut?: string;
  destructive?: boolean;
  groupTitle?: string;
  separatorBefore?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  variant?: "Actions" | "Grouped" | "Context";
  triggerLabel?: string;
  triggerIcon?: QuickIconName;
  items: DropdownMenuEntry[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  variant = "Actions",
  triggerLabel = "Acciones",
  triggerIcon = "Icon/Line / More-Horizontal",
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const closeMenu = React.useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  React.useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, [open]);

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
      return;
    }

    if ("focusGroup" in HTMLElement.prototype) return;
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []
    );
    if (menuItems.length === 0) return;

    const currentIdx = menuItems.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      menuItems[(currentIdx + 1) % menuItems.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      menuItems[(currentIdx - 1 + menuItems.length) % menuItems.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      menuItems[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      menuItems[menuItems.length - 1]?.focus();
    }
  };

  return (
    <div ref={containerRef} data-variant={variant} className={cn("relative inline-block", className)}>
      <Button
        ref={triggerRef}
        variant="Outline"
        size="SM"
        contentMode={triggerLabel ? "Label" : "Icon"}
        icon={!triggerLabel ? triggerIcon : undefined}
        hasLeftIcon={Boolean(triggerLabel)}
        leftIcon={triggerLabel ? triggerIcon : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={!triggerLabel ? "Abrir menú" : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {triggerLabel ? <span>{triggerLabel}</span> : null}
      </Button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute z-50 mt-1.5 min-w-[210px] rounded-xl border border-surface-border bg-surface-background p-1.5 shadow-lg flex flex-col gap-0.5",
            align === "right" ? "right-0" : "left-0"
          )}
          {...({ focusgroup: "menu nomemory" } as Record<string, unknown>)}
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {item.separatorBefore && <hr className="my-1 border-surface-border" />}
              {item.groupTitle && (
                <div className="px-2.5 py-1 text-body-xs-medium text-surface-foreground-muted">
                  {item.groupTitle}
                </div>
              )}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onSelect?.();
                  closeMenu(true);
                }}
                className={cn(
                  "flex items-center justify-between gap-3 w-full px-2.5 py-2 rounded-lg text-left text-body-sm-normal transition-colors cursor-pointer",
                  "focus:outline-none focus:bg-surface-muted hover:bg-surface-muted",
                  item.destructive ? "text-feedback-danger" : "text-surface-foreground"
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  {item.icon && <Icon name={item.icon} size={16} className="shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.shortcut && <Kbd variant="Subtle" size="SM" hasModifier={false} keyLabel={item.shortcut} />}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
