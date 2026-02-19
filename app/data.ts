export interface TileData {
  id: string;
  title: string;
  subtitle?: string;
  range: string;
  thumbnail: string;
  pdf?: string;
  stripeImage?: string;
}

export const txtTiles: TileData[] = [
  {
    id: "vorwort",
    title: "Markus Landert und Ute Christiane Hoefert",
    subtitle: "Vorwort",
    range: "I/1–I/2",
    thumbnail: "/img/overview/HRF_TXT_01_Vorwort.jpg",
    pdf: "/HRF_TXT_01_Vorwort.pdf",
    stripeImage: "/HRF_TXT_01_Vorwort.jpg",
  },
  {
    id: "landert",
    title: "Markus Landert",
    subtitle: "Der Konzeptkünstler H. R. Fricker\nSichtung eines Lebenswerks",
    range: "II/1–II/8",
    thumbnail: "/img/overview/HRF_TXT_02_Landert-b.jpg",
  },
  {
    id: "roeder",
    title: "Kornelia Röder",
    subtitle:
      "H. R. Fricker und der Social-Network-Aspekt in der Mail Art\nEine Positionsbestimmung",
    range: "III/1–III/4",
    thumbnail: "/img/overview/HRF_TXT_03_Roeder.jpg",
  },
  {
    id: "badrutt",
    title: "Ursula Badrutt",
    subtitle:
      "Angler, Anzettler, Aggressor\nZu den Strategien des künstlerischen Köderns, untersucht an ausgewählten Auftrags- und anderen Arbeiten von H. R. Fricker zwischen Ida Schläpfer und Nationalfeiertag",
    range: "IV/1–IV/3",
    thumbnail: "/img/overview/HRF_TXT_04_Badrutt.jpg",
  },
  {
    id: "kuhn",
    title: "Matthias Kuhn",
    subtitle: "Im Gespräch mit H. R. Fricker\nSelbstbeschreibungen",
    range: "VI/1–VI/6",
    thumbnail: "/img/overview/HRF_TXT_06_Kuhn.jpg",
  },
  {
    id: "anhang",
    title: "Anhang",
    range: "VII/1–VII/6",
    thumbnail: "/img/overview/HRF_TXT_07_Anhang.jpg",
  },
];

export const imgTiles: TileData[] = [
  {
    id: "fotografieren",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nFotografieren",
    range: "1.01-1.22",
    thumbnail: "/img/overview/HRF_IMG_1.01-1.22.jpg",
  },
  {
    id: "plakatieren",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nPlakatieren",
    range: "2.01-2.35",
    thumbnail: "/img/overview/HRF_IMG_2.01-2.35.jpg",
  },
  {
    id: "aufrufen",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nAufrufen",
    range: "3.01-3.24",
    thumbnail: "/img/overview/HRF_IMG_3.01-3.24.jpg",
  },
  {
    id: "kommunizieren",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nKommunizieren",
    range: "4.01-4.83",
    thumbnail: "/img/overview/HRF_IMG_4.01-4.83.jpg",
  },
  {
    id: "vernetzen",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nVernetzen",
    range: "5.01-5.55",
    thumbnail: "/img/overview/HRF_IMG_5.01-5.55.jpg",
  },
  {
    id: "besetzen",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nBesetzen",
    range: "6.01-6.44",
    thumbnail: "/img/overview/HRF_IMG_6.01-6.44.jpg",
  },
  {
    id: "benennen",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nBenennen",
    range: "7.01-7.45",
    thumbnail: "/img/overview/HRF_IMG_7.01-7.45.jpg",
  },
  {
    id: "gruenden",
    title: "Ute Christiane Hoefert",
    subtitle: "Werkzusammenstellung zum Schaffen von H. R. Fricker\nGründen",
    range: "8.01-8.42",
    thumbnail: "/img/overview/HRF_IMG_8.01-8.42.jpg",
  },
];
