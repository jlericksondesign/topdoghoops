import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, pixelifySans, barlow } from "./fonts";

export const metadata: Metadata = {
  title: "Top Dog Hoops",
  description: "Mobile-first basketball shot challenge PWA for players and families.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pixelifySans.variable} ${barlow.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
