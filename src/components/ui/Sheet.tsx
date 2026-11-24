import React from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Separator } from "./Separator";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: "Right (Web)" | "Bottom (Mobile)";
  variant?: "Default" | "Form" | "Filter";
  hasCloseButton?: boolean;
  hasDescription?: boolean;
  hasFooter?: boolean;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  position = "Right (Web)",
  variant = "Default",
  hasCloseButton = true,
  hasDescription = true,
  hasFooter = true,
  title = "Editar espacio de trabajo",
  description = "Actualiza los detalles y preferencias regionales.",
  cancelLabel,
  confirmLabel,
  onConfirm,
  children,
  className,
}: SheetProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descId = React.useId();
  const isBottom = position === "Bottom (Mobile)";

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

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

  const resolvedCancel = cancelLabel ?? (variant === "Filter" ? "Restablecer" : "Cancelar");
  const resolvedConfirm = confirmLabel ?? (variant === "Filter" ? "Aplicar filtros" : "Guardar");

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={hasDescription && description ? descId : undefined}
      onClose={handleClose}
      onPointerDown={handlePointerDown}
      className={cn(
        "quick-dialog",
        isBottom
          ? "fixed inset-x-0 bottom-0 top-auto mb-0 mt-auto mx-auto w-full max-w-[430px] max-h-[85dvh]"
          : "fixed inset-y-0 right-0 left-auto mr-0 ml-auto my-0 h-dvh max-h-dvh w-[calc(100vw-2rem)] max-w-[360px]",
        className
      )}
      {...({ closedby: "any" } as Record<string, unknown>)}
    >
      <div
        className={cn(
          "flex flex-col bg-surface-background text-surface-foreground border border-surface-border shadow-xl overflow-hidden",
          isBottom ? "rounded-t-2xl max-h-[85dvh]" : "rounded-l-2xl h-full"
        )}
      >
        {isBottom && (
          <div className="flex justify-center pt-2.5 pb-1 shrink-0">
            <span aria-hidden="true" className="w-10 h-1 rounded-full bg-surface-border" />
          </div>
        )}

        <div className="flex items-start justify-between gap-3 px-5 py-4 shrink-0">
          <div className="flex flex-col gap-1 min-w-0">
            <h2 id={titleId} className="text-body-lg-bold text-surface-foreground truncate">
              {title}
            </h2>
            {hasDescription && description && (
              <p id={descId} className="text-body-xs-normal text-surface-foreground-muted line-clamp-2">
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
              aria-label="Cerrar panel"
              onClick={() => dialogRef.current?.close("cancel")}
              className="shrink-0"
            />
          )}
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">{children}</div>

        {hasFooter && (
          <>
            <Separator />
            <div className={cn("flex items-center gap-2 px-5 py-4 shrink-0", isBottom ? "flex-col sm:flex-row" : "flex-wrap justify-end")}>
              <Button
                variant="Outline"
                size={isBottom ? "MD" : "SM"}
                onClick={() => dialogRef.current?.close("cancel")}
                className={isBottom ? "w-full" : undefined}
              >
                {resolvedCancel}
              </Button>
              <Button
                variant="Primary"
                size={isBottom ? "MD" : "SM"}
                onClick={() => {
                  onConfirm?.();
                  dialogRef.current?.close("confirm");
                }}
                className={isBottom ? "w-full" : undefined}
              >
                {resolvedConfirm}
              </Button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
