import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import AnimatedFavicon from "./components/AnimatedFavicon";

export const metadata: Metadata = {
  title: {
    default: "Reid Surmeier, I.S.P. — Independent Studio Practice",
    template: "%s | Reid Surmeier",
  },
  description:
    "Reid Surmeier, I.S.P. — Independent Studio Practice. Multidisciplinary designer and artist working across computation, painting, sculpture, prints, and writing. Based at Rhode Island School of Design.",
  keywords: [
    "Reid Surmeier",
    "I.S.P.",
    "Independent Studio Practice",
    "RISD",
    "Rhode Island School of Design",
    "computation",
    "painting",
    "sculpture",
    "prints",
    "plotter drawings",
    "writing",
    "multidisciplinary artist",
    "designer",
    "AxiDraw",
    "pen plotter",
    "digital fabrication",
  ],
  authors: [{ name: "Reid Surmeier" }],
  creator: "Reid Surmeier",
  metadataBase: new URL("https://reidsurmeier.wtf"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reidsurmeier.wtf",
    siteName: "Reid Surmeier, I.S.P.",
    title: "Reid Surmeier, I.S.P. — Independent Studio Practice",
    description:
      "Multidisciplinary designer and artist working across computation, painting, sculpture, prints, and writing. Prints — AxiDraw pen plotter drawings. Painting — mixed media works. Sculpture — three-dimensional explorations. Writing — essays and critical texts. About — studio practice and biography.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reid Surmeier, I.S.P.",
    description:
      "Multidisciplinary designer and artist — prints, painting, sculpture, writing, and about.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `/*
      RSRSRSRSba   RSRSRSRSRS8  RS  RSRSRSRSba,
      RS      "8b  RS           RS  RS      \`"8b
      RS      ,8P  RS           RS  RS        \`8b
      RSaaaaaa8P'  RSaaaaa      RS  RS         RS
      RS""""RS'    RS"""""      RS  RS         RS
      RS    \`8b    RS           RS  RS         8P
      RS     \`8b   RS           RS  RS      .a8P
      RS      \`8b  RSRSRSRSRS8  RS  RSRSRSRSY"'


       adRSRS8ba   RS        RS  RSRSRSRSba   RSb           dRS  RSRSRSRSRS8  RS  RSRSRSRSRS8  RSRSRSRSba
      d8"     "8b  RS        RS  RS      "8b  RS8b         dRS8  RS           RS  RS           RS      "8b
      Y8,          RS        RS  RS      ,8P  RS\`8b       d8'RS  RS           RS  RS           RS      ,8P
      \`Y8aaaaa,    RS        RS  RSaaaaaa8P'  RS \`8b     d8' RS  RSaaaaa      RS  RSaaaaa      RSaaaaaa8P'
        \`"""""8b,  RS        RS  RS""""RS'    RS  \`8b   d8'  RS  RS"""""      RS  RS"""""      RS""""RS'
              \`8b  RS        RS  RS    \`8b    RS   \`8b d8'   RS  RS           RS  RS           RS    \`8b
      Y8a     a8P  Y8a.    .a8P  RS     \`8b   RS    \`RS8'    RS  RS           RS  RS           RS     \`8b
       "YRSRS8P"    \`"YRSRSY"'   RS      \`8b  RS     \`8'     RS  RSRSRSRSRS8  RS  RSRSRSRSRS8  RS      \`8b


       I8,        8        ,8I  RSRSRSRSRSRS  RSRSRSRSRS8
       \`8b       d8b       d8'       RS       RS
        "8,     ,8"8,     ,8"        RS       RS
         Y8     8P Y8     8P         RS       RSaaaaa
         \`8b   d8' \`8b   d8'         RS       RS"""""
          \`8a a8'   \`8a a8'          RS       RS
      RS8  \`8a8'     \`8a8'           RS       RS
      RS8   \`8'       \`8'            RS       RS

      (graphic design and programming by Reid Surmeier)
*/` }} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Reid Surmeier",
              url: "https://reidsurmeier.wtf",
              jobTitle: "Multidisciplinary Designer and Artist",
              affiliation: {
                "@type": "EducationalOrganization",
                name: "Rhode Island School of Design",
              },
              knowsAbout: [
                "Prints",
                "Painting",
                "Sculpture",
                "Writing",
                "Computation",
                "Pen Plotter Drawing",
                "Digital Fabrication",
              ],
              sameAs: [
                "https://www.instagram.com/reidsurmeier/",
                "https://www.are.na/reid-surmeier/channels",
              ],
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="/leader-line.min.js" defer />
      </head>
      <body>
        <AnimatedFavicon />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
