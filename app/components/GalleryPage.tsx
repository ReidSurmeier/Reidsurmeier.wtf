"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import TextScatterLoader from "./TextScatterLoader";

type Lang = "en" | "de" | "fr" | "ko" | "id" | "zh" | "ja";

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

const printsImages = [
  "/plotter%20drawings/1.jpg",
  "/plotter%20drawings/2.jpg",
  "/plotter%20drawings/3.jpg",
  "/plotter%20drawings/4.jpg",
  "/plotter%20drawings/5.jpg",
  "/plotter%20drawings/6.jpg",
  "/plotter%20drawings/8.jpg",
];

const paintingImages = [
  "/painting/betterversion%202.jpg",
  "/painting/betterversion%203.jpg",
  "/painting/betterversion%204.jpg",
  "/painting/betterversion%205.jpg",
  "/painting/iu%5Bp.jpg",
];

const printsCaptions: Record<Lang, Array<{ title: string; date: string; medium: string; dimensions: string }>> = {
  en: [
    { title: "Untitled I", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled II", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled III", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled IV", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled V", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled VI", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
    { title: "Untitled VIII", date: "2025", medium: "Pen plotter drawing on paper", dimensions: "18 × 24 in." },
  ],
  de: [
    { title: "Ohne Titel I", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel II", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel III", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel IV", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel V", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel VI", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
    { title: "Ohne Titel VIII", date: "2025", medium: "Stiftplotterzeichnung auf Papier", dimensions: "45,7 × 61 cm" },
  ],
  fr: [
    { title: "Sans titre I", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre II", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre III", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre IV", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre V", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre VI", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
    { title: "Sans titre VIII", date: "2025", medium: "Dessin au traceur à plume sur papier", dimensions: "45,7 × 61 cm" },
  ],
  ko: [
    { title: "무제 I", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 II", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 III", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 IV", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 V", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 VI", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
    { title: "무제 VIII", date: "2025", medium: "종이 위 펜 플로터 드로잉", dimensions: "45.7 × 61 cm" },
  ],
  id: [
    { title: "Tanpa Judul I", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul II", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul III", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul IV", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul V", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul VI", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
    { title: "Tanpa Judul VIII", date: "2025", medium: "Gambar pen plotter di atas kertas", dimensions: "45,7 × 61 cm" },
  ],
  zh: [
    { title: "无题 I", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 II", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 III", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 IV", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 V", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 VI", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
    { title: "无题 VIII", date: "2025", medium: "纸上笔式绘图仪绘画", dimensions: "45.7 × 61 厘米" },
  ],
  ja: [
    { title: "無題 I", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 II", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 III", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 IV", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 V", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 VI", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
    { title: "無題 VIII", date: "2025", medium: "紙にペンプロッタードローイング", dimensions: "45.7 × 61 cm" },
  ],
};

const paintingCaptions: Record<Lang, Array<{ title: string; date: string; medium: string; dimensions: string }>> = {
  en: [
    { title: "Untitled I", date: "2024", medium: "Oil on canvas", dimensions: "36 × 48 in." },
    { title: "Untitled II", date: "2024", medium: "Oil on canvas", dimensions: "36 × 48 in." },
    { title: "Untitled III", date: "2024", medium: "Oil on canvas", dimensions: "24 × 30 in." },
    { title: "Untitled IV", date: "2024", medium: "Oil on canvas", dimensions: "36 × 48 in." },
    { title: "Untitled V", date: "2024", medium: "Oil on canvas", dimensions: "36 × 48 in." },
  ],
  de: [
    { title: "Ohne Titel I", date: "2024", medium: "Öl auf Leinwand", dimensions: "91,4 × 121,9 cm" },
    { title: "Ohne Titel II", date: "2024", medium: "Öl auf Leinwand", dimensions: "91,4 × 121,9 cm" },
    { title: "Ohne Titel III", date: "2024", medium: "Öl auf Leinwand", dimensions: "61 × 76,2 cm" },
    { title: "Ohne Titel IV", date: "2024", medium: "Öl auf Leinwand", dimensions: "91,4 × 121,9 cm" },
    { title: "Ohne Titel V", date: "2024", medium: "Öl auf Leinwand", dimensions: "91,4 × 121,9 cm" },
  ],
  fr: [
    { title: "Sans titre I", date: "2024", medium: "Huile sur toile", dimensions: "91,4 × 121,9 cm" },
    { title: "Sans titre II", date: "2024", medium: "Huile sur toile", dimensions: "91,4 × 121,9 cm" },
    { title: "Sans titre III", date: "2024", medium: "Huile sur toile", dimensions: "61 × 76,2 cm" },
    { title: "Sans titre IV", date: "2024", medium: "Huile sur toile", dimensions: "91,4 × 121,9 cm" },
    { title: "Sans titre V", date: "2024", medium: "Huile sur toile", dimensions: "91,4 × 121,9 cm" },
  ],
  ko: [
    { title: "무제 I", date: "2024", medium: "캔버스에 유채", dimensions: "91.4 × 121.9 cm" },
    { title: "무제 II", date: "2024", medium: "캔버스에 유채", dimensions: "91.4 × 121.9 cm" },
    { title: "무제 III", date: "2024", medium: "캔버스에 유채", dimensions: "61 × 76.2 cm" },
    { title: "무제 IV", date: "2024", medium: "캔버스에 유채", dimensions: "91.4 × 121.9 cm" },
    { title: "무제 V", date: "2024", medium: "캔버스에 유채", dimensions: "91.4 × 121.9 cm" },
  ],
  id: [
    { title: "Tanpa Judul I", date: "2024", medium: "Minyak di atas kanvas", dimensions: "91,4 × 121,9 cm" },
    { title: "Tanpa Judul II", date: "2024", medium: "Minyak di atas kanvas", dimensions: "91,4 × 121,9 cm" },
    { title: "Tanpa Judul III", date: "2024", medium: "Minyak di atas kanvas", dimensions: "61 × 76,2 cm" },
    { title: "Tanpa Judul IV", date: "2024", medium: "Minyak di atas kanvas", dimensions: "91,4 × 121,9 cm" },
    { title: "Tanpa Judul V", date: "2024", medium: "Minyak di atas kanvas", dimensions: "91,4 × 121,9 cm" },
  ],
  zh: [
    { title: "无题 I", date: "2024", medium: "布面油画", dimensions: "91.4 × 121.9 厘米" },
    { title: "无题 II", date: "2024", medium: "布面油画", dimensions: "91.4 × 121.9 厘米" },
    { title: "无题 III", date: "2024", medium: "布面油画", dimensions: "61 × 76.2 厘米" },
    { title: "无题 IV", date: "2024", medium: "布面油画", dimensions: "91.4 × 121.9 厘米" },
    { title: "无题 V", date: "2024", medium: "布面油画", dimensions: "91.4 × 121.9 厘米" },
  ],
  ja: [
    { title: "無題 I", date: "2024", medium: "キャンバスに油彩", dimensions: "91.4 × 121.9 cm" },
    { title: "無題 II", date: "2024", medium: "キャンバスに油彩", dimensions: "91.4 × 121.9 cm" },
    { title: "無題 III", date: "2024", medium: "キャンバスに油彩", dimensions: "61 × 76.2 cm" },
    { title: "無題 IV", date: "2024", medium: "キャンバスに油彩", dimensions: "91.4 × 121.9 cm" },
    { title: "無題 V", date: "2024", medium: "キャンバスに油彩", dimensions: "91.4 × 121.9 cm" },
  ],
};

const paintingTranslations: Record<Lang, { aboutP1: string; aboutP2: string; aboutP3: string }> = {
  en: {
    aboutP1: "These paintings emerge from a sustained engagement with color, surface, and the physicality of oil paint. Each canvas builds through layered applications, allowing pigment and medium to interact across successive sessions in the studio.",
    aboutP2: "The works navigate between figuration and abstraction, drawing on both observational impulses and the material logic of the painting process itself. Gesture, erasure, and accumulation converge to produce surfaces that hold traces of their own making.",
    aboutP3: "Produced in 2024 at the Rhode Island School of Design, these paintings reflect an ongoing investigation into the expressive potential of traditional media within a contemporary practice.",
  },
  de: {
    aboutP1: "Diese Gemälde entstehen aus einer intensiven Auseinandersetzung mit Farbe, Oberfläche und der Materialität der Ölfarbe. Jede Leinwand baut sich durch schichtweise Aufträge auf, wobei Pigment und Medium über aufeinanderfolgende Sitzungen im Atelier interagieren.",
    aboutP2: "Die Werke bewegen sich zwischen Figuration und Abstraktion und greifen sowohl auf beobachtende Impulse als auch auf die materielle Logik des Malprozesses selbst zurück. Geste, Löschung und Akkumulation konvergieren zu Oberflächen, die Spuren ihrer eigenen Entstehung bewahren.",
    aboutP3: "Entstanden 2024 an der Rhode Island School of Design, spiegeln diese Gemälde eine laufende Untersuchung des expressiven Potenzials traditioneller Medien innerhalb einer zeitgenössischen Praxis wider.",
  },
  fr: {
    aboutP1: "Ces peintures naissent d'un engagement soutenu avec la couleur, la surface et la matérialité de la peinture à l'huile. Chaque toile se construit par des applications superposées, permettant au pigment et au médium d'interagir au fil des sessions successives en atelier.",
    aboutP2: "Les œuvres naviguent entre figuration et abstraction, puisant à la fois dans des impulsions observationnelles et dans la logique matérielle du processus pictural lui-même. Le geste, l'effacement et l'accumulation convergent pour produire des surfaces qui conservent les traces de leur propre fabrication.",
    aboutP3: "Produites en 2024 à la Rhode Island School of Design, ces peintures reflètent une investigation en cours sur le potentiel expressif des médias traditionnels au sein d'une pratique contemporaine.",
  },
  ko: {
    aboutP1: "이 회화 작품들은 색채, 표면, 그리고 유화 물감의 물질성에 대한 지속적인 탐구에서 비롯됩니다. 각 캔버스는 층층이 쌓인 도포를 통해 구축되며, 스튜디오에서의 연속적인 작업 세션에 걸쳐 안료와 매체가 상호작용합니다.",
    aboutP2: "이 작품들은 구상과 추상 사이를 오가며, 관찰적 충동과 회화 과정 자체의 물질적 논리 모두를 활용합니다. 제스처, 지우기, 축적이 수렴하여 자신의 제작 흔적을 간직한 표면을 만들어냅니다.",
    aboutP3: "2024년 로드 아일랜드 디자인 스쿨에서 제작된 이 회화들은 동시대 실천 속에서 전통 매체의 표현적 잠재력에 대한 지속적인 탐구를 반영합니다.",
  },
  id: {
    aboutP1: "Lukisan-lukisan ini lahir dari keterlibatan berkelanjutan dengan warna, permukaan, dan fisikalitas cat minyak. Setiap kanvas dibangun melalui aplikasi berlapis, memungkinkan pigmen dan medium berinteraksi sepanjang sesi berturut-turut di studio.",
    aboutP2: "Karya-karya ini bernavigasi antara figurasi dan abstraksi, mengambil dari impuls observasional dan logika material dari proses melukis itu sendiri. Gestur, penghapusan, dan akumulasi bertemu untuk menghasilkan permukaan yang menyimpan jejak pembuatannya sendiri.",
    aboutP3: "Diproduksi pada tahun 2024 di Rhode Island School of Design, lukisan-lukisan ini mencerminkan investigasi berkelanjutan terhadap potensi ekspresif media tradisional dalam praktik kontemporer.",
  },
  zh: {
    aboutP1: "这些绘画源于对色彩、表面和油画颜料物质性的持续探索。每幅画布通过层层叠加的方式构建，让颜料和介质在工作室的连续创作过程中相互作用。",
    aboutP2: "这些作品在具象与抽象之间游走，既汲取观察性的冲动，也遵循绘画过程本身的物质逻辑。笔触、擦除和积累交汇，产生保留着自身创作痕迹的表面。",
    aboutP3: "这些绘画于2024年在罗德岛设计学院创作，反映了在当代实践中对传统媒介表现潜力的持续探索。",
  },
  ja: {
    aboutP1: "これらの絵画は、色彩、表面、そして油絵具の物質性との持続的な関わりから生まれています。各キャンバスは重ねられた塗布を通じて構築され、スタジオでの連続したセッションを通じて顔料と媒体が相互作用します。",
    aboutP2: "これらの作品は具象と抽象の間を行き来し、観察的な衝動と絵画プロセス自体の物質的論理の両方を活用しています。ジェスチャー、消去、蓄積が収束し、自らの制作の痕跡を留める表面を生み出します。",
    aboutP3: "2024年にロードアイランド・スクール・オブ・デザインで制作されたこれらの絵画は、現代的な実践における伝統的メディアの表現的可能性に関する継続的な調査を反映しています。",
  },
};

const galleryTranslations: Record<Lang, {
  works: string;
  about: string;
  press: string;
  shop: string;
  noPress: string;
  shopText: string;
  comingSoon: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
}> = {
  en: {
    works: "Works",
    about: "About",
    press: "Press",
    shop: "Shop",
    noPress: "No press coverage yet.",
    shopText: "Prints available upon request. Contact for pricing and availability.",
    comingSoon: "Gallery content coming soon.",
    aboutP1: "This series of plotter drawings explores the intersection of computational logic and hand-drawn aesthetics. Using a custom-built pen plotter, each work translates algorithmic processes into physical mark-making on paper, blurring the boundary between human gesture and machine precision.",
    aboutP2: "The drawings are generated through iterative code — each pass of the pen responding to parameters of density, rhythm, and spatial distribution. The resulting compositions oscillate between order and chaos, reflecting the tension between programmed instruction and material unpredictability.",
    aboutP3: "Produced between 2025 and 2026 as part of an ongoing investigation into computational drawing practices at the Rhode Island School of Design, these works sit at the nexus of art, design, and technology.",
  },
  de: {
    works: "Werke",
    about: "Über",
    press: "Presse",
    shop: "Shop",
    noPress: "Noch keine Presseberichterstattung.",
    shopText: "Drucke auf Anfrage erhältlich. Kontaktieren Sie uns für Preise und Verfügbarkeit.",
    comingSoon: "Galerieinhalt kommt bald.",
    aboutP1: "Diese Serie von Plotterzeichnungen erforscht die Schnittstelle zwischen Rechenlogik und handgezeichneter Ästhetik. Mit einem selbstgebauten Stiftplotter übersetzt jedes Werk algorithmische Prozesse in physische Markierungen auf Papier und verwischt die Grenze zwischen menschlicher Geste und maschineller Präzision.",
    aboutP2: "Die Zeichnungen werden durch iterativen Code erzeugt — jeder Stiftdurchgang reagiert auf Parameter von Dichte, Rhythmus und räumlicher Verteilung. Die resultierenden Kompositionen oszillieren zwischen Ordnung und Chaos und spiegeln die Spannung zwischen programmierter Anweisung und materieller Unvorhersehbarkeit wider.",
    aboutP3: "Entstanden zwischen 2025 und 2026 im Rahmen einer laufenden Untersuchung computergestützter Zeichenpraktiken an der Rhode Island School of Design, befinden sich diese Werke an der Schnittstelle von Kunst, Design und Technologie.",
  },
  fr: {
    works: "Œuvres",
    about: "À propos",
    press: "Presse",
    shop: "Boutique",
    noPress: "Pas encore de couverture presse.",
    shopText: "Tirages disponibles sur demande. Contactez-nous pour les prix et la disponibilité.",
    comingSoon: "Contenu de la galerie à venir.",
    aboutP1: "Cette série de dessins au traceur explore l'intersection entre la logique computationnelle et l'esthétique du dessin à la main. À l'aide d'un traceur à plume construit sur mesure, chaque œuvre traduit des processus algorithmiques en marques physiques sur papier, brouillant la frontière entre le geste humain et la précision mécanique.",
    aboutP2: "Les dessins sont générés par un code itératif — chaque passage du stylo répondant à des paramètres de densité, de rythme et de distribution spatiale. Les compositions résultantes oscillent entre ordre et chaos, reflétant la tension entre instruction programmée et imprévisibilité matérielle.",
    aboutP3: "Produites entre 2025 et 2026 dans le cadre d'une investigation en cours sur les pratiques de dessin computationnel à la Rhode Island School of Design, ces œuvres se situent au carrefour de l'art, du design et de la technologie.",
  },
  ko: {
    works: "작품",
    about: "소개",
    press: "언론",
    shop: "구매",
    noPress: "아직 언론 보도가 없습니다.",
    shopText: "요청 시 프린트 구매 가능합니다. 가격 및 재고 문의는 연락 바랍니다.",
    comingSoon: "갤러리 콘텐츠가 곧 공개됩니다.",
    aboutP1: "이 펜 플로터 드로잉 시리즈는 컴퓨터 논리와 손으로 그린 미학의 교차점을 탐구합니다. 맞춤 제작한 펜 플로터를 사용하여 각 작품은 알고리즘 프로세스를 종이 위의 물리적 표현으로 변환하며, 인간의 제스처와 기계의 정밀함 사이의 경계를 흐리게 합니다.",
    aboutP2: "드로잉은 반복적인 코드를 통해 생성됩니다 — 펜의 각 패스는 밀도, 리듬, 공간 분포의 매개변수에 반응합니다. 결과적인 구성은 질서와 혼돈 사이를 오가며, 프로그래밍된 명령과 재료의 예측 불가능성 사이의 긴장을 반영합니다.",
    aboutP3: "로드 아일랜드 디자인 스쿨에서 진행 중인 컴퓨터 드로잉 실천에 대한 연구의 일환으로 2025년과 2026년 사이에 제작된 이 작품들은 예술, 디자인, 기술의 교차점에 위치합니다.",
  },
  id: {
    works: "Karya",
    about: "Tentang",
    press: "Pers",
    shop: "Toko",
    noPress: "Belum ada liputan pers.",
    shopText: "Cetakan tersedia berdasarkan permintaan. Hubungi untuk harga dan ketersediaan.",
    comingSoon: "Konten galeri segera hadir.",
    aboutP1: "Seri gambar plotter ini mengeksplorasi persimpangan antara logika komputasi dan estetika gambar tangan. Menggunakan pen plotter buatan sendiri, setiap karya menerjemahkan proses algoritmik menjadi tanda fisik di atas kertas, mengaburkan batas antara gestur manusia dan presisi mesin.",
    aboutP2: "Gambar-gambar ini dihasilkan melalui kode iteratif — setiap lintasan pena merespons parameter kepadatan, ritme, dan distribusi spasial. Komposisi yang dihasilkan berosilasi antara keteraturan dan kekacauan, mencerminkan ketegangan antara instruksi terprogram dan ketidakpastian material.",
    aboutP3: "Diproduksi antara 2025 dan 2026 sebagai bagian dari investigasi berkelanjutan tentang praktik menggambar komputasional di Rhode Island School of Design, karya-karya ini berada di persimpangan seni, desain, dan teknologi.",
  },
  zh: {
    works: "作品",
    about: "关于",
    press: "媒体",
    shop: "商店",
    noPress: "暂无媒体报道。",
    shopText: "版画可按需购买。请联系了解价格和供应情况。",
    comingSoon: "画廊内容即将推出。",
    aboutP1: "这一系列绘图仪作品探索了计算逻辑与手绘美学的交叉点。使用定制的笔式绘图仪，每件作品将算法过程转化为纸上的物理标记，模糊了人类姿态与机器精度之间的界限。",
    aboutP2: "这些绘画通过迭代代码生成——笔的每一次运行都响应密度、节奏和空间分布的参数。由此产生的构图在秩序与混沌之间振荡，反映了编程指令与材料不可预测性之间的张力。",
    aboutP3: "这些作品于2025年至2026年间创作，是罗德岛设计学院计算绘画实践持续研究的一部分，处于艺术、设计和技术的交汇处。",
  },
  ja: {
    works: "作品",
    about: "概要",
    press: "プレス",
    shop: "ショップ",
    noPress: "プレス報道はまだありません。",
    shopText: "プリントはリクエストに応じてご購入いただけます。価格と在庫についてはお問い合わせください。",
    comingSoon: "ギャラリーコンテンツは近日公開予定です。",
    aboutP1: "このペンプロッタードローイングシリーズは、計算論理と手描きの美学の交差点を探求しています。カスタムメイドのペンプロッターを使用して、各作品はアルゴリズムのプロセスを紙の上の物理的なマーキングに変換し、人間のジェスチャーと機械の精度の境界を曖昧にします。",
    aboutP2: "ドローイングは反復的なコードによって生成されます — ペンの各パスは密度、リズム、空間分布のパラメータに応答します。結果として生まれる構成は秩序と混沌の間を揺れ動き、プログラムされた命令と素材の予測不可能性の間の緊張を反映しています。",
    aboutP3: "ロードアイランド・スクール・オブ・デザインでの計算描画実践に関する継続的な研究の一環として2025年から2026年にかけて制作されたこれらの作品は、アート、デザイン、テクノロジーの交差点に位置しています。",
  },
};

type Tab = "about" | "press" | "shop";
const tabKeys: Tab[] = ["about", "press", "shop"];

function ExhibitionPage({ lang, images, captions, aboutTexts, processImages, onContact }: {
  lang: Lang;
  images: string[];
  captions: Array<{ title: string; date: string; medium: string; dimensions: string }>;
  aboutTexts: { aboutP1: string; aboutP2: string; aboutP3: string };
  processImages?: string[];
  onContact?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const gt = galleryTranslations[lang];

  const nextSlide = useCallback(() => {
    setCurrentSlide((c) => (c + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide, fullscreen]);

  const caption = captions[currentSlide];
  const tabLabels: Record<Tab, string> = { about: gt.about, press: gt.press, shop: gt.shop };

  return (
    <div>
      {/* Divider */}
      <div style={{ borderBottom: "1px solid #eee", marginBottom: 10 }} />

      {/* Hero image with navigation arrows */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        {/* Main image */}
        <div
          onClick={() => setFullscreen(true)}
          style={{
            width: "100%",
            maxHeight: "68vh",
            overflow: "hidden",
            background: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
          }}
        >
          <img
            src={images[currentSlide]}
            alt={caption.title}
            style={{
              maxWidth: "100%",
              maxHeight: "68vh",
              objectFit: "contain",
              display: "block",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* Previous arrow (hover) */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "15%",
            background: "transparent",
            border: "none",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 16,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next arrow (hover) */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "15%",
            background: "transparent",
            border: "none",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 16,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Navigation arrows */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
        fontFamily: "var(--site-font)",
        fontSize: 9,
        color: "#bbb",
      }}>
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span>{currentSlide + 1} / {images.length}</span>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setFullscreen(true)}
          aria-label="Fullscreen"
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <div style={{ marginBottom: 8, fontFamily: "var(--site-font)" }}>
        <div style={{ fontSize: 10, color: "#000" }}>
          <span style={{ fontStyle: "italic" }}>{caption.title}</span>, {caption.date}
        </div>
        <div style={{ fontSize: 9, color: "#999", marginTop: 1 }}>
          {caption.medium}
        </div>
        <div style={{ fontSize: 9, color: "#999" }}>
          {caption.dimensions}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display: "flex",
        gap: 4,
        marginBottom: 16,
        overflowX: "auto",
      }}>
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setCurrentSlide(i)}
            style={{
              width: 36,
              height: 36,
              flexShrink: 0,
              border: i === currentSlide ? "1px solid #bbb" : "1px solid #eee",
              padding: 0,
              background: "none",
              cursor: "none",
              overflow: "hidden",
              opacity: i === currentSlide ? 1 : 0.5,
              transition: "opacity 0.2s ease, border-color 0.2s ease",
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        ))}
      </div>


      {/* Tab navigation */}
      <div style={{ borderTop: "1px solid #eee", marginBottom: 0 }} />
      <div style={{
        display: "flex",
        gap: 18,
        borderBottom: "1px solid #eee",
        marginBottom: 14,
        fontFamily: "var(--site-font)",
        fontSize: 10,
      }}>
        {tabKeys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "6px 0",
              cursor: "none",
              fontSize: 10,
              fontFamily: "var(--site-font)",
              color: activeTab === tab ? "#000" : "#bbb",
              borderBottom: activeTab === tab ? "1px solid #000" : "1px solid transparent",
              marginBottom: -1,
              transition: "color 0.2s ease",
            }}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ minHeight: 480 }}>
        {activeTab === "about" && (
          <div style={{ paddingBottom: 20, fontFamily: "var(--site-font)" }}>
            <div style={{ maxWidth: 480, marginBottom: 100 }}>
              <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
                {aboutTexts.aboutP1}
              </p>
              <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
                {aboutTexts.aboutP2}
              </p>
              <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>
                {aboutTexts.aboutP3}
              </p>
            </div>

            {processImages && processImages.length > 0 && (
              <>
                <div style={{ borderBottom: "1px solid #eee", marginBottom: 20 }} />
                {/* Exhibition images */}
                <div style={{ display: "flex", gap: 16 }}>
                  {processImages.map((src, i) => (
                    <div key={src} style={{ flex: "1 1 0%", maxWidth: 280, minWidth: 0 }}>
                      <div style={{ background: "#f8f8f8", overflow: "hidden", marginBottom: 6 }}>
                        <img src={src} alt={`Process ${i + 1}`} style={{ width: "100%", display: "block" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "press" && (
          <div style={{ paddingBottom: 20, fontFamily: "var(--site-font)" }}>
            <p style={{ fontSize: 10, color: "#bbb" }}>
              {gt.noPress}
            </p>
          </div>
        )}

        {activeTab === "shop" && (
          <div style={{ paddingBottom: 20, fontFamily: "var(--site-font)" }}>
            <p style={{ fontSize: 10, color: "#666", lineHeight: 1.8 }}>
              Prices available upon request.
            </p>
            <p style={{ fontSize: 10, color: "#999", lineHeight: 1.8, marginTop: 8 }}>
              <a href="mailto:reid@reidsurmeier.com" style={{ color: "#666", textDecoration: "none", borderBottom: "1px solid #ddd" }}>reid@reidsurmeier.com</a>
            </p>
            {onContact && (
              <p style={{ fontSize: 10, color: "#999", lineHeight: 1.8, marginTop: 4 }}>
                <span onClick={onContact} style={{ color: "#666", textDecoration: "none", borderBottom: "1px solid #ddd", cursor: "none" }}>Contact form</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Works marquee */}
      <div style={{ borderTop: "1px solid #eee", marginBottom: 8, marginTop: 20 }} />
      <div style={{ fontFamily: "var(--site-font)", fontSize: 10, color: "#bbb", marginBottom: 12 }}>
        {gt.works}
      </div>
      <div style={{ overflow: "hidden", paddingBottom: 40 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            animation: "marqueeScroll 30s linear infinite",
            width: "max-content",
          }}
        >
          {[...images, ...images].map((src, idx) => {
            const i = idx % images.length;
            return (
              <div
                key={`${src}-${idx}`}
                onClick={() => { setCurrentSlide(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ cursor: "none", flexShrink: 0, width: 120, opacity: 0.4, transition: "opacity 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.4"; }}
              >
                <div style={{
                  aspectRatio: "1",
                  overflow: "hidden",
                  background: "#f8f8f8",
                  border: "1px solid #eee",
                  transition: "border-color 0.2s ease",
                  marginBottom: 4,
                }}>
                  <img
                    src={src}
                    alt={captions[i].title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ fontFamily: "var(--site-font)", fontSize: 9, color: "#000" }}>
                  <span style={{ fontStyle: "italic" }}>{captions[i].title}</span>, {captions[i].date}
                </div>
                <div style={{ fontFamily: "var(--site-font)", fontSize: 8, color: "#999", marginTop: 1 }}>
                  {captions[i].medium}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Fullscreen overlay — portalled to body */}
      {fullscreen && createPortal(
        <div
          className="fullscreen-viewer"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <style>{`
            .fullscreen-viewer, .fullscreen-viewer * { cursor: none !important; }
          `}</style>
          {/* Top bar: close button */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px 20px",
            flexShrink: 0,
          }}>
            <button
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Image area with side arrows */}
          <div style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: "0 60px",
            minHeight: 0,
          }}>
            {/* Previous arrow — left side */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.4,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.4"; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <img
              src={images[currentSlide]}
              alt={captions[currentSlide].title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />

            {/* Next arrow — right side */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.4,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.4"; }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Bottom navigation row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "16px 20px",
            flexShrink: 0,
            fontFamily: "var(--site-font)",
            fontSize: 10,
            color: "#bbb",
          }}>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span>{currentSlide + 1} / {images.length}</span>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ── Writing / Library page ────────────────────────────────────────── */

interface WritingEntry {
  title: string;
  author: string;
  year: string;
  category: string;
  cover: string;
  pdf?: string;
  pages?: number;
}

const writingEntries: WritingEntry[] = [
  { title: "You Owe Me", author: "Reid Surmeier", year: "2026", category: "Essay", cover: "/img/overview/HRF_TXT_01_Vorwort.jpg", pdf: "/You Owe Me.pdf", pages: 12 },
  { title: "Vorwort", author: "Markus Landert & Ute Christiane Hoefert", year: "2025", category: "Foreword", cover: "/img/overview/HRF_TXT_01_Vorwort.jpg", pdf: "/HRF_TXT_01_Vorwort.pdf", pages: 2 },
  { title: "Der Konzeptkünstler H. R. Fricker", author: "Markus Landert", year: "2025", category: "Essay", cover: "/img/overview/HRF_TXT_02_Landert-b.jpg", pages: 8 },
  { title: "H. R. Fricker und der Social-Network-Aspekt in der Mail Art", author: "Kornelia Röder", year: "2025", category: "Essay", cover: "/img/overview/HRF_TXT_03_Roeder.jpg", pages: 4 },
  { title: "Angler, Anzettler, Aggressor", author: "Ursula Badrutt", year: "2025", category: "Essay", cover: "/img/overview/HRF_TXT_04_Badrutt.jpg", pages: 3 },
  { title: "Im Gespräch mit H. R. Fricker", author: "Matthias Kuhn", year: "2025", category: "Interview", cover: "/img/overview/HRF_TXT_06_Kuhn.jpg", pages: 6 },
  { title: "Final Press Release", author: "Reid Surmeier", year: "2026", category: "Press", cover: "/img/overview/HRF_TXT_07_Anhang.jpg", pdf: "/FinalReidSurmeierpressrealease.pdf", pages: 1 },
];

const writingCategories = ["Essay", "Foreword", "Interview", "Press"] as const;

/* ── Lectures / Teaching data ─────────────────────────────────────── */

interface LectureEntry {
  title: string;
  institution: string;
  year: string;
  category: string;
  cover: string;
  pdf?: string;
  description?: string;
}

const lectureEntries: LectureEntry[] = [
  { title: "Computational Drawing Practices", institution: "Rhode Island School of Design", year: "2026", category: "Lecture", cover: "/Plotter_1.png", description: "Guest lecture on algorithmic mark-making and pen plotter systems." },
  { title: "Digital Fabrication Studio", institution: "RISD Industrial Design", year: "2025–2026", category: "Teaching", cover: "/plotter_2.png", description: "Teaching assistant for digital fabrication methods." },
  { title: "Introduction to Web Technologies", institution: "RISD Graphic Design", year: "2025", category: "Teaching", cover: "/plotter_4.jpg", description: "Workshop on HTML, CSS, and JavaScript for designers." },
  { title: "Art, Design & the Algorithm", institution: "RISD Liberal Arts", year: "2025", category: "Lecture", cover: "/plotter_5.jpg", description: "Interdisciplinary lecture on generative systems in contemporary art." },
  { title: "Plotter Drawing: Process & Output", institution: "RISD Printmaking", year: "2026", category: "Workshop", cover: "/plotter_6.jpg", description: "Hands-on workshop introducing pen plotters as printmaking tools." },
];

const lectureCategories = ["Lecture", "Teaching", "Workshop"] as const;

function WritingLibrary({ lang }: { lang: Lang }) {
  void lang;
  const [filter, setFilter] = useState<string | null>(null);
  const [openPdf, setOpenPdf] = useState<{ url: string; title: string; author: string; year: string; cover: string; category: string } | null>(null);
  const [pdfVisible, setPdfVisible] = useState(false);
  const filtered = filter ? writingEntries.filter((e) => e.category === filter) : writingEntries;

  // Spine colors from site highlight palette
  const spineColors = [
    "linear-gradient(to bottom, #EFEF3B 33%, #F5F58A 66%, #eee 99%)",
    "linear-gradient(to bottom, #C5D5F0 33%, #D8E4F5 66%, #eee 99%)",
    "linear-gradient(to bottom, #C5A0D0 33%, #D8C0E0 66%, #eee 99%)",
    "linear-gradient(to bottom, #F0C5D5 33%, #F5D8E4 66%, #eee 99%)",
    "linear-gradient(to bottom, #D5F0C5 33%, #E4F5D8 66%, #eee 99%)",
    "linear-gradient(to bottom, #F0D5C5 33%, #F5E4D8 66%, #eee 99%)",
    "linear-gradient(to bottom, #C5F0E8 33%, #D8F5F0 66%, #eee 99%)",
  ];

  const handleOpen = (entry: WritingEntry) => {
    if (entry.pdf) {
      setOpenPdf({ url: entry.pdf, title: entry.title, author: entry.author, year: entry.year, cover: entry.cover, category: entry.category });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPdfVisible(true));
      });
    }
  };

  const handleClosePdf = () => {
    setPdfVisible(false);
    setTimeout(() => setOpenPdf(null), 400);
  };

  // Keyboard close
  useEffect(() => {
    if (!openPdf) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosePdf();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="writing-library" style={{ fontFamily: "var(--site-font)" }}>
      <style>{`
        .writing-library, .writing-library * {
          font-family: var(--site-font) !important;
        }
        .book-card {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
          transform: skewY(-2deg);
          opacity: 0.7;
        }
        .book-card:hover {
          transform: skewY(0deg) scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          opacity: 1;
          z-index: 2;
        }
        .book-spine {
          position: absolute;
          left: -8px;
          top: 0;
          width: 8px;
          height: 100%;
          transform-origin: right;
          border-radius: 2px 0 0 2px;
          opacity: 0.6;
        }
        .book-top {
          position: absolute;
          top: -6px;
          left: -8px;
          right: 0;
          height: 6px;
          background: linear-gradient(to right, #ddd, #eee);
          transform-origin: bottom;
          border-radius: 2px 2px 0 0;
          opacity: 0.6;
        }
      `}</style>

      {/* Divider */}
      <div style={{ borderBottom: "1px solid #eee", marginBottom: 14 }} />

      {/* Filter row */}
      <div style={{
        display: "flex",
        gap: 18,
        marginBottom: 24,
      }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            padding: 0,
            fontFamily: "var(--site-font)",
            fontSize: 11,
            color: filter === null ? "#000" : "#bbb",
            borderBottom: filter === null ? "1px solid #000" : "1px solid transparent",
            paddingBottom: 3,
          }}
        >
          All ({writingEntries.length})
        </button>
        {writingCategories.map((cat) => {
          const count = writingEntries.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                padding: 0,
                fontFamily: "var(--site-font)",
                fontSize: 11,
                color: filter === cat ? "#000" : "#bbb",
                borderBottom: filter === cat ? "1px solid #000" : "1px solid transparent",
                paddingBottom: 3,
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 28,
        paddingBottom: 60,
        paddingTop: 10,
        paddingLeft: 12,
      }}>
        {filtered.map((entry, i) => {
          const spineGradient = spineColors[i % spineColors.length];
          return (
            <div
              key={i}
              style={{ textDecoration: "none", color: "inherit", cursor: "none" }}
              onClick={() => handleOpen(entry)}
            >
              <div className="book-card">
                {/* 3D Spine */}
                <div className="book-spine" style={{ background: spineGradient }} />
                {/* 3D Top edge */}
                <div className="book-top" />

                {/* Cover */}
                <div style={{
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  marginBottom: 8,
                  position: "relative",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                }}>
                  <img
                    src={entry.cover}
                    alt={entry.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* PDF viewer overlay — slides up like homepage detail view */}
      {openPdf && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            transform: pdfVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {/* Header row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            flexShrink: 0,
          }}>
            <div style={{ fontFamily: "var(--site-font)", fontSize: 11, color: "#bbb", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <span style={{ fontStyle: "italic" }}>{openPdf.title}</span>
              <span style={{ color: "#ccc" }}> — {openPdf.author}</span>
            </div>
            <button
              onClick={handleClosePdf}
              style={{
                background: "transparent",
                border: "none",
                cursor: "none",
                fontSize: 13,
                fontFamily: "var(--site-font)",
                color: "#000",
                padding: 0,
                flexShrink: 0,
                marginLeft: 16,
              }}
            >
              &uarr; Back
            </button>
          </div>

          {/* Cover image strip */}
          <div style={{
            padding: "0 20px 8px 44px",
            flexShrink: 0,
            display: "flex",
            alignItems: "flex-end",
            gap: 14,
            borderBottom: "1px solid #eee",
          }}>
            <div style={{
              width: 90,
              height: 120,
              flexShrink: 0,
              overflow: "hidden",
              background: "#f5f5f5",
              boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
            }}>
              <img
                src={openPdf.cover}
                alt={openPdf.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ fontFamily: "var(--site-font)", paddingBottom: 4 }}>
              <div style={{ fontSize: 11, color: "#000", fontStyle: "italic" }}>{openPdf.title}</div>
              <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{openPdf.author}</div>
              <div style={{ fontSize: 9, color: "#bbb", marginTop: 2 }}>{openPdf.year} · {openPdf.category}</div>
            </div>
          </div>

          {/* PDF iframe */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <iframe
              src={openPdf.url}
              title={openPdf.title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function LecturesLibrary({ lang }: { lang: Lang }) {
  void lang;
  const [filter, setFilter] = useState<string | null>(null);
  const [openEntry, setOpenEntry] = useState<LectureEntry | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const filtered = filter ? lectureEntries.filter((e) => e.category === filter) : lectureEntries;

  const spineColors = [
    "linear-gradient(to right, #EFEF3B 33%, #F5F58A 66%, #eee 99%)",
    "linear-gradient(to right, #C5D5F0 33%, #D8E4F5 66%, #eee 99%)",
    "linear-gradient(to right, #C5A0D0 33%, #D8C0E0 66%, #eee 99%)",
    "linear-gradient(to right, #F0C5D5 33%, #F5D8E4 66%, #eee 99%)",
    "linear-gradient(to right, #D5F0C5 33%, #E4F5D8 66%, #eee 99%)",
  ];

  const handleOpen = (entry: LectureEntry) => {
    setOpenEntry(entry);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setDetailVisible(true));
    });
  };

  const handleCloseDetail = () => {
    setDetailVisible(false);
    setTimeout(() => setOpenEntry(null), 400);
  };

  useEffect(() => {
    if (!openEntry) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDetail();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="lectures-library" style={{ fontFamily: "var(--site-font)" }}>
      <style>{`
        .lectures-library, .lectures-library * {
          font-family: var(--site-font) !important;
        }
        .lecture-card {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
          transform: skewX(-2deg);
          opacity: 0.7;
        }
        .lecture-card:hover {
          transform: skewX(0deg) scale(1.06);
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          opacity: 1;
          z-index: 2;
        }
        .lecture-spine {
          position: absolute;
          top: -6px;
          left: 0;
          height: 6px;
          width: 100%;
          transform-origin: bottom;
          border-radius: 2px 2px 0 0;
          opacity: 0.6;
        }
        .lecture-edge {
          position: absolute;
          right: -6px;
          top: -6px;
          width: 6px;
          height: calc(100% + 6px);
          background: linear-gradient(to bottom, #ddd, #eee);
          transform-origin: left;
          border-radius: 0 2px 2px 0;
          opacity: 0.6;
        }
      `}</style>

      {/* Divider */}
      <div style={{ borderBottom: "1px solid #eee", marginBottom: 14 }} />

      {/* Filter row */}
      <div style={{
        display: "flex",
        gap: 18,
        marginBottom: 24,
      }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            padding: 0,
            fontFamily: "var(--site-font)",
            fontSize: 11,
            color: filter === null ? "#000" : "#bbb",
            borderBottom: filter === null ? "1px solid #000" : "1px solid transparent",
            paddingBottom: 3,
          }}
        >
          All ({lectureEntries.length})
        </button>
        {lectureCategories.map((cat) => {
          const count = lectureEntries.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                padding: 0,
                fontFamily: "var(--site-font)",
                fontSize: 11,
                color: filter === cat ? "#000" : "#bbb",
                borderBottom: filter === cat ? "1px solid #000" : "1px solid transparent",
                paddingBottom: 3,
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid — landscape cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 28,
        paddingBottom: 60,
        paddingTop: 10,
        paddingRight: 8,
      }}>
        {filtered.map((entry, i) => {
          const spineGradient = spineColors[i % spineColors.length];
          return (
            <div
              key={i}
              style={{ cursor: "none" }}
              onClick={() => handleOpen(entry)}
            >
              <div className="lecture-card">
                {/* 3D Top spine */}
                <div className="lecture-spine" style={{ background: spineGradient }} />
                {/* 3D Right edge */}
                <div className="lecture-edge" />

                {/* Cover — landscape */}
                <div style={{
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  marginBottom: 8,
                  position: "relative",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                }}>
                  <img
                    src={entry.cover}
                    alt={entry.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detail overlay — slides up */}
      {openEntry && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            transform: detailVisible ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            flexShrink: 0,
          }}>
            <div style={{ fontFamily: "var(--site-font)", fontSize: 11, color: "#bbb", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <span style={{ fontStyle: "italic" }}>{openEntry.title}</span>
              <span style={{ color: "#ccc" }}> — {openEntry.institution}</span>
            </div>
            <button
              onClick={handleCloseDetail}
              style={{
                background: "transparent",
                border: "none",
                cursor: "none",
                fontSize: 13,
                fontFamily: "var(--site-font)",
                color: "#000",
                padding: 0,
                flexShrink: 0,
                marginLeft: 16,
              }}
            >
              &uarr; Back
            </button>
          </div>

          {/* Cover + info */}
          <div style={{
            padding: "0 20px 20px 20px",
            flexShrink: 0,
            borderBottom: "1px solid #eee",
          }}>
            <div style={{
              maxWidth: 400,
              aspectRatio: "4/3",
              overflow: "hidden",
              background: "#f5f5f5",
              boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
              marginBottom: 12,
            }}>
              <img
                src={openEntry.cover}
                alt={openEntry.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ fontFamily: "var(--site-font)" }}>
              <div style={{ fontSize: 13, color: "#000", fontStyle: "italic" }}>{openEntry.title}</div>
              <div style={{ fontSize: 11, color: "#999", marginTop: 3 }}>{openEntry.institution}</div>
              <div style={{ fontSize: 10, color: "#bbb", marginTop: 3 }}>{openEntry.year} · {openEntry.category}</div>
              {openEntry.description && (
                <p style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginTop: 12, maxWidth: 480 }}>
                  {openEntry.description}
                </p>
              )}
            </div>
          </div>

          {/* PDF or empty area */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {openEntry.pdf ? (
              <iframe
                src={openEntry.pdf}
                title={openEntry.title}
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontFamily: "var(--site-font)",
                fontSize: 11,
                color: "#bbb",
              }}>
                Materials coming soon.
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ── Web + UI/UX Case Study page ────────────────────────────────── */

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {label && (
        <div style={{ fontFamily: "var(--site-font)", fontSize: 9, color: "#bbb", marginBottom: 6 }}>{label}</div>
      )}
      <pre style={{
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
        fontSize: 10,
        lineHeight: 1.6,
        color: "#444",
        background: "#f8f8f8",
        border: "1px solid #eee",
        padding: "16px 20px",
        overflow: "auto",
        whiteSpace: "pre",
        margin: 0,
      }}>
        {code}
      </pre>
    </div>
  );
}

function PhoneFrame({ video, caption, loop: shouldLoop = true }: { video: string; caption?: string; loop?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoop || !containerRef.current || !videoRef.current) return;
    const vid = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.currentTime = 0;
          vid.play();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoop]);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        position: "relative",
        width: 240,
        aspectRatio: "608 / 1236",
      }}>
        {/* Screen area — matches frame's transparent cutout exactly */}
        {/* Frame: 608×1236, screen: x=39..568, y=40..1196 */}
        <div style={{
          position: "absolute",
          left: "6.4%",
          top: "3.2%",
          width: "87%",
          height: "93.5%",
          overflow: "hidden",
          background: "#fff",
          zIndex: 1,
        }}>
          <video
            ref={videoRef}
            src={video}
            autoPlay
            loop={shouldLoop}
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Phone frame overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/phone-frame.png"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </div>
      {caption && (
        <div style={{ fontFamily: "var(--site-font)", fontSize: 9, color: "#bbb", marginTop: 14, textAlign: "center", maxWidth: 200 }}>{caption}</div>
      )}
    </div>
  );
}

function CaseStudyImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <div style={{ marginBottom: caption ? 8 : 40 }}>
      <div style={{
        overflow: "hidden",
        border: "1px solid #eee",
        background: "#f8f8f8",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption || ""}
          style={{ width: "100%", display: "block" }}
        />
      </div>
      {caption && (
        <div style={{ fontFamily: "var(--site-font)", fontSize: 9, color: "#bbb", marginTop: 6, marginBottom: 32 }}>{caption}</div>
      )}
    </div>
  );
}

const caseStudySlides = [
  { src: "/Screenshot%202026-02-15%20at%2012.25.50%E2%80%AFPM.png", caption: "Homepage — bio text with highlighted disciplines, staggered book cover grid, sidebar navigation" },
  { src: "/Screenshot%202026-02-15%20at%202.54.34%E2%80%AFPM.png", caption: "Curriculum Vitae — interactive timeline with education, exhibitions, awards, and experience" },
  { src: "/Screenshot%202026-02-15%20at%208.31.11%E2%80%AFPM.png", caption: "Writing — library grid with 3D book spine effect and category filters" },
  { src: "/Screenshot%202026-02-14%20at%209.26.45%E2%80%AFPM.png", caption: "Bio text — highlighted discipline keywords with colored backgrounds" },
];

function CaseStudySlideshow() {
  const [current, setCurrent] = useState(0);
  const prev = useCallback(() => setCurrent(i => (i - 1 + caseStudySlides.length) % caseStudySlides.length), []);
  const next = useCallback(() => setCurrent(i => (i + 1) % caseStudySlides.length), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const slide = caseStudySlides[current];

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Main image */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <div style={{
          width: "100%",
          maxHeight: "68vh",
          overflow: "hidden",
          background: "#f8f8f8",
          border: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.caption}
            style={{
              maxWidth: "100%",
              maxHeight: "68vh",
              objectFit: "contain",
              display: "block",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* Prev arrow (hover) */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "15%",
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "flex-start",
            paddingLeft: 16, opacity: 0, transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next arrow (hover) */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "15%",
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            paddingRight: 16, opacity: 0, transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Nav + counter */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
        fontFamily: "var(--site-font)", fontSize: 9, color: "#bbb",
      }}>
        <button onClick={prev} aria-label="Previous" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span>{current + 1} / {caseStudySlides.length}</span>
        <button onClick={next} aria-label="Next" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <div style={{ fontFamily: "var(--site-font)", fontSize: 9, color: "#bbb", marginBottom: 10 }}>
        {slide.caption}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 4 }}>
        {caseStudySlides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setCurrent(i)}
            style={{
              width: 48, height: 36, flexShrink: 0,
              border: i === current ? "1px solid #bbb" : "1px solid #eee",
              padding: 0, background: "none", cursor: "pointer", overflow: "hidden",
              opacity: i === current ? 1 : 0.5,
              transition: "opacity 0.2s ease, border-color 0.2s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function CaseStudyPage() {
  const codeLeaderLine = `const drawLines = useCallback(
  (sourceRef, targets) => {
    const LL = window.LeaderLine;
    const container = cover2Ref.current.parentElement;
    const coverEls = Array.from(container.children);
    const rects = coverEls.map(el => el.getBoundingClientRect());

    // Group covers into rows by bottom-Y (flex-end aligned)
    const rowBuckets = new Map();
    for (const r of rects) {
      const key = Math.round(r.bottom / 20) * 20;
      const row = rowBuckets.get(key);
      if (row) {
        row.top = Math.min(row.top, r.top);
        row.bottom = Math.max(row.bottom, r.bottom);
      } else {
        rowBuckets.set(key, { top: r.top, bottom: r.bottom });
      }
    }

    // Route lines through gap corridors between rows
    const rows = Array.from(rowBuckets.values())
      .sort((a, b) => a.top - b.top);
    const gaps = [rows[0].top - 10];
    for (let i = 0; i < rows.length - 1; i++) {
      gaps.push((rows[i].bottom + rows[i + 1].top) / 2);
    }

    for (const { ref, color } of targets) {
      // Create waypoints and draw segmented leader lines
      new LL(startWp, corridorWp, { path: "straight", color, size: 2 });
      new LL(corridorWp, gapWp, { path: "straight", color, size: 2 });
      new LL(gapWp, targetWp, { path: "straight", color, size: 2 });
    }
  }, [createWaypoint, typingDone, isHomePage]
);`;

  const codeBookCard = `.book-card {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  transform: skewY(-2deg);
  opacity: 0.7;
}
.book-card:hover {
  transform: skewY(0deg) scale(1.08);
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  opacity: 1;
  z-index: 2;
}
.book-spine {
  position: absolute;
  left: -8px;
  top: 0;
  width: 8px;
  height: 100%;
  transform-origin: right;
  border-radius: 2px 0 0 2px;
  opacity: 0.6;
}`;

  const codeTypewriter = `function TypewriterText({ children, delay = 0, speed = 40 }) {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const FADE_WINDOW = 4;
  const totalSteps = Array.from(children).length + FADE_WINDOW;

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || charCount >= totalSteps) return;
    const timer = setTimeout(() => setCharCount(c => c + 1), speed);
    return () => clearTimeout(timer);
  }, [started, charCount, totalSteps, speed]);

  return (
    <span>
      {Array.from(children).map((char, i) => {
        let opacity = 0;
        if (i < charCount - FADE_WINDOW) opacity = 1;
        else if (i < charCount) opacity = (charCount - i) / FADE_WINDOW;
        return <span style={{ opacity, transition: "opacity 0.2s ease" }}>{char}</span>;
      })}
    </span>
  );
}`;

  const codeCVAnimation = `// Nodes positioned by percentage coordinates on a responsive canvas
const nodes: CVNode[] = [
  { id: "risd", section: "education", x: 68, y: 6, label: "RISD",
    sublabel: "B.F.A., Art & Computation + PT" },
  { id: "unthought", section: "exhibition", tag: "S", x: 78, y: 36,
    label: "Unthought: Somewhere and Elsewhere" },
  // ...20+ nodes across education, exhibition, award, experience
];

// Staggered reveal: nodes appear left-to-right, edges draw after both endpoints visible
useEffect(() => {
  sortedNodes.forEach((node, i) => {
    setTimeout(() => {
      setVisibleNodes(prev => new Set(prev).add(node.id));
    }, 400 + i * 120);
  });

  edges.forEach((edge) => {
    const laterIdx = Math.max(
      sortedNodes.findIndex(n => n.id === edge.from),
      sortedNodes.findIndex(n => n.id === edge.to)
    );
    setTimeout(() => {
      setAnimatedEdges(prev => new Set(prev).add(edge.id));
    }, 400 + laterIdx * 120 + 200);
  });
}, [sortedNodes]);

// Edge SVG: stroke-dashoffset animates from line length to 0
<line
  strokeDasharray={lineLength}
  strokeDashoffset={isAnimated ? 0 : lineLength}
  style={{
    transition: isAnimated
      ? "stroke-dashoffset 600ms ease-out"
      : "none",
  }}
/>`;

  const codeCursor = `export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const onMove = (e) => {
      cursor.style.left = \`\${e.clientX}px\`;
      cursor.style.top = \`\${e.clientY}px\`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={cursorRef} style={{
      position: "fixed",
      width: 8, height: 8,
      background: "transparent",
      border: "1px solid #ccc",
      pointerEvents: "none",
      zIndex: 999999,
      transform: "translate(-50%, -50%)",
      mixBlendMode: "difference",
    }} />
  );
}`;

  return (
    <div className="case-study-page" style={{ fontFamily: "var(--site-font)" }}>
      <style>{`
        .case-study-page, .case-study-page * {
          font-family: var(--site-font) !important;
        }
        .case-study-page pre, .case-study-page pre * {
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important;
        }
      `}</style>

      {/* Divider */}
      <div style={{ borderBottom: "1px solid #eee", marginBottom: 30 }} />

      {/* Project Title */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 16, color: "#000", fontWeight: 600 }}>reidsurmeier.com</div>
      </div>

      {/* Meta row */}
      <div style={{ fontSize: 10, color: "#999", lineHeight: 1.8, marginBottom: 30 }}>
        <span>Design & Development</span>
        <span style={{ color: "#ddd" }}> / </span>
        <span>2025–2026</span>
        <span style={{ color: "#ddd" }}> / </span>
        <span>Next.js, React, TypeScript, leader-line.js</span>
      </div>

      {/* Phone Mockups — side by side, right below title */}
      <div style={{ display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap", marginBottom: 50, padding: "20px 0" }}>
        <PhoneFrame
          video="/mobile-home.mp4"
          caption="Homepage — bio, book covers, typewriter animation"
          loop={false}
        />
        <PhoneFrame
          video="/mobile-cv.mp4"
          caption="CV — timeline nodes, staggered reveal"
        />
      </div>

      <div style={{ borderBottom: "1px solid #eee", marginBottom: 40 }} />

      {/* Image slideshow */}
      <CaseStudySlideshow />

      {/* Overview */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>Overview</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            A personal portfolio and studio website built as a single-page application with persistent sidebar navigation, multilingual support across seven languages, and interactive data visualization connecting sidebar categories to featured works through animated leader lines.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            The site functions as both a portfolio and an exhibition platform — each discipline (prints, painting, writing, lectures) opens a dedicated sub-page with its own interaction model: Gagosian-style image exhibitions with fullscreen viewers, 3D book grids with inline PDF readers, and long-scroll case studies.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            Every interface element is custom: the cursor, the typewriter text animations, the staggered reveal of book covers, the leader line routing algorithm that paths connections through gaps between flex-wrapped rows.
          </p>
        </div>
      </div>


      {/* Architecture */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>Architecture & Stack</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            Built with Next.js 14 and React, the site is a single-page application where all content renders within one route. Navigation state is managed through React state and the History API, enabling browser back/forward without full page reloads.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            The sidebar remains persistent across all views. Hover interactions on sidebar links trigger a leader line routing system that draws SVG connections from the label to its associated book covers in the main content area. Lines are routed through computed gap corridors between flex-wrapped rows to avoid overlapping content.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            Overlays (fullscreen image viewer, PDF reader, detail panels) are rendered via React portals to escape CSS transform containment, ensuring fixed positioning works correctly regardless of parent transforms.
          </p>
        </div>
      </div>

      {/* Code: Leader Lines */}
      <CodeBlock code={codeLeaderLine} label="Leader line routing — computing gap corridors between flex-wrapped cover rows" />

      {/* CV Timeline Animation */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>CV Timeline Animation</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            The curriculum vitae page is built as an interactive network diagram rather than a traditional list. Each entry — education, exhibitions, awards, experience — is a node positioned on a percentage-based coordinate system (0–100 on both axes), with edges connecting related entries to show the chronological and conceptual flow of a career.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            On load, nodes appear sequentially sorted by x-coordinate (left to right, earliest to latest) with a 120ms stagger between each. Each node fades in with a translateY transition. Edges animate in after both of their connected nodes are visible, using SVG stroke-dashoffset — the dash array is set to the line&apos;s computed pixel length, then the offset transitions from that length to zero, creating a drawing effect that traces the connection path.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            Hovering a node highlights its connected edges and dims all unrelated content. Section categories (Education, Shows, Awards, Experience) use distinct colors and icon shapes — circles for exhibitions and experience, squares for education and awards — drawn in a persistent legend row above the diagram.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            On mobile (&lt;1200px), the network diagram transforms into a chronological list grouped by year, with collapsible descriptions on tap. The layout switch uses a window-width check rather than canvas size to avoid oscillation between the two modes during resize.
          </p>
        </div>
      </div>

      {/* Code: CV Animation */}
      <CodeBlock code={codeCVAnimation} label="CV timeline — staggered node reveal and edge drawing animation" />


      {/* Interactive Features */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>Interactive Features</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            A custom cursor replaces the system default site-wide using a fixed-position div that tracks mouse movement, rendered with mix-blend-mode: difference for visibility against any background. The cursor maintains its z-index above all content including fullscreen overlays.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            Text throughout the site is animated with a typewriter effect that reveals characters sequentially with a fading opacity window — each character transitions from transparent to opaque as the typing position advances, creating a smooth fade-in rather than a hard character-by-character pop.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            The writing library renders books as 3D objects with CSS transforms: skewY(-2deg) creates a resting tilt, hover transitions to skewY(0deg) scale(1.08) with a shadow expansion. Pseudo-elements create the spine and top edge with gradient fills drawn from the site&apos;s highlight color palette.
          </p>
        </div>
      </div>

      {/* Code: 3D Book Card */}
      <CodeBlock code={codeBookCard} label="3D book card — CSS skew transform with spine pseudo-element" />

      {/* Code: Typewriter */}
      <CodeBlock code={codeTypewriter} label="TypewriterText — character-by-character reveal with opacity fade window" />


      {/* Multilingual */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>Multilingual System</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            The site supports seven languages — English, German, French, Korean, Indonesian, Chinese, and Japanese — with translations stored as typed Record objects keyed by language code. The language selector in the header switches all visible text simultaneously including bio, sidebar labels, exhibition captions, and UI chrome.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            Exhibition pages carry their own translation sets for artwork captions (title, medium, dimensions) adapted to each locale&apos;s conventions — metric dimensions for non-English, localized medium descriptions, and culturally appropriate title translations.
          </p>
        </div>
      </div>

      {/* Responsive Design */}
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontSize: 13, color: "#000", fontWeight: 600, marginBottom: 12 }}>Responsive Design</div>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
            The site adapts to mobile with a collapsible hamburger menu replacing the persistent sidebar, simplified bio layout as a single column, and touch-optimized interactions. The CV page transforms from an interactive network diagram into a chronological list grouped by year.
          </p>
          <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7 }}>
            Gallery pages, book covers, and exhibition images reflow to single-column layouts with adjusted spacing and typography scales using CSS clamp() for fluid sizing between breakpoints.
          </p>
        </div>
      </div>

      {/* Code: Custom Cursor */}
      <CodeBlock code={codeCursor} label="CustomCursor — fixed-position tracking with mix-blend-mode: difference" />

      {/* Footer spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}

export default function GalleryPage({
  onClose,
  title,
  inputLabel,
  lang = "en",
  onContact,
}: {
  onClose: () => void;
  title: string;
  inputLabel: string;
  lang?: Lang;
  onContact?: () => void;
}) {
  void onClose;
  const [loaderDone, setLoaderDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const isPrints = inputLabel === "Input_008";
  const isPainting = inputLabel === "Input_010";
  const isSculpture = inputLabel === "Input_011";
  const isArchive = inputLabel === "Input_012";
  const isWriting = inputLabel === "Input_013";
  const isLectures = inputLabel === "Input_014";
  const isWebUi = inputLabel === "Input_015";
  const gt = galleryTranslations[lang];

  const renderExhibition = () => {
    if (isPrints) {
      return (
        <ExhibitionPage
          lang={lang}
          images={printsImages}
          captions={printsCaptions[lang]}
          aboutTexts={galleryTranslations[lang]}
          processImages={["/Plotter_1.png", "/plotter_2.png"]}
          onContact={onContact}
        />
      );
    }
    if (isPainting) {
      return (
        <ExhibitionPage
          lang={lang}
          images={paintingImages}
          captions={paintingCaptions[lang]}
          aboutTexts={paintingTranslations[lang]}
          onContact={onContact}
        />
      );
    }
    if (isWriting) {
      return <WritingLibrary lang={lang} />;
    }
    if (isLectures) {
      return <LecturesLibrary lang={lang} />;
    }
    if (isWebUi) {
      return <CaseStudyPage />;
    }
    if (isSculpture || isArchive) {
      return (
        <p style={{
          fontFamily: "var(--site-font)",
          fontSize: 18,
          color: "#bbb",
          marginTop: 40,
        }}>
          Images coming soon.
        </p>
      );
    }
    return (
      <p style={{
        fontFamily: "var(--site-font)",
        fontSize: 11,
        color: "#bbb",
      }}>
        {gt.comingSoon}
      </p>
    );
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {!loaderDone && (
        <TextScatterLoader
          text={title}
          amount={isPrints ? 2 : isPainting ? 3 : 6}
          fontSize={2.5}
          interval={20}
          windowSize={15}
          duration={isPrints ? 1000 : isPainting ? 1000 : 1600}
          onDone={() => setLoaderDone(true)}
        />
      )}
      {/* Header — hidden for Writing */}
      {!isWriting && !isWebUi && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--site-font)",
            fontSize: 11,
            color: "#bbb",
            paddingBottom: 4,
            paddingLeft: 30,
            marginRight: 20,
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <span>{inputLabel}</span>
            <span>{title}</span>
          </div>
        </div>
      )}

      {/* Gallery content area */}
      <div
        style={{
          flex: 1,
          paddingTop: 14,
          paddingLeft: 30,
          paddingRight: "clamp(40px, 8vw, 160px)",
          overflowY: "auto",
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {renderExhibition()}
      </div>
    </div>
  );
}
