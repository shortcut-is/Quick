import React from "react";
import { cn } from "@/lib/cn";

export type AvatarType = "image" | "initials" | "Letter";
export type AvatarSize = "24" | "32" | "40";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AvatarType;
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  "24": "size-6 text-body-xs-medium",
  "32": "size-8 text-body-xs-medium",
  "40": "size-10 text-body-sm-medium",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { type = "initials", size = "32", src, alt = "Avatar", initials = "SV", className, ...props },
  ref
) {
  const display = type === "Letter" ? initials.slice(0, 1).toUpperCase() : initials.slice(0, 2).toUpperCase();

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-surface-muted text-surface-foreground border border-surface-border select-none",
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {type === "image" && src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <span aria-label={alt}>{display}</span>
      )}
    </div>
  );
});

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{ id: string; alt: string; initials?: string; src?: string }>;
  size?: AvatarSize;
  maxVisible?: number;
}

export function AvatarGroup({
  avatars,
  size = "32",
  maxVisible = 4,
  className,
  ...props
}: AvatarGroupProps) {
  const visible = avatars.slice(0, maxVisible);
  const overflow = Math.max(0, avatars.length - visible.length);

  return (
    <div className={cn("inline-flex items-center -space-x-2", className)} {...props}>
      {visible.map((av) => (
        <Avatar
          key={av.id}
          type={av.src ? "image" : "initials"}
          size={size}
          src={av.src}
          alt={av.alt}
          initials={av.initials ?? av.alt.slice(0, 2)}
          className="ring-2 ring-surface-background"
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-surface-muted text-surface-foreground border border-surface-border ring-2 ring-surface-background font-medium",
            SIZE_CLASSES[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
