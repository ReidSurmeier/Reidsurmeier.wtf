"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: -20,
        left: -20,
        width: 8,
        height: 8,
        background: "transparent",
        border: "1px solid #ccc",
        pointerEvents: "none",
        zIndex: 999999,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
    />
  );
}
