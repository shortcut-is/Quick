import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";
import { Kbd } from "./Kbd";
import { Separator } from "./Separator";

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  icon?: QuickIconName;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  use?: "Default" | "Grouped" | "Empty";
  hasFooter?: boolean;
  items: CommandItem[];
  placeholder?: string;
  enableShortcut?: boolean;
}

export function CommandPalette({
  open,
  onOpenChange,
  use = "Grouped",
  hasFooter = true,
  items,
  placeholder = "Buscar comandos, tokens o componentes...",
  enableShortcut = true,
}: CommandPaletteProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    if (!enableShortcut) return;
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [enableShortcut, open, onOpenChange]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setActiveIdx(0);
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    if (use === "Empty") return [];
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || (i.group && i.group.toLowerCase().includes(q))
    );
  }, [items, query, use]);

  const handleClose = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.currentTarget.returnValue = "";
    if (open) onOpenChange(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const outside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (outside) dialog.close("dismiss");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((idx) => (idx + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((idx) => (idx - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIdx]?.onSelect();
      dialogRef.current?.close("select");
    }
  };

  const groups = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const key = item.group ?? "Acciones";
      map.set(key, [...(map.get(key) ?? []), item]);
    });
    return Array.from(map.entries());
  }, [filtered]);

  let flatCounter = -1;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Paleta de comandos"
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      className="quick-dialog w-[calc(100vw-2rem)] max-w-[540px]"
      {...({ closedby: "any" } as Record<string, unknown>)}
    >
      <div className="flex flex-col rounded-2xl border border-surface-border bg-surface-background text-surface-foreground shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 h-13">
          <Icon name="Icon/Line / Search" size={18} className="text-surface-foreground-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label="Buscar comando"
            className="w-full min-w-0 bg-surface-transparent text-body-base-normal text-surface-foreground placeholder:text-surface-foreground-muted focus:outline-none"
          />
          <Kbd variant="Subtle" size="SM" hasModifier={false} keyLabel="ESC" />
        </div>

        <Separator />

        <div className="max-h-72 overflow-y-auto p-2 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-body-sm-normal text-surface-foreground-muted">
              No se encontraron comandos para "{query}".
            </div>
          ) : use === "Grouped" ? (
            groups.map(([group, entries]) => (
              <div key={group} className="flex flex-col gap-0.5">
                <div className="px-2.5 py-1 text-body-xs-medium text-surface-foreground-muted">
                  {group}
                </div>
                {entries.map((item) => {
                  flatCounter += 1;
                  const isActive = flatCounter === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.onSelect();
                        dialogRef.current?.close("select");
                      }}
                      className={cn(
                        "flex items-center justify-between gap-3 w-full px-2.5 py-2 rounded-lg text-left text-body-sm-normal transition-colors cursor-pointer",
                        isActive ? "bg-surface-muted text-surface-foreground" : "hover:bg-surface-muted/60"
                      )}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        {item.icon && (
                          <Icon name={item.icon} size={16} className="text-surface-foreground-muted shrink-0" />
                        )}
                        <span className="truncate">{item.label}</span>
                      </span>
                      {item.shortcut && <Kbd variant="Outline" size="SM" hasModifier={false} keyLabel={item.shortcut} />}
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onSelect();
                  dialogRef.current?.close("select");
                }}
                className={cn(
                  "flex items-center justify-between gap-3 w-full px-2.5 py-2 rounded-lg text-left text-body-sm-normal transition-colors cursor-pointer",
                  idx === activeIdx ? "bg-surface-muted text-surface-foreground" : "hover:bg-surface-muted/60"
                )}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  {item.icon && <Icon name={item.icon} size={16} className="text-surface-foreground-muted shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.shortcut && <Kbd variant="Outline" size="SM" hasModifier={false} keyLabel={item.shortcut} />}
              </button>
            ))
          )}
        </div>

        {hasFooter && (
          <>
            <Separator />
            <div className="flex items-center justify-between px-4 py-2.5 text-body-xs-normal text-surface-foreground-muted bg-surface-muted/25">
              <span>Usa ↑ ↓ para navegar y Enter para ejecutar</span>
              <span className="flex items-center gap-1">
                <Kbd variant="Subtle" size="SM" modifierKey="⌘" keyLabel="K" />
              </span>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
