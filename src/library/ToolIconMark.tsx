import type { CSSProperties } from "react";
import type { ToolIcon } from "../data/types";
import { toolIconUrls } from "./toolIcons";

/** A tool's icon, tinted to the surrounding text colour. */
export function ToolIconMark({ icon, className = "" }: { icon: ToolIcon; className?: string }) {
  return (
    <span
      className={`tool-icon ${className}`}
      style={{ "--icon": `url("${toolIconUrls[icon]}")` } as CSSProperties}
      aria-hidden="true"
    />
  );
}
