import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export interface FileUploadProps {
  isActive?: "No" | "Yes";
  label?: string;
  accept?: string;
  multiple?: boolean;
  hintLeft?: string;
  hintRight?: string;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  isActive = "No",
  label = "Subir archivos",
  accept,
  multiple = true,
  hintLeft = "PDF, PNG, JPG o SVG",
  hintRight = "Máx. 10 MB",
  onFilesSelected,
  className,
}: FileUploadProps) {
  const inputId = React.useId();
  const [dragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const active = isActive === "Yes" || dragging;

  const commitFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const next = multiple ? [...files, ...incoming] : [incoming[0]];
    setFiles(next);
    onFilesSelected?.(next);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && <span className="text-body-sm-medium text-surface-foreground">{label}</span>}

      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          commitFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center text-center p-6 gap-3 rounded-xl border-2 border-dashed transition-colors duration-150 cursor-pointer",
          "focus-within:border-surface-foreground focus-within:shadow-focus",
          active
            ? "border-surface-foreground bg-surface-muted/70"
            : "border-surface-border bg-surface-overlay/50 hover:bg-surface-muted/40"
        )}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => commitFiles(e.target.files)}
          className="sr-only"
        />

        <div className="size-10 rounded-xl bg-surface-background border border-surface-border shadow-sm flex items-center justify-center text-surface-foreground">
          <Icon name="Icon/Line / Upload-Cloud" size={20} />
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-body-sm-medium text-surface-foreground">
            Arrastra tus archivos o <span className="underline">explora en tu equipo</span>
          </p>
          <p className="text-body-xs-normal text-surface-foreground-muted">
            Se adjuntarán de forma segura al formulario
          </p>
        </div>
      </label>

      <div className="flex items-center justify-between text-body-xs-normal text-surface-foreground-muted">
        <span>{hintLeft}</span>
        <span>{hintRight}</span>
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-surface-muted/50 border border-surface-border text-body-xs-medium text-surface-foreground"
            >
              <span className="truncate">{file.name}</span>
              <span className="flex items-center gap-2 shrink-0 text-surface-foreground-muted tabular-nums">
                {formatBytes(file.size)}
                <button
                  type="button"
                  aria-label={`Quitar ${file.name}`}
                  onClick={() => {
                    const next = files.filter((_, i) => i !== idx);
                    setFiles(next);
                    onFilesSelected?.(next);
                  }}
                  className="hover:text-surface-foreground cursor-pointer"
                >
                  <Icon name="Icon/Line / X" size={14} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
