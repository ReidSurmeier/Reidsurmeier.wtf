"use client";

import { useState } from "react";
import TextScatterLoader from "./TextScatterLoader";

export default function EmbedPage({
  onClose,
  title,
  url,
  inputLabel,
  scale,
  iframeMarginLeft = 0,
  iframeMarginRight = 0,
}: {
  onClose: () => void;
  title: string;
  url: string;
  inputLabel: string;
  scale?: number;
  iframeMarginLeft?: number;
  iframeMarginRight?: number;
}) {
  void onClose;
  const s = scale || 1;
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {!loaderDone && (
        <TextScatterLoader
          text={title || "loading"}
          amount={10}
          fontSize={2.5}
          interval={20}
          windowSize={15}
          duration={1600}
          onDone={() => setLoaderDone(true)}
        />
      )}
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--site-font)",
          fontSize: 11,
          color: "#bbb",
          paddingBottom: 4,
          marginRight: 20,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <span>{inputLabel}</span>
          <span>{title}</span>
        </div>
      </div>

      {/* Iframe */}
      <div style={{ flex: 1, overflow: "hidden", marginTop: 12, marginLeft: iframeMarginLeft, marginRight: iframeMarginRight }}>
        <iframe
          src={url}
          title={title}
          style={{
            width: `${100 / s}%`,
            height: `${100 / s}%`,
            border: "none",
            transform: s !== 1 ? `scale(${s})` : undefined,
            transformOrigin: "0 0",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation"
        />
      </div>
    </div>
  );
}
