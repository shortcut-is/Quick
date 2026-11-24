import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface CalendarProps {
  variant?: "Default";
  mode?: "single" | "range";
  selected?: Date | null;
  range?: DateRangeValue;
  month?: Date;
  onSelect?: (date: Date) => void;
  onRangeSelect?: (range: DateRangeValue) => void;
  disabledDates?: (date: Date) => boolean;
  className?: string;
}

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function isSameDay(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function Calendar({
  variant = "Default",
  mode = "single",
  selected: controlledSelected,
  range: controlledRange,
  month: controlledMonth,
  onSelect,
  onRangeSelect,
  disabledDates,
  className,
}: CalendarProps) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [internalSelected, setInternalSelected] = React.useState<Date | null>(controlledSelected ?? today);
  const [internalRange, setInternalRange] = React.useState<DateRangeValue>(
    controlledRange ?? { from: null, to: null }
  );
  const [viewDate, setViewDate] = React.useState<Date>(() => {
    const base = controlledMonth ?? controlledSelected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  React.useEffect(() => {
    if (controlledMonth) {
      setViewDate(new Date(controlledMonth.getFullYear(), controlledMonth.getMonth(), 1));
    }
  }, [controlledMonth]);

  const activeSelected = controlledSelected !== undefined ? controlledSelected : internalSelected;
  const activeRange = controlledRange !== undefined ? controlledRange : internalRange;

  const year = viewDate.getFullYear();
  const monthIdx = viewDate.getMonth();
  const firstWeekday = new Date(year, monthIdx, 1).getDay();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const prevMonthDays = new Date(year, monthIdx, 0).getDate();

  const cells: Array<{ date: Date; outside: boolean }> = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, monthIdx - 1, prevMonthDays - i), outside: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, monthIdx, d), outside: false });
  }
  const trailing = (7 - (cells.length % 7)) % 7;
  for (let d = 1; d <= trailing; d++) {
    cells.push({ date: new Date(year, monthIdx + 1, d), outside: true });
  }

  const handleDayClick = (date: Date) => {
    const clean = startOfDay(date);
    if (disabledDates?.(clean)) return;

    if (mode === "single") {
      if (controlledSelected === undefined) setInternalSelected(clean);
      onSelect?.(clean);
      return;
    }

    const from = activeRange.from ? startOfDay(activeRange.from) : null;
    const to = activeRange.to ? startOfDay(activeRange.to) : null;
    let next: DateRangeValue;
    if (!from || (from && to)) {
      next = { from: clean, to: null };
    } else if (clean.getTime() < from.getTime()) {
      next = { from: clean, to: from };
    } else {
      next = { from, to: clean };
    }
    if (controlledRange === undefined) setInternalRange(next);
    onRangeSelect?.(next);
  };

  return (
    <div
      data-variant={variant}
      className={cn(
        "w-full max-w-[312px] p-4 rounded-xl bg-surface-background border border-surface-border shadow-md select-none",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <Button
          variant="Ghost"
          size="XS"
          contentMode="Icon"
          icon="Icon/Line / Chevron-Left"
          aria-label="Mes anterior"
          onClick={() => setViewDate(new Date(year, monthIdx - 1, 1))}
        />
        <div className="text-body-sm-medium text-surface-foreground">
          {MONTHS[monthIdx]} <span className="tabular-nums">{year}</span>
        </div>
        <Button
          variant="Ghost"
          size="XS"
          contentMode="Icon"
          icon="Icon/Line / Chevron-Right"
          aria-label="Mes siguiente"
          onClick={() => setViewDate(new Date(year, monthIdx + 1, 1))}
        />
      </div>

      <div className="grid grid-cols-7 mb-1.5">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-body-xs-normal text-surface-foreground-muted"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map(({ date, outside }) => {
          const clean = startOfDay(date);
          const isDisabled = Boolean(disabledDates?.(clean));
          const isToday = isSameDay(clean, today);
          const isSingleSelected = mode === "single" && isSameDay(clean, activeSelected);
          const isRangeStart = mode === "range" && isSameDay(clean, activeRange.from);
          const isRangeEnd = mode === "range" && isSameDay(clean, activeRange.to);
          const isInRange =
            mode === "range" &&
            activeRange.from &&
            activeRange.to &&
            clean.getTime() > startOfDay(activeRange.from).getTime() &&
            clean.getTime() < startOfDay(activeRange.to).getTime();

          const isAnchor = isSingleSelected || isRangeStart || isRangeEnd;

          return (
            <button
              key={clean.toISOString()}
              type="button"
              disabled={isDisabled}
              aria-pressed={isAnchor || undefined}
              onClick={() => handleDayClick(clean)}
              className={cn(
                "h-9 w-full flex items-center justify-center text-body-sm-normal tabular-nums transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring",
                isAnchor
                  ? "bg-primary-gradient text-primary-foreground font-medium rounded-full"
                  : isInRange
                    ? "bg-surface-muted text-surface-foreground"
                    : cn(
                        "rounded-full hover:bg-surface-muted",
                        outside ? "text-surface-foreground-muted/50" : "text-surface-foreground"
                      ),
                isToday && !isAnchor && "ring-1 ring-surface-foreground/40 font-medium",
                isDisabled && "opacity-35 pointer-events-none"
              )}
            >
              {clean.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
