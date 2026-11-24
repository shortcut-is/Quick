import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Separator } from "./Separator";
import { Tag } from "./Tag";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  mode?: "Single" | "Multi";
  label?: string;
  hasLabel?: boolean;
  placeholder?: string;
  options: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}

export function Combobox({
  mode = "Single",
  label,
  hasLabel = true,
  placeholder = "Seleccionar opción...",
  options,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultValue);
  const selected = controlledValue ?? uncontrolled;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listId = React.useId();

  React.useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  const commit = (next: string[]) => {
    if (controlledValue === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const toggleOption = (val: string) => {
    if (mode === "Single") {
      commit([val]);
      setOpen(false);
    } else {
      commit(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
    }
  };

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const selectedLabels = options.filter((o) => selected.includes(o.value));

  return (
    <div ref={containerRef} className={cn("relative flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && label && <span className="text-body-sm-medium text-surface-foreground">{label}</span>}

      <div
        role="combobox"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={cn(
          "flex items-center justify-between min-h-11 px-3 py-1.5 gap-2 rounded-lg bg-surface-background cursor-pointer transition-shadow duration-150 focus:outline-none",
          open
            ? "border-2 border-surface-foreground shadow-focus"
            : "border border-surface-input focus-visible:border-2 focus-visible:border-surface-foreground focus-visible:shadow-focus"
        )}
      >
        <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
          {selectedLabels.length === 0 ? (
            <span className="text-body-base-normal text-surface-foreground-muted truncate">{placeholder}</span>
          ) : mode === "Single" ? (
            <span className="text-body-base-normal text-surface-foreground truncate">{selectedLabels[0].label}</span>
          ) : (
            selectedLabels.map((opt) => (
              <Tag
                key={opt.value}
                label={opt.label}
                isDismissible
                onDismiss={() => commit(selected.filter((v) => v !== opt.value))}
              />
            ))
          )}
        </div>
        <Icon
          name={open ? "Icon/Line / Chevron-Up" : "Icon/Line / Chevron-Down"}
          size={18}
          className="text-surface-foreground-muted shrink-0"
        />
      </div>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-multiselectable={mode === "Multi" || undefined}
          className="absolute top-full left-0 right-0 mt-1.5 z-40 rounded-xl bg-surface-background border border-surface-border shadow-lg p-1.5 flex flex-col gap-1"
        >
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Icon name="Icon/Line / Search" size={16} className="text-surface-foreground-muted shrink-0" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation();
                  setOpen(false);
                }
              }}
              placeholder="Buscar opción..."
              className="w-full bg-surface-transparent text-body-sm-normal text-surface-foreground placeholder:text-surface-foreground-muted focus:outline-none"
            />
          </div>
          <Separator />
          <div className="max-h-56 overflow-y-auto flex flex-col gap-0.5">
            {filtered.length === 0 ? (
              <p className="px-2 py-3 text-center text-body-xs-normal text-surface-foreground-muted">
                Sin coincidencias
              </p>
            ) : (
              filtered.map((opt) => {
                const isSel = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onClick={() => toggleOption(opt.value)}
                    className={cn(
                      "flex items-center gap-2 w-full px-2.5 py-2 rounded-md text-left text-body-sm-normal transition-colors cursor-pointer",
                      isSel
                        ? "bg-surface-muted text-surface-foreground font-medium"
                        : "text-surface-foreground hover:bg-surface-muted/60"
                    )}
                  >
                    {mode === "Multi" && (
                      <span
                        className={cn(
                          "inline-flex items-center justify-center size-4 rounded border shrink-0",
                          isSel
                            ? "bg-surface-foreground border-surface-foreground text-surface-background"
                            : "bg-surface-background border-surface-input"
                        )}
                      >
                        {isSel && <span className="text-[10px] leading-none">✓</span>}
                      </span>
                    )}
                    <span className="flex-1 truncate">{opt.label}</span>
                    {mode === "Single" && isSel && (
                      <Icon name="Icon/Line / Check-Circle" size={16} className="text-surface-foreground shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
