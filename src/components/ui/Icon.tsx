import React from "react";
import { cn } from "@/lib/cn";

export type QuickIconName =
  | "Icon/Line / AI"
  | "Icon/Line / Alert-Triangle"
  | "Icon/Line / Alert-circle"
  | "Icon/Line / Archive"
  | "Icon/Line / Arrow-Left"
  | "Icon/Line / Arrow-Right"
  | "Icon/Line / Arrow-down"
  | "Icon/Line / Arrow-down-up"
  | "Icon/Line / Arrow-up"
  | "Icon/Line / Arrow-up-right"
  | "Icon/Line / Bell"
  | "Icon/Line / Bookmark"
  | "Icon/Line / Calendar"
  | "Icon/Line / Chart"
  | "Icon/Line / Check-Circle"
  | "Icon/Line / Chevron-Down"
  | "Icon/Line / Chevron-Down-Small"
  | "Icon/Line / Chevron-Left"
  | "Icon/Line / Chevron-Left-Small"
  | "Icon/Line / Chevron-Right"
  | "Icon/Line / Chevron-Right-Small"
  | "Icon/Line / Chevron-Up"
  | "Icon/Line / Chevron-Up-Small"
  | "Icon/Line / Clipboard"
  | "Icon/Line / Columns"
  | "Icon/Line / Command"
  | "Icon/Line / Copy"
  | "Icon/Line / Credit-card"
  | "Icon/Line / Dashboard"
  | "Icon/Line / Database"
  | "Icon/Line / Dollar-Sign"
  | "Icon/Line / Download"
  | "Icon/Line / Edit"
  | "Icon/Line / External-Link"
  | "Icon/Line / File-text"
  | "Icon/Line / Filter"
  | "Icon/Line / Globe"
  | "Icon/Line / Grid"
  | "Icon/Line / Heart"
  | "Icon/Line / Info"
  | "Icon/Line / Layout"
  | "Icon/Line / Link"
  | "Icon/Line / List"
  | "Icon/Line / Loader"
  | "Icon/Line / Log-out"
  | "Icon/Line / Mail"
  | "Icon/Line / Map-pin"
  | "Icon/Line / Message-square"
  | "Icon/Line / Moon"
  | "Icon/Line / More-Horizontal"
  | "Icon/Line / More-Vertical"
  | "Icon/Line / Play"
  | "Icon/Line / Plus"
  | "Icon/Line / Refresh-cw"
  | "Icon/Line / Rows"
  | "Icon/Line / Search"
  | "Icon/Line / Settings"
  | "Icon/Line / Share"
  | "Icon/Line / Shield"
  | "Icon/Line / Sun"
  | "Icon/Line / Tag"
  | "Icon/Line / Trash"
  | "Icon/Line / Upload-Cloud"
  | "Icon/Line / User"
  | "Icon/Line / Users"
  | "Icon/Line / X"
  | "Icon/Line / Zap"
  | "Currency / Dollar (USD)"
  | "Currency / Euro (EUR)"
  | "Flag / Mexico"
  | "Flag / Canada"
  | "Flag / Colombia";

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Verified icon identifier from src/design-tokens/icons.json */
  name: QuickIconName | (string & {});
  size?: number;
}

const STROKE_PATHS: Record<string, React.ReactNode> = {
  "Icon/Line / AI": (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "Icon/Line / Alert-Triangle": (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  "Icon/Line / Alert-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </>
  ),
  "Icon/Line / Archive": (
    <>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4" />
    </>
  ),
  "Icon/Line / Arrow-Left": <path d="M19 12H5M12 19l-7-7 7-7" />,
  "Icon/Line / Arrow-Right": <path d="M5 12h14M12 5l7 7-7 7" />,
  "Icon/Line / Arrow-down": <path d="M12 5v14M19 12l-7 7-7-7" />,
  "Icon/Line / Arrow-up": <path d="M12 19V5M5 12l7-7 7 7" />,
  "Icon/Line / Arrow-down-up": <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />,
  "Icon/Line / Arrow-up-right": <path d="M7 17 17 7M7 7h10v10" />,
  "Icon/Line / Bell": (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  "Icon/Line / Bookmark": <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />,
  "Icon/Line / Calendar": (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  "Icon/Line / Chart": <path d="M3 3v18h18M7 16v-4M12 16V8M17 16v-6" />,
  "Icon/Line / Check-Circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "Icon/Line / Chevron-Down": <path d="m6 9 6 6 6-6" />,
  "Icon/Line / Chevron-Down-Small": <path d="m8 10 4 4 4-4" />,
  "Icon/Line / Chevron-Left": <path d="m15 18-6-6 6-6" />,
  "Icon/Line / Chevron-Left-Small": <path d="m14 8-4 4 4 4" />,
  "Icon/Line / Chevron-Right": <path d="m9 18 6-6-6-6" />,
  "Icon/Line / Chevron-Right-Small": <path d="m10 8 4 4-4 4" />,
  "Icon/Line / Chevron-Up": <path d="m18 15-6-6-6 6" />,
  "Icon/Line / Chevron-Up-Small": <path d="m8 14 4-4 4 4" />,
  "Icon/Line / Clipboard": (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </>
  ),
  "Icon/Line / Columns": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16" />
    </>
  ),
  "Icon/Line / Command": (
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
  ),
  "Icon/Line / Copy": (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  "Icon/Line / Credit-card": (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  "Icon/Line / Dashboard": (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  "Icon/Line / Database": (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  "Icon/Line / Dollar-Sign": <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  "Icon/Line / Download": <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  "Icon/Line / Edit": <path d="M12 20h9M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" />,
  "Icon/Line / External-Link": <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />,
  "Icon/Line / File-text": (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  "Icon/Line / Filter": <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />,
  "Icon/Line / Globe": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 0 0 18M12 3a14 14 0 0 1 0 18" />
    </>
  ),
  "Icon/Line / Grid": (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  "Icon/Line / Heart": (
    <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z" />
  ),
  "Icon/Line / Info": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  "Icon/Line / Layout": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 20V10" />
    </>
  ),
  "Icon/Line / Link": (
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  ),
  "Icon/Line / List": <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  "Icon/Line / Loader": (
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  ),
  "Icon/Line / Log-out": <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  "Icon/Line / Mail": (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  "Icon/Line / Map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  "Icon/Line / Message-square": (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  ),
  "Icon/Line / Moon": <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  "Icon/Line / More-Horizontal": (
    <>
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  "Icon/Line / More-Vertical": (
    <>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  "Icon/Line / Play": <polygon points="6 3 20 12 6 21 6 3" />,
  "Icon/Line / Plus": <path d="M12 5v14M5 12h14" />,
  "Icon/Line / Refresh-cw": (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  "Icon/Line / Rows": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M3 15h18" />
    </>
  ),
  "Icon/Line / Search": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  "Icon/Line / Settings": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.79 1 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  "Icon/Line / Share": (
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  ),
  "Icon/Line / Shield": <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  "Icon/Line / Sun": (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>
  ),
  "Icon/Line / Tag": (
    <>
      <path d="M12 2H2v10l9.29 9.29a2.4 2.4 0 0 0 3.42 0l6.58-6.58a2.4 2.4 0 0 0 0-3.42Z" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  "Icon/Line / Trash": (
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  ),
  "Icon/Line / Upload-Cloud": (
    <>
      <path d="M16 16l-4-4-4 4M12 12v9" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </>
  ),
  "Icon/Line / User": (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  "Icon/Line / Users": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  "Icon/Line / X": <path d="M18 6 6 18M6 6l12 12" />,
  "Icon/Line / Zap": <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  "Currency / Dollar (USD)": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M14.5 9.5a2.5 2.5 0 0 0-5 0c0 1.5 2.5 2 2.5 2s2.5.5 2.5 2a2.5 2.5 0 0 1-5 0" />
    </>
  ),
  "Currency / Euro (EUR)": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.5a4.5 4.5 0 1 0 0 7M8 10.8h5M8 13.2h4" />
    </>
  ),
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 20, className, ...props },
  ref
) {
  if (name === "Flag / Mexico") {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("shrink-0 rounded-full", className)}
        {...props}
      >
        <clipPath id="quick-mx-clip">
          <circle cx="12" cy="12" r="9" />
        </clipPath>
        <g clipPath="url(#quick-mx-clip)">
          <rect x="3" y="3" width="6" height="18" className="fill-feedback-success" />
          <rect x="9" y="3" width="6" height="18" className="fill-surface-background" />
          <rect x="15" y="3" width="6" height="18" className="fill-feedback-danger" />
          <circle cx="12" cy="12" r="1.6" className="fill-feedback-warning" />
        </g>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {STROKE_PATHS[name] ?? STROKE_PATHS["Icon/Line / Command"]}
    </svg>
  );
});
