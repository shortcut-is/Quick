import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Tag, TagGroup } from "./Tag";

export interface SearchFilterChip {
  id: string;
  label: string;
}

export interface SearchFilterBarProps {
  viewport?: "Desktop" | "Mobile";
  state?: "Default" | "ActiveFilters";
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  activeFilters?: SearchFilterChip[];
  onRemoveFilter?: (id: string) => void;
  onFilterClick?: () => void;
  onClearAll?: () => void;
  className?: string;
}

export function SearchFilterBar({
  viewport = "Desktop",
  state,
  query,
  onQueryChange,
  placeholder = "Buscar por nombre o estado...",
  activeFilters = [],
  onRemoveFilter,
  onFilterClick,
  onClearAll,
  className,
}: SearchFilterBarProps) {
  const showFilters = state === "ActiveFilters" || activeFilters.length > 0;
  const isMobile = viewport === "Mobile";

  return (
    <div className={cn("flex flex-col gap-2.5 w-full", className)}>
      <div className={cn("flex items-center gap-2", isMobile ? "w-full" : "justify-between")}>
        <div
          className={cn(
            "flex items-center h-11 px-3 gap-2 rounded-lg border border-surface-input bg-surface-background flex-1",
            "focus-within:border-2 focus-within:border-surface-foreground focus-within:shadow-focus transition-shadow duration-150"
          )}
        >
          <Icon name="Icon/Line / Search" size={18} className="text-surface-foreground-muted shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="w-full min-w-0 bg-surface-transparent text-body-base-normal text-surface-foreground placeholder:text-surface-foreground-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => onQueryChange("")}
              className="text-surface-foreground-muted hover:text-surface-foreground cursor-pointer"
            >
              <Icon name="Icon/Line / X" size={16} />
            </button>
          )}
        </div>

        <Button
          variant="Outline"
          size="SM"
          hasLeftIcon
          leftIcon="Icon/Line / Filter"
          onClick={onFilterClick}
          className="h-11 shrink-0"
        >
          Filtros{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}
        </Button>
      </div>

      {showFilters && activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <TagGroup>
            {activeFilters.map((f) => (
              <Tag
                key={f.id}
                label={f.label}
                isDismissible
                onDismiss={() => onRemoveFilter?.(f.id)}
              />
            ))}
          </TagGroup>
          {onClearAll && (
            <Button variant="Ghost" size="XS" onClick={onClearAll}>
              Limpiar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
