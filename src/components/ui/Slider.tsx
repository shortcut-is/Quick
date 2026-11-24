import React from "react";
import { cn } from "@/lib/cn";

export type SliderProgressPreset = "0 %" | "25 %" | "50 %" | "75 %" | "100 %";

const PRESET_MAP: Record<SliderProgressPreset, number> = {
  "0 %": 0,
  "25 %": 25,
  "50 %": 50,
  "75 %": 75,
  "100 %": 100,
};

export interface SliderProps {
  progress?: SliderProgressPreset;
  hasKnob?: boolean;
  hasTooltip?: boolean;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  formatValue?: (value: number) => string;
  className?: string;
}

export function Slider({
  progress,
  hasKnob = true,
  hasTooltip = false,
  label,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  disabled = false,
  onValueChange,
  formatValue = (v) => `${v}%`,
  className,
}: SliderProps) {
  const id = React.useId();
  const initial = defaultValue ?? (progress ? PRESET_MAP[progress] : 50);
  const [uncontrolled, setUncontrolled] = React.useState(initial);
  const [hovered, setHovered] = React.useState(false);

  const current = controlledValue ?? uncontrolled;
  const clamped = Math.min(max, Math.max(min, current));
  const pct = max === min ? 0 : ((clamped - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (controlledValue === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <div className="flex items-center justify-between text-body-sm-medium text-surface-foreground">
          <label htmlFor={id}>{label}</label>
          <span className="text-body-xs-medium text-surface-foreground-muted tabular-nums">
            {formatValue(clamped)}
          </span>
        </div>
      )}

      <div
        className={cn("relative flex items-center h-6 w-full select-none", disabled && "opacity-45")}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="relative h-2 w-full rounded-full bg-surface-input overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-gradient transition-[width] duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>

        {hasKnob && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${pct}%` }}
          >
            {(hasTooltip || hovered) && (
              <span className="mb-1.5 -mt-8 px-2 py-0.5 rounded-md bg-surface-invert-background text-surface-invert-foreground text-body-xs-medium tabular-nums shadow-sm whitespace-nowrap">
                {formatValue(clamped)}
              </span>
            )}
            <span className="size-4 rounded-full bg-surface-background border-2 border-primary-bottom shadow-sm" />
          </div>
        )}

        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={clamped}
          disabled={disabled}
          onChange={handleChange}
          aria-label={label ?? "Slider"}
          className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
