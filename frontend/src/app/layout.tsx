import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SID PDF — Smart PDF Tools, Indonesian Document Processor",
  description:
    "SID PDF adalah aplikasi pengolah PDF modern berbasis web. Konversi, kompres, edit, gabung, pisah, watermark, dan proteksi PDF tanpa batas. Dibangun dengan standar ISO 32000 dan riset akademik.",
  keywords: ["PDF", "convert PDF", "compress PDF", "edit PDF", "merge PDF", "watermark", "Indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        {children}
      </body>
    </html>
  );
}
