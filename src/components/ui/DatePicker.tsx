import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { Calendar, type DateRangeValue } from "./Calendar";
import { TimePicker, type TimePickerValue } from "./TimePicker";

export interface DatePickerProps {
  variant?: "Single" | "Range" | "DateTime";
  state?: "Default" | "Filled";
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  placeholder?: string;
  value?: Date | null;
  rangeValue?: DateRangeValue;
  timeValue?: TimePickerValue;
  onValueChange?: (date: Date) => void;
  onRangeChange?: (range: DateRangeValue) => void;
  onTimeChange?: (time: TimePickerValue) => void;
  disabled?: boolean;
  className?: string;
}

function formatDate(d: Date | null | undefined) {
  if (!d) return "";
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}

export function DatePicker({
  variant = "Single",
  state = "Default",
  label,
  hasLabel = true,
  hint,
  hasHint = true,
  placeholder,
  value: controlledValue,
  rangeValue: controlledRange,
  timeValue: controlledTime,
  onValueChange,
  onRangeChange,
  onTimeChange,
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | null>(controlledValue ?? null);
  const [internalRange, setInternalRange] = React.useState<DateRangeValue>(
    controlledRange ?? { from: null, to: null }
  );
  const [internalTime, setInternalTime] = React.useState<TimePickerValue>(
    controlledTime ?? { hours: "09", minutes: "00", period: "AM" }
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerId = React.useId();

  const activeDate = controlledValue !== undefined ? controlledValue : internalDate;
  const activeRange = controlledRange !== undefined ? controlledRange : internalRange;
  const activeTime = controlledTime ?? internalTime;

  React.useEffect(() => {
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  let displayText = "";
  if (variant === "Range") {
    if (activeRange.from && activeRange.to) {
      displayText = `${formatDate(activeRange.from)} – ${formatDate(activeRange.to)}`;
    } else if (activeRange.from) {
      displayText = `${formatDate(activeRange.from)} – ...`;
    }
  } else if (variant === "DateTime") {
    if (activeDate) {
      displayText = `${formatDate(activeDate)}, ${activeTime.hours}:${activeTime.minutes} ${activeTime.period ?? "AM"}`;
    }
  } else if (activeDate) {
    displayText = formatDate(activeDate);
  }

  const isFilled = Boolean(displayText) || state === "Filled";
  const resolvedPlaceholder =
    placeholder ??
    (variant === "Range"
      ? "Seleccionar rango de fechas"
      : variant === "DateTime"
        ? "Fecha y hora"
        : "Seleccionar fecha");

  return (
    <div ref={containerRef} className={cn("relative flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && label && (
        <label htmlFor={triggerId} className="text-body-sm-medium text-surface-foreground">
          {label}
        </label>
      )}

      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center justify-between h-11 px-3.5 gap-2 rounded-lg bg-surface-background text-left transition-shadow duration-150 cursor-pointer",
          "focus:outline-none",
          open
            ? "border-2 border-surface-foreground shadow-focus"
            : "border border-surface-input focus-visible:border-2 focus-visible:border-surface-foreground focus-visible:shadow-focus",
          disabled && "opacity-55 cursor-not-allowed bg-surface-muted/60"
        )}
      >
        <span
          className={cn(
            "text-body-base-normal truncate",
            isFilled && displayText ? "text-surface-foreground" : "text-surface-foreground-muted"
          )}
        >
          {displayText || resolvedPlaceholder}
        </span>
        <Icon name="Icon/Line / Calendar" size={18} className="text-surface-foreground-muted shrink-0" />
      </button>

      {hasHint && hint && (
        <span className="text-body-xs-normal text-surface-foreground-muted">{hint}</span>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={label ?? "Selector de fecha"}
          className="absolute left-0 top-full mt-1.5 z-50 flex flex-col gap-3 rounded-xl bg-surface-background border border-surface-border shadow-md p-2"
        >
          <Calendar
            mode={variant === "Range" ? "range" : "single"}
            selected={activeDate}
            range={activeRange}
            onSelect={(d) => {
              if (controlledValue === undefined) setInternalDate(d);
              onValueChange?.(d);
              if (variant === "Single") setOpen(false);
            }}
            onRangeSelect={(r) => {
              if (controlledRange === undefined) setInternalRange(r);
              onRangeChange?.(r);
              if (r.from && r.to) setOpen(false);
            }}
            className="border-0 shadow-none p-2"
          />
          {variant === "DateTime" && (
            <div className="px-2 pb-2 pt-2 border-t border-surface-border">
              <TimePicker
                format="12h"
                value={activeTime}
                onChange={(t) => {
                  if (controlledTime === undefined) setInternalTime(t);
                  onTimeChange?.(t);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
