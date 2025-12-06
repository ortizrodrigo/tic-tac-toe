import "./SplitView.css";
import React from "react";
import type { ReactNode } from "react";

interface SplitViewProps {
  template: string;
  row?: boolean;
  gap?: string;
  children: ReactNode;
  className?: string;
}

function SplitView({ template, row = false, gap = "0", children, className = "" }: SplitViewProps) {
  const style: React.CSSProperties = row
    ? {
        display: "grid",
        gridTemplateRows: template,
        gridAutoColumns: "1fr",
        gap,
      }
    : {
        display: "grid",
        gridTemplateColumns: template,
        gridAutoRows: "1fr",
        gap,
      };

  return (
    <div style={style} className={`split-view ${className}`}>
      {children}
    </div>
  );
}

export default SplitView;
