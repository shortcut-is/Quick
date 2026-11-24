import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPrevNextLabels?: boolean;
  className?: string;
}

function buildPageList(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "ellipsis"> = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) pages.push(p);
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNextLabels = true,
  className,
}: PaginationProps) {
  const pages = buildPageList(currentPage, totalPages);

  return (
    <nav aria-label="Paginación" className={cn("inline-flex items-center gap-1 flex-wrap", className)}>
      <Button
        variant="Ghost"
        size="XS"
        hasLeftIcon
        leftIcon="Icon/Line / Chevron-Left"
        disabled={currentPage <= 1}
        aria-label="Página anterior"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        {showPrevNextLabels ? "Anterior" : ""}
      </Button>

      {pages.map((entry, idx) =>
        entry === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            aria-hidden="true"
            className="px-2 text-body-xs-normal text-surface-foreground-muted select-none"
          >
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-current={entry === currentPage ? "page" : undefined}
            onClick={() => onPageChange(entry)}
            className={cn(
              "min-w-8 h-8 px-2 rounded-lg text-body-xs-medium tabular-nums transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
              entry === currentPage
                ? "bg-primary-gradient text-primary-foreground shadow-sm"
                : "text-surface-foreground-muted hover:text-surface-foreground hover:bg-surface-muted"
            )}
          >
            {entry}
          </button>
        )
      )}

      <Button
        variant="Ghost"
        size="XS"
        hasRightIcon
        rightIcon="Icon/Line / Chevron-Right"
        disabled={currentPage >= totalPages}
        aria-label="Página siguiente"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        {showPrevNextLabels ? "Siguiente" : ""}
      </Button>
    </nav>
  );
}
