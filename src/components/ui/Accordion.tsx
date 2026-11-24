import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface AccordionItemProps {
  id?: string;
  title: string;
  state?: "Open" | "Closed";
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  id: providedId,
  title,
  state,
  defaultOpen = false,
  onToggle,
  children,
  className,
}: AccordionItemProps) {
  const autoId = React.useId();
  const contentId = `${providedId ?? autoId}-panel`;
  const [internal, setInternal] = React.useState(state ? state === "Open" : defaultOpen);
  const isOpen = state !== undefined ? state === "Open" : internal;

  const toggle = () => {
    const next = !isOpen;
    if (state === undefined) setInternal(next);
    onToggle?.(next);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-border bg-surface-background overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className="flex items-center justify-between w-full px-4 py-3.5 text-left gap-3 hover:bg-surface-muted/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring"
      >
        <span className="text-body-sm-medium text-surface-foreground min-w-0 flex-1 line-clamp-2">{title}</span>
        <Icon
          name="Icon/Line / Chevron-Down"
          size={18}
          className={cn(
            "text-surface-foreground-muted shrink-0 transition-transform duration-150",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          id={contentId}
          className="px-4 pb-4 pt-1 text-body-sm-normal text-surface-foreground-muted border-t border-surface-border/50"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionEntry {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionEntry[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(defaultOpenIds);

  const handleToggle = (id: string, nextOpen: boolean) => {
    if (allowMultiple) {
      setOpenIds((prev) => (nextOpen ? [...prev, id] : prev.filter((x) => x !== id)));
    } else {
      setOpenIds(nextOpen ? [id] : []);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2.5 w-full", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          state={openIds.includes(item.id) ? "Open" : "Closed"}
          onToggle={(next) => handleToggle(item.id, next)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
