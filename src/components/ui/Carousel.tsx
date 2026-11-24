import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface CarouselProps<T> {
  layout?: "MobilePeek" | "WebCards" | "HeroBanner";
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function Carousel<T>({
  layout = "WebCards",
  items,
  renderItem,
  className,
}: CarouselProps<T>) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = (next: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    setActiveIndex(clamped);
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const width = el.clientWidth;
    if (width === 0) return;
    const approx = Math.round(el.scrollLeft / (el.scrollWidth / el.children.length));
    setActiveIndex(Math.max(0, Math.min(items.length - 1, approx)));
  };

  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="relative flex items-center gap-2">
        {layout !== "MobilePeek" && items.length > 1 && (
          <Button
            variant="Outline"
            size="SM"
            contentMode="Icon"
            icon="Icon/Line / Chevron-Left"
            aria-label="Anterior"
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="hidden sm:inline-flex shrink-0"
          />
        )}

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className={cn(
            "flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full pb-1 no-scrollbar"
          )}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "snap-start shrink-0",
                layout === "HeroBanner" && "w-full",
                layout === "MobilePeek" && "w-[82%]",
                layout === "WebCards" && "w-[85%] sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]"
              )}
            >
              {renderItem(item, idx)}
            </div>
          ))}
        </div>

        {layout !== "MobilePeek" && items.length > 1 && (
          <Button
            variant="Outline"
            size="SM"
            contentMode="Icon"
            icon="Icon/Line / Chevron-Right"
            aria-label="Siguiente"
            disabled={activeIndex === items.length - 1}
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="hidden sm:inline-flex shrink-0"
          />
        )}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5" role="tablist" aria-label="Diapositivas">
          {items.map((_, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Ir a elemento ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-150 cursor-pointer",
                  active ? "w-5 bg-primary-top" : "w-2 bg-surface-border hover:bg-surface-foreground/40"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
