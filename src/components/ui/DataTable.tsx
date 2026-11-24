import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { CheckboxStandalone } from "./Checkbox";
import { Icon } from "./Icon";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "right";
  render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string }> {
  density?: "Compact" | "Normal" | "Relaxed";
  isSelectable?: boolean;
  hasActions?: boolean;
  columns: DataTableColumn<T>[];
  data: T[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onSort?: (key: string) => void;
  onRowAction?: (row: T) => void;
  footerSummary?: string;
  className?: string;
}

const CELL_PADDING: Record<NonNullable<DataTableProps<{ id: string }>["density"]>, string> = {
  Compact: "px-3 py-2",
  Normal: "px-4 py-3",
  Relaxed: "px-4 py-4",
};

export function DataTable<T extends { id: string }>({
  density = "Normal",
  isSelectable = true,
  hasActions = true,
  columns,
  data,
  selectedIds: controlledSelected,
  onSelectionChange,
  onSort,
  onRowAction,
  footerSummary,
  className,
}: DataTableProps<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>([]);
  const selected = controlledSelected ?? uncontrolled;

  const commit = (next: string[]) => {
    if (controlledSelected === undefined) setUncontrolled(next);
    onSelectionChange?.(next);
  };

  const allSelected = data.length > 0 && selected.length === data.length;
  const headerCheckState = allSelected
    ? "Checked"
    : selected.length > 0
      ? "Indeterminate"
      : "Unchecked";

  const toggleAll = () => {
    commit(allSelected ? [] : data.map((row) => row.id));
  };

  const toggleRow = (id: string) => {
    commit(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const pad = CELL_PADDING[density];

  return (
    <div className={cn("w-full rounded-2xl border border-surface-border bg-surface-background overflow-hidden", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-surface-border bg-surface-muted/40">
              {isSelectable && (
                <th className={cn("w-10", pad)}>
                  <CheckboxStandalone
                    aria-label="Seleccionar todas las filas"
                    checked={headerCheckState}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "text-body-xs-medium text-surface-foreground-muted whitespace-nowrap",
                    col.align === "right" && "text-right",
                    pad
                  )}
                >
                  {col.sortable && onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-surface-foreground cursor-pointer"
                    >
                      <span>{col.header}</span>
                      <Icon name="Icon/Line / Arrow-down-up" size={14} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
              {hasActions && <th className={cn("w-12 text-right", pad)} aria-label="Acciones" />}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const isChecked = selected.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-surface-border/70 last:border-b-0 transition-colors",
                    isChecked ? "bg-surface-muted/50" : "hover:bg-surface-muted/30"
                  )}
                >
                  {isSelectable && (
                    <td className={pad}>
                      <CheckboxStandalone
                        aria-label={`Seleccionar fila ${row.id}`}
                        checked={isChecked ? "Checked" : "Unchecked"}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "text-body-sm-normal text-surface-foreground",
                        col.align === "right" && "text-right tabular-nums",
                        pad
                      )}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                  {hasActions && (
                    <td className={cn("text-right", pad)}>
                      <Button
                        variant="Ghost"
                        size="XS"
                        contentMode="Icon"
                        icon="Icon/Line / More-Horizontal"
                        aria-label={`Acciones de fila ${row.id}`}
                        onClick={() => onRowAction?.(row)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {(footerSummary || isSelectable) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-surface-border bg-surface-muted/20 text-body-xs-normal text-surface-foreground-muted">
          <span>
            {footerSummary ?? `${selected.length} de ${data.length} fila(s) seleccionada(s)`}
          </span>
        </div>
      )}
    </div>
  );
}
