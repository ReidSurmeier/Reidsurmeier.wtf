"use client";

import { useState, useEffect } from "react";
import TextScatterLoader from "./TextScatterLoader";

const highlightColors = [
  "#EFEF3B", "#C5D5F0", "#C5A0D0", "#F0C5D5",
  "#D5F0C5", "#F0D5C5", "#C5F0E8", "#E8C5F0",
];

function TypewriterText({ children, delay = 0, speed = 40 }: { children: string; delay?: number; speed?: number }) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const text = children;
  const FADE_WINDOW = 4;
  const totalSteps = Array.from(text).length + FADE_WINDOW;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || charCount >= totalSteps) return;
    const timer = setTimeout(() => setCharCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [started, charCount, totalSteps, speed]);

  const chars = Array.from(text);
  return (
    <span>
      {chars.map((char, i) => {
        let opacity = 0;
        if (i < charCount - FADE_WINDOW) opacity = 1;
        else if (i < charCount) opacity = (charCount - i) / FADE_WINDOW;
        return (
          <span key={i} style={{ opacity, transition: "opacity 0.2s ease", whiteSpace: char === " " ? "pre" : undefined }}>{char}</span>
        );
      })}
    </span>
  );
}

function Highlight({ children, color }: { children: React.ReactNode; color: string }) {
  const [bg, setBg] = useState(color);
  const randomize = () => {
    const other = highlightColors.filter((c) => c !== bg);
    setBg(other[Math.floor(Math.random() * other.length)]);
  };
  return (
    <span
      onMouseEnter={randomize}
      onMouseLeave={() => setBg(color)}
      style={{
        background: bg,
        padding: "1px 2px",
        color: "#666",
        transition: "background 0.3s ease",
      }}
    >
      {children}
    </span>
  );
}

export default function AboutPage({ onClose, lang }: { onClose: () => void; lang: "en" | "de" | "fr" | "ko" | "id" | "zh" | "ja" }) {
  void onClose;
  const [contentVisible, setContentVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const bios: Record<string, React.ReactNode> = {
    en: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>, is the independent studio practice of Reid Surmeier, an American multidisciplinary designer and artist working across <Highlight color="#EFEF3B">computation</Highlight>, <Highlight color="#C5D5F0">painting</Highlight>, and <Highlight color="#C5A0D0">sculpture</Highlight>. His work explores the evolving relationship between humans and computers, focusing on how both are increasingly intertwined in the processes of <Highlight color="#C5D5F0">creating</Highlight>, <Highlight color="#F0C5D5">perceiving</Highlight>, and <Highlight color="#D5F0C5">interpreting</Highlight> reality.
      </>
    ),
    de: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>, ist die unabh&auml;ngige Studiopraxis von Reid Surmeier, einem amerikanischen multidisziplin&auml;ren Designer und K&uuml;nstler, der in den Bereichen <Highlight color="#EFEF3B">Computation</Highlight>, <Highlight color="#C5D5F0">Malerei</Highlight>, und <Highlight color="#C5A0D0">Skulptur</Highlight> arbeitet. Seine Arbeit untersucht die sich entwickelnde Beziehung zwischen Menschen und Computern und konzentriert sich darauf, wie beide zunehmend in den Prozessen des <Highlight color="#C5D5F0">Schaffens</Highlight>, <Highlight color="#F0C5D5">Wahrnehmens</Highlight>, und <Highlight color="#D5F0C5">Interpretierens</Highlight> der Realit&auml;t verflochten sind.
      </>
    ),
    fr: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>, est la pratique ind&eacute;pendante de Reid Surmeier, un designer et artiste multidisciplinaire am&eacute;ricain travaillant dans les domaines de la <Highlight color="#EFEF3B">computation</Highlight>, <Highlight color="#C5D5F0">peinture</Highlight>, et <Highlight color="#C5A0D0">sculpture</Highlight>. Son travail explore la relation &eacute;volutive entre les humains et les ordinateurs, en se concentrant sur la fa&ccedil;on dont les deux sont de plus en plus imbriqu&eacute;s dans les processus de <Highlight color="#C5D5F0">cr&eacute;ation</Highlight>, <Highlight color="#F0C5D5">perception</Highlight>, et <Highlight color="#D5F0C5">interpr&eacute;tation</Highlight> de la r&eacute;alit&eacute;.
      </>
    ),
    ko: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>{"\uB294 \uBBF8\uAD6D\uC758 \uB2E4\uD559\uC81C\uC801 \uB514\uC790\uC774\uB108 \uBC0F \uC608\uC220\uAC00 Reid Surmeier\uC758 \uB3C5\uB9BD \uC2A4\uD29C\uB514\uC624 \uD504\uB809\uD2F0\uC2A4\uC785\uB2C8\uB2E4. "}<Highlight color="#EFEF3B">{"\uCEF4\uD4E8\uD14C\uC774\uC158"}</Highlight>{", "}<Highlight color="#C5D5F0">{"\uD68C\uD654"}</Highlight>{", "}<Highlight color="#C5A0D0">{"\uC870\uAC01"}</Highlight>{" \uBD84\uC57C\uC5D0\uC11C \uD65C\uB3D9\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uADF8\uC758 \uC791\uD488\uC740 \uC778\uAC04\uACFC \uCEF4\uD4E8\uD130 \uC0AC\uC774\uC758 \uBC1C\uC804\uD558\uB294 \uAD00\uACC4\uB97C \uD0D0\uAD6C\uD558\uBA70, \uB458 \uB2E4 \uC810\uC810 \uB354 \uAE4A\uC774 \uC5BD\uD600\uAC00\uB294 "}<Highlight color="#C5D5F0">{"\uCC3D\uC791"}</Highlight>{", "}<Highlight color="#F0C5D5">{"\uC778\uC2DD"}</Highlight>{", "}<Highlight color="#D5F0C5">{"\uD574\uC11D"}</Highlight>{" \uD604\uC2E4\uC758 \uACFC\uC815\uC5D0 \uCD08\uC810\uC744 \uB9DE\uCD94\uACE0 \uC788\uC2B5\uB2C8\uB2E4."}
      </>
    ),
    id: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>, adalah praktik studio independen dari Reid Surmeier, seorang desainer dan seniman multidisiplin Amerika yang berkarya di bidang <Highlight color="#EFEF3B">komputasi</Highlight>, <Highlight color="#C5D5F0">lukisan</Highlight>, dan <Highlight color="#C5A0D0">patung</Highlight>. Karyanya mengeksplorasi hubungan yang terus berkembang antara manusia dan komputer, berfokus pada bagaimana keduanya semakin terkait dalam proses <Highlight color="#C5D5F0">penciptaan</Highlight>, <Highlight color="#F0C5D5">persepsi</Highlight>, dan <Highlight color="#D5F0C5">interpretasi</Highlight> realitas.
      </>
    ),
    zh: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>{"\uFF0C\u662F\u7F8E\u56FD\u591A\u5B66\u79D1\u8BBE\u8BA1\u5E08\u548C\u827A\u672F\u5BB6 Reid Surmeier \u7684\u72EC\u7ACB\u5DE5\u4F5C\u5BA4\u5B9E\u8DF5\u3002\u4ED6\u7684\u5DE5\u4F5C\u6DB5\u76D6"}<Highlight color="#EFEF3B">{"\u8BA1\u7B97"}</Highlight>{"\u3001"}<Highlight color="#C5D5F0">{"\u7ED8\u753B"}</Highlight>{"\u548C"}<Highlight color="#C5A0D0">{"\u96D5\u5851"}</Highlight>{"\u7B49\u9886\u57DF\u3002\u4ED6\u7684\u4F5C\u54C1\u63A2\u7D22\u4EBA\u7C7B\u4E0E\u8BA1\u7B97\u673A\u4E4B\u95F4\u4E0D\u65AD\u53D1\u5C55\u7684\u5173\u7CFB\uFF0C\u5173\u6CE8\u4E24\u8005\u5982\u4F55\u5728"}<Highlight color="#C5D5F0">{"\u521B\u9020"}</Highlight>{"\u3001"}<Highlight color="#F0C5D5">{"\u611F\u77E5"}</Highlight>{"\u548C"}<Highlight color="#D5F0C5">{"\u8BE0\u91CA"}</Highlight>{"\u73B0\u5B9E\u7684\u8FC7\u7A0B\u4E2D\u65E5\u76CA\u4EA4\u7EC7\u3002"}
      </>
    ),
    ja: (
      <>
        <strong style={{ color: "#666", fontWeight: 800, whiteSpace: "nowrap" }}>Reid Surmeier, I.S.P.</strong>{"\u306F\u3001\u30A2\u30E1\u30EA\u30AB\u306E\u5B66\u969B\u7684\u30C7\u30B6\u30A4\u30CA\u30FC\u30FB\u30A2\u30FC\u30C6\u30A3\u30B9\u30C8 Reid Surmeier \u306E\u72EC\u7ACB\u30B9\u30BF\u30B8\u30AA\u30D7\u30E9\u30AF\u30C6\u30A3\u30B9\u3067\u3059\u3002\u5F7C\u306E\u6D3B\u52D5\u306F"}<Highlight color="#EFEF3B">{"\u30B3\u30F3\u30D4\u30E5\u30C6\u30FC\u30B7\u30E7\u30F3"}</Highlight>{"\u3001"}<Highlight color="#C5D5F0">{"\u7D75\u753B"}</Highlight>{"\u3001"}<Highlight color="#C5A0D0">{"\u5F6B\u523B"}</Highlight>{"\u306B\u53CA\u3073\u307E\u3059\u3002\u5F7C\u306E\u4F5C\u54C1\u306F\u3001\u4EBA\u9593\u3068\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u306E\u9032\u5316\u3059\u308B\u95A2\u4FC2\u3092\u63A2\u6C42\u3057\u3001\u4E21\u8005\u304C\u3044\u304B\u306B"}<Highlight color="#C5D5F0">{"\u5275\u9020"}</Highlight>{"\u3001"}<Highlight color="#F0C5D5">{"\u77E5\u899A"}</Highlight>{"\u3001"}<Highlight color="#D5F0C5">{"\u89E3\u91C8"}</Highlight>{"\u306E\u30D7\u30ED\u30BB\u30B9\u3067\u307E\u3059\u307E\u3059\u7D61\u307F\u5408\u3063\u3066\u3044\u308B\u304B\u306B\u7126\u70B9\u3092\u5F53\u3066\u3066\u3044\u307E\u3059\u3002"}
      </>
    ),
  };

  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {!loaderDone && (
        <TextScatterLoader
          text="About"
          amount={10}
          fontSize={2.5}
          interval={20}
          windowSize={5}
          duration={1200}
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
          borderBottom: "1px solid #eee",
          paddingBottom: 4,
          marginRight: 20,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <TypewriterText delay={100} speed={50}>{"004"}</TypewriterText>
          <TypewriterText delay={300} speed={40}>{"About"}</TypewriterText>
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          paddingTop: "clamp(30px, 6vw, 80px)",
          paddingLeft: 30,
          paddingRight: "clamp(40px, 8vw, 160px)",
          overflowY: "auto",
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* Bio text */}
        <p style={{
          fontFamily: "var(--site-font)",
          fontSize: "clamp(13px, 1.2vw, 17px)",
          fontWeight: 500,
          color: "#bbb",
          lineHeight: 1.4,
          textAlign: "justify",
          hyphens: "auto",
          overflowWrap: "break-word",
          maxWidth: 680,
        } as React.CSSProperties}>
          {bios[lang]}
        </p>

        {/* Photo */}
        <div
          style={{
            marginTop: 48,
            maxWidth: 400,
            border: "1px solid #eee",
          }}
        >
          {/* Replace src with your photo */}
          <img
            src="/img/about-photo.jpg"
            alt="Reid Surmeier"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
            onError={(e) => {
              // Show placeholder if no image yet
              const el = e.currentTarget;
              el.style.display = "none";
              el.parentElement!.style.height = "300px";
              el.parentElement!.style.display = "flex";
              el.parentElement!.style.alignItems = "center";
              el.parentElement!.style.justifyContent = "center";
              el.parentElement!.innerHTML = '<span style="font-family:var(--site-font);font-size:11px;color:#bbb;">Photo</span>';
            }}
          />
        </div>
      </div>
    </div>
  );
}
