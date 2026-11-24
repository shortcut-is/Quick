import React from "react";
import { cn } from "@/lib/cn";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface StepperProps {
  orientation?: "↓ Vertical" | "→ Horizontal";
  steps: StepItem[];
  activeStep: number;
  className?: string;
}

export function Stepper({
  orientation = "→ Horizontal",
  steps,
  activeStep,
  className,
}: StepperProps) {
  const isVertical = orientation === "↓ Vertical";

  return (
    <ol
      className={cn(
        "flex w-full",
        isVertical ? "flex-col gap-2" : "flex-row items-start justify-between gap-2",
        className
      )}
    >
      {steps.map((step, idx) => {
        const completed = idx < activeStep;
        const current = idx === activeStep;
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <li className={cn("flex gap-3", isVertical ? "items-start" : "items-center flex-col sm:flex-row text-center sm:text-left")}>
              <span
                aria-current={current ? "step" : undefined}
                className={cn(
                  "size-8 rounded-full flex items-center justify-center text-body-xs-medium font-bold tabular-nums shrink-0 transition-colors",
                  completed || current
                    ? "bg-primary-gradient text-primary-foreground"
                    : "bg-surface-background border border-surface-border text-surface-foreground-muted"
                )}
              >
                {completed ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>

              <div className="flex flex-col min-w-0">
                <span
                  className={cn(
                    "text-body-sm-medium",
                    completed || current ? "text-surface-foreground" : "text-surface-foreground-muted"
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-body-xs-normal text-surface-foreground-muted">
                    {step.description}
                  </span>
                )}
              </div>
            </li>

            {!isLast && (
              <div
                aria-hidden="true"
                className={cn(
                  "bg-surface-border shrink-0",
                  isVertical ? "w-px h-5 ml-4" : "hidden sm:block h-px flex-1 self-center mx-2",
                  completed && "bg-primary-top"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
