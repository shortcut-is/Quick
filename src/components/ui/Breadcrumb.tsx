import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbEntry[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-1.5", className)}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              <li className="inline-flex items-center">
                {isLast ? (
                  <span aria-current="page" className="text-body-sm-medium text-surface-foreground">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className="text-body-sm-normal text-surface-foreground-muted hover:text-surface-foreground transition-colors rounded-md px-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="text-body-sm-normal text-surface-foreground-muted hover:text-surface-foreground transition-colors rounded-md px-1 -mx-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring"
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="text-surface-foreground-muted flex items-center">
                  <Icon name="Icon/Line / Chevron-Right-Small" size={14} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
