import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "Default" | "Destructive" | "Form";
  size?: "SM" | "MD";
  hasCloseButton?: boolean;
  hasDescription?: boolean;
  hasFooter?: boolean;
  hasSecondaryAction?: boolean;
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  variant = "Default",
  size = "SM",
  hasCloseButton = true,
  hasDescription = true,
  hasFooter = true,
  hasSecondaryAction = true,
  title = "Confirmar acción",
  description = "Revisa los detalles antes de continuar.",
  primaryActionLabel,
  secondaryActionLabel = "Cancelar",
  onPrimaryAction,
  onSecondaryAction,
  children,
  className,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();
  const descId = React.useId();
  const isDestructive = variant === "Destructive";

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      if (isDestructive) {
        requestAnimationFrame(() => cancelRef.current?.focus());
      }
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, isDestructive]);

  const handleClose = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.currentTarget.returnValue = "";
    if (open) onOpenChange(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const outside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (outside) dialog.close("dismiss");
  };

  const resolvedPrimaryLabel =
    primaryActionLabel ?? (isDestructive ? "Eliminar" : variant === "Form" ? "Guardar cambios" : "Confirmar");

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={hasDescription && description ? descId : undefined}
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      className={cn(
        "quick-dialog w-[calc(100vw-2rem)]",
        size === "MD" ? "max-w-[460px]" : "max-w-[380px]",
        className
      )}
      {...({ closedby: "any" } as Record<string, unknown>)}
    >
      <div className="flex flex-col gap-4 p-6 rounded-2xl border border-surface-border bg-surface-background text-surface-foreground shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 id={titleId} className="text-body-lg-bold text-surface-foreground">
              {title}
            </h2>
            {hasDescription && description && (
              <p id={descId} className="text-body-sm-normal text-surface-foreground-muted">
                {description}
              </p>
            )}
          </div>
          {hasCloseButton && (
            <Button
              variant="Ghost"
              size="XS"
              contentMode="Icon"
              icon="Icon/Line / X"
              aria-label="Cerrar diálogo"
              onClick={() => dialogRef.current?.close("cancel")}
              className="shrink-0 -mr-1 -mt-1"
            />
          )}
        </div>

        {children && <div className="flex flex-col gap-3">{children}</div>}

        {hasFooter && (
          <div className="flex items-center justify-end gap-2 pt-2">
            {hasSecondaryAction && (
              <Button
                ref={cancelRef}
                variant="Outline"
                size="SM"
                autoFocus={isDestructive}
                onClick={() => {
                  onSecondaryAction?.();
                  dialogRef.current?.close("cancel");
                }}
              >
                {secondaryActionLabel}
              </Button>
            )}
            <Button
              variant={isDestructive ? "Destructive" : "Primary"}
              size="SM"
              onClick={() => {
                onPrimaryAction?.();
                dialogRef.current?.close("confirm");
              }}
            >
              {resolvedPrimaryLabel}
            </Button>
          </div>
        )}
      </div>
    </dialog>
  );
}
