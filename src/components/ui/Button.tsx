import React from "react";
import { cn } from "@/lib/cn";
import { Icon, type QuickIconName } from "./Icon";

export type ButtonVariant = "Primary" | "Outline" | "Ghost" | "Destructive";
export type ButtonSize = "LG" | "MD" | "SM" | "XS";
export type ButtonContentMode = "Label" | "Icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  contentMode?: ButtonContentMode;
  hasLeftIcon?: boolean;
  leftIcon?: QuickIconName | React.ReactNode;
  hasRightIcon?: boolean;
  rightIcon?: QuickIconName | React.ReactNode;
  icon?: QuickIconName | React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  Primary:
    "bg-primary-gradient text-primary-foreground border border-transparent hover:opacity-95 active:scale-[0.98]",
  Outline:
    "bg-surface-background text-surface-foreground border border-surface-border shadow-sm hover:bg-surface-muted/60 active:scale-[0.98]",
  Ghost:
    "bg-surface-transparent text-surface-foreground border border-transparent hover:bg-surface-muted/70 active:scale-[0.98]",
  Destructive:
    "bg-feedback-danger text-feedback-foreground border border-transparent hover:opacity-90 active:scale-[0.98]",
};

const LABEL_SIZE_CLASSES: Record<ButtonSize, string> = {
  XS: "h-7 px-2.5 text-body-xs-medium rounded-md gap-1.5",
  SM: "h-10 px-4 text-body-sm-medium rounded-lg gap-2",
  MD: "h-11 px-5 text-body-sm-medium rounded-xl gap-2",
  LG: "h-12 px-6 text-body-base-medium rounded-xl gap-2.5",
};

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  XS: "size-7 rounded-md",
  SM: "size-10 rounded-full",
  MD: "size-12 rounded-full",
  LG: "size-14 rounded-full",
};

const ICON_PX: Record<ButtonSize, number> = {
  XS: 14,
  SM: 18,
  MD: 20,
  LG: 22,
};

function renderSlotIcon(
  slot: QuickIconName | React.ReactNode | undefined,
  fallback: QuickIconName,
  sizePx: number
) {
  if (!slot) return <Icon name={fallback} size={sizePx} />;
  if (typeof slot === "string") return <Icon name={slot} size={sizePx} />;
  return slot;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "Primary",
    size = "SM",
    contentMode = "Label",
    hasLeftIcon = false,
    leftIcon,
    hasRightIcon = false,
    rightIcon,
    icon,
    disabled = false,
    type = "button",
    className,
    children,
    ...props
  },
  ref
) {
  const iconPx = ICON_PX[size];

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium select-none transition-[background-color,opacity,transform,box-shadow] duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-ring focus-visible:shadow-focus",
        "disabled:opacity-45 disabled:pointer-events-none disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        contentMode === "Icon" ? ICON_SIZE_CLASSES[size] : LABEL_SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {contentMode === "Icon" ? (
        children ?? renderSlotIcon(icon ?? leftIcon, "Icon/Line / Plus", iconPx)
      ) : (
        <>
          {(hasLeftIcon || Boolean(leftIcon)) &&
            renderSlotIcon(leftIcon, "Icon/Line / Command", iconPx)}
          {children}
          {(hasRightIcon || Boolean(rightIcon)) &&
            renderSlotIcon(rightIcon, "Icon/Line / Chevron-Right", iconPx)}
        </>
      )}
    </button>
  );
});
