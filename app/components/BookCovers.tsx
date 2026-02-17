"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

const bookCovers = [
  // "plotter30.jpg",
  // "plotter31.jpg",
  // "plotter32.jpg",
  "Plotter_1.png",
  "plotter_2.png",
  "plotter_4.jpg",
  "plotter_5.jpg",
  "plotter_6.jpg",
  "plotter_7.jpg",
  "plotter_10.png",
  "plotter_8.png",
  "plotter421.jpg",
  "plotter.jpg",
  "plotter431.jpg",
];

// Scale factor: divide natural pixels by this to get display size.
// A 600px tall portrait becomes 120px, a 300px landscape becomes 60px.
const SCALE = 5;

interface ImageSize {
  src: string;
  w: number;
  h: number;
}

function nameFromSrc(src: string): string {
  // Strip _thumb.png or any extension
  const base = src.replace(/_thumb\.\w+$/, "").replace(/\.\w+$/, "");
  const parts = base.split("_");
  const author = parts[0].split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = parts.slice(1).join(" ").split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return title ? `${author} — ${title}` : author;
}

function BookCover({
  img,
  visible,
  dimmed,
  onHover,
  onLeave,
  onClick,
  coverRef,
}: {
  img: ImageSize;
  visible: boolean;
  dimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick?: () => void;
  coverRef?: RefObject<HTMLDivElement | null>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={coverRef}
      onMouseEnter={() => {
        setHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onLeave();
      }}
      onClick={onClick}
      style={{
        opacity: visible ? (dimmed ? 0.65 : 1) : 0,
        transition: "opacity 0.8s ease",
        outline: hovered ? "2px solid #999" : "none",
        outlineOffset: 2,
        borderRadius: 0,
        alignSelf: "flex-end",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/${img.src}`}
        alt=""
        style={{
          display: "block",
          width: img.w,
          height: img.h,
        }}
      />
    </div>
  );
}

export default function BookCovers({
  onHover,
  onLeave,
  coverRefs,
  onAllVisible,
  onCoverHover,
  onCoverClick,
  connectedIndices,
}: {
  onHover: (text: string, title?: string) => void;
  onLeave: () => void;
  coverRefs?: Record<number, RefObject<HTMLDivElement | null>>;
  onAllVisible?: () => void;
  onCoverHover?: (index: number | null) => void;
  onCoverClick?: (index: number) => void;
  connectedIndices?: Set<number> | null;
}) {
  const [images, setImages] = useState<ImageSize[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const firedRef = useRef(false);
  const onAllVisibleRef = useRef(onAllVisible);
  onAllVisibleRef.current = onAllVisible;
  const onCoverHoverRef = useRef(onCoverHover);
  onCoverHoverRef.current = onCoverHover;

  // Preload to get natural dimensions
  useEffect(() => {
    let cancelled = false;
    const promises = bookCovers.map(
      (src) =>
        new Promise<ImageSize>((resolve) => {
          const img = new Image();
          img.onload = () => {
            let w = img.naturalWidth / SCALE;
            let h = img.naturalHeight / SCALE;

            // Cap max height at 130, scale width proportionally
            if (h > 130) {
              const ratio = 130 / h;
              w = w * ratio;
              h = 130;
            }

            // Enforce min width of 40 for very narrow images
            if (w < 40) {
              const ratio = 40 / w;
              w = 40;
              h = h * ratio;
            }

            resolve({
              src,
              w: Math.round(w),
              h: Math.round(h),
            });
          };
          img.onerror = () => {
            resolve({ src, w: 60, h: 90 });
          };
          img.src = `/${src}`;
        })
    );
    Promise.all(promises).then((results) => {
      if (!cancelled) setImages(results);
    });
    return () => { cancelled = true; };
  }, []);

  // Staggered reveal
  useEffect(() => {
    if (visibleCount >= images.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 750);
    return () => clearTimeout(timer);
  }, [visibleCount, images.length]);

  // Fire callback after last cover's fade transition completes
  useEffect(() => {
    if (visibleCount >= images.length && images.length > 0 && !firedRef.current) {
      firedRef.current = true;
      const t = setTimeout(() => onAllVisibleRef.current?.(), 700);
      return () => clearTimeout(t);
    }
  }, [visibleCount, images.length]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        gap: 14,
        padding: "0 10px",
      }}
    >
      {images.map((img, i) => {
        const name = nameFromSrc(img.src);
        return (
          <BookCover
            key={img.src}
            img={img}
            visible={i < visibleCount}
            dimmed={
              (hoveredIdx !== null && hoveredIdx !== i) ||
              (connectedIndices != null && !connectedIndices.has(i))
            }
            onHover={() => {
              setHoveredIdx(i);
              onCoverHoverRef.current?.(i);
              onHover(name, name);
            }}
            onLeave={() => {
              setHoveredIdx(null);
              onCoverHoverRef.current?.(null);
              onLeave();
            }}
            coverRef={coverRefs?.[i]}
            onClick={onCoverClick ? () => onCoverClick(i) : undefined}
          />
        );
      })}
    </div>
  );
}
