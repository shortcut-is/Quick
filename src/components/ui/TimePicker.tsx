import React from "react";
import { cn } from "@/lib/cn";

export interface TimePickerValue {
  hours: string;
  minutes: string;
  seconds?: string;
  period?: "AM" | "PM";
}

export interface TimePickerProps {
  format?: "24h" | "12h";
  state?: "Default" | "Filled";
  label?: string;
  value?: TimePickerValue;
  defaultValue?: TimePickerValue;
  onChange?: (value: TimePickerValue) => void;
  error?: boolean;
  hint?: string;
  className?: string;
}

function sanitizeSegment(raw: string, max: number) {
  const digits = raw.replace(/\D/g, "").slice(0, 2);
  if (!digits) return "";
  const num = Math.min(max, Number(digits));
  return String(num);
}

function padSegment(raw: string, fallback = "00") {
  if (!raw) return fallback;
  return raw.padStart(2, "0");
}

export function TimePicker({
  format = "24h",
  state = "Default",
  label,
  value: controlledValue,
  defaultValue,
  onChange,
  error = false,
  hint,
  className,
}: TimePickerProps) {
  const [internal, setInternal] = React.useState<TimePickerValue>(
    defaultValue ?? {
      hours: format === "12h" ? "09" : "14",
      minutes: "30",
      seconds: "00",
      period: "AM",
    }
  );
  const current = controlledValue ?? internal;
  const maxHour = format === "12h" ? 12 : 23;

  const update = (patch: Partial<TimePickerValue>) => {
    const next = { ...current, ...patch };
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  const segmentClass = cn(
    "w-12 h-11 rounded-lg text-center text-body-base-bold tabular-nums bg-surface-background text-surface-foreground transition-shadow duration-150 focus:outline-none",
    error
      ? "border-2 border-feedback-danger"
      : "border border-surface-input focus:border-2 focus:border-surface-foreground focus:shadow-focus"
  );

  return (
    <div data-state={state} className={cn("inline-flex flex-col gap-1.5", className)}>
      {label && <span className="text-body-sm-medium text-surface-foreground">{label}</span>}

      <div className="inline-flex items-center gap-1.5">
        <input
          type="text"
          inputMode="numeric"
          aria-label="Horas"
          maxLength={2}
          value={current.hours}
          onChange={(e) => update({ hours: sanitizeSegment(e.target.value, maxHour) })}
          onBlur={() => update({ hours: padSegment(current.hours, format === "12h" ? "12" : "00") })}
          className={segmentClass}
        />
        <span aria-hidden="true" className="text-body-base-bold text-surface-foreground-muted">
          :
        </span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Minutos"
          maxLength={2}
          value={current.minutes}
          onChange={(e) => update({ minutes: sanitizeSegment(e.target.value, 59) })}
          onBlur={() => update({ minutes: padSegment(current.minutes) })}
          className={segmentClass}
        />

        {format === "24h" ? (
          <>
            <span aria-hidden="true" className="text-body-base-bold text-surface-foreground-muted">
              :
            </span>
            <input
              type="text"
              inputMode="numeric"
              aria-label="Segundos"
              maxLength={2}
              value={current.seconds ?? "00"}
              onChange={(e) => update({ seconds: sanitizeSegment(e.target.value, 59) })}
              onBlur={() => update({ seconds: padSegment(current.seconds ?? "00") })}
              className={segmentClass}
            />
          </>
        ) : (
          <div className="inline-flex flex-col rounded-lg border border-surface-border bg-surface-muted p-0.5 ml-1">
            {(["AM", "PM"] as const).map((period) => {
              const active = (current.period ?? "AM") === period;
              return (
                <button
                  key={period}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ period })}
                  className={cn(
                    "px-2 py-0.5 rounded-md text-body-xs-medium transition-colors cursor-pointer",
                    active
                      ? "bg-surface-background text-surface-foreground shadow-sm"
                      : "text-surface-foreground-muted hover:text-surface-foreground"
                  )}
                >
                  {period}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {hint && (
        <span className={cn("text-body-xs-normal", error ? "text-feedback-danger" : "text-surface-foreground-muted")}>
          {hint}
        </span>
      )}
    </div>
  );
}
