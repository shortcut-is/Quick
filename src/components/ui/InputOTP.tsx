import React from "react";
import { cn } from "@/lib/cn";

export interface InputOTPProps {
  digits?: "4" | "6";
  state?: "Default" | "Focus" | "Filled" | "Error";
  label?: string;
  hasLabel?: boolean;
  hint?: string;
  hasHint?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
}

export function InputOTP({
  digits = "6",
  state = "Default",
  label = "Código de verificación",
  hasLabel = true,
  hint = "Ingresa el código enviado a tu correo o SMS.",
  hasHint = true,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onComplete,
  className,
}: InputOTPProps) {
  const length = Number(digits);
  const [internal, setInternal] = React.useState(defaultValue);
  const current = (controlledValue ?? internal).slice(0, length);

  // Maintain synchronous latest value across rapid keystrokes before parent re-renders.
  const latestRef = React.useRef(current);
  const lastPropRef = React.useRef(controlledValue);
  if (controlledValue !== lastPropRef.current) {
    lastPropRef.current = controlledValue;
    latestRef.current = (controlledValue ?? internal).slice(0, length);
  }

  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const [focusedIdx, setFocusedIdx] = React.useState<number | null>(null);
  const hintId = React.useId();
  const isError = state === "Error";

  const commitSlots = (slots: string[]) => {
    const clean = slots
      .slice(0, length)
      .map((c) => c.replace(/\D/g, "").slice(0, 1))
      .join("");
    latestRef.current = clean;
    if (controlledValue === undefined) setInternal(clean);
    onChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  const handleCellChange = (idx: number, raw: string) => {
    const base = latestRef.current;
    const prevCell = base[idx] ?? "";
    const slots = Array.from({ length }, (_, i) => base[i] ?? "");
    const digitsOnly = raw.replace(/\D/g, "");

    if (!digitsOnly) {
      slots[idx] = "";
      commitSlots(slots);
      return;
    }

    let inserted = digitsOnly;
    if (prevCell && digitsOnly.length > 1) {
      inserted = digitsOnly.startsWith(prevCell)
        ? digitsOnly.slice(prevCell.length)
        : digitsOnly.slice(-1);
    }

    const incoming = inserted.split("");
    incoming.forEach((ch, offset) => {
      if (idx + offset < length) slots[idx + offset] = ch;
    });

    commitSlots(slots);
    const nextFocus = Math.min(length - 1, idx + incoming.length);
    refs.current[nextFocus]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !latestRef.current[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      refs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      refs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    commitSlots(pasted.split(""));
    const focusIdx = Math.min(pasted.length, length - 1);
    refs.current[focusIdx]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {hasLabel && <span className="text-body-sm-medium text-surface-foreground">{label}</span>}
      <div className="flex items-center gap-2">
        {Array.from({ length }).map((_, idx) => {
          const val = current[idx] ?? "";
          const isFocused = focusedIdx === idx;
          return (
            <React.Fragment key={idx}>
              {digits === "6" && idx === 3 && (
                <span className="w-2.5 h-0.5 rounded-full bg-surface-foreground-muted shrink-0" aria-hidden="true" />
              )}
              <input
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={idx === 0 ? "one-time-code" : undefined}
                value={val}
                aria-label={`Dígito ${idx + 1} de ${length}`}
                aria-invalid={isError || undefined}
                aria-describedby={hasHint ? hintId : undefined}
                placeholder="•"
                onFocus={() => setFocusedIdx(idx)}
                onBlur={() => setFocusedIdx(null)}
                onChange={(e) => handleCellChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={cn(
                  "w-12 h-14 text-center rounded-lg text-heading-xl-bold transition-shadow duration-150 focus:outline-none",
                  isError
                    ? "bg-feedback-danger-subtle border-2 border-feedback-danger text-feedback-danger"
                    : isFocused
                      ? "bg-surface-background border-2 border-surface-foreground text-surface-foreground shadow-focus"
                      : val
                        ? "bg-surface-background border border-surface-foreground text-surface-foreground"
                        : "bg-surface-background border border-surface-input text-surface-foreground placeholder:text-surface-foreground-muted"
                )}
              />
            </React.Fragment>
          );
        })}
      </div>
      {hasHint && (
        <p id={hintId} className={cn("text-body-xs-normal", isError ? "text-feedback-danger" : "text-surface-foreground-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
}
