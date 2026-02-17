import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import AnimatedFavicon from "./components/AnimatedFavicon";

export const metadata: Metadata = {
  title: "Reid Surmeier, I.S.P.",
  description:
    "Reid Surmeier, I.S.P. — Independent Studio Practice. Multidisciplinary designer and artist working across computation, painting, and sculpture.",
  keywords:
    "Reid Surmeier, I.S.P., Independent Studio Practice, RISD, computation, painting, sculpture",
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
