"use client";

import { useState, useRef, useCallback } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  const show = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
  }, []);

  const hide = useCallback(() => setPos(null), []);

  const toggle = useCallback(() => (pos ? hide() : show()), [pos, show, hide]);

  return (
    <>
      <span
        ref={ref}
        className={`inline-block ${className}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={toggle}
      >
        {children}
      </span>

      {pos && (
        <span
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, calc(-100% - 8px))",
            zIndex: 9999,
          }}
          className="px-2.5 py-1.5 rounded bg-ink text-white text-xs whitespace-nowrap shadow-sm pointer-events-none"
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
        </span>
      )}
    </>
  );
}
