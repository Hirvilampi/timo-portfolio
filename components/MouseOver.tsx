"use client";

import type { ReactNode } from "react";

type MouseOverProps = {
  children?: ReactNode;
  className?: string;
};

export default function OnMouseOver({ children, className }: MouseOverProps) {
  return (
    <div
      className={`relative overflow-hidden bg-stone-950${className ? ` ${className}` : ""}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--x", `${x}px`);
        e.currentTarget.style.setProperty("--y", `${y}px`);
      }}
      style={{
        background:
          "radial-gradient(200px circle at var(--x) var(--y), rgba(16, 185, 129, 0.12), transparent 70%)",
      }}
    >
      {children}
    </div>
  );
}

