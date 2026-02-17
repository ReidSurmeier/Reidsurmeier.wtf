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
