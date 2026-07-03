import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const pixelifySans = localFont({
  src: "../public/fonts/Pixelify_Sans/PixelifySans-VariableFont_wght.ttf",
  variable: "--font-pixelify",
  display: "swap",
  weight: "400 700",
});

export const barlow = localFont({
  src: [
    {
      path: "../public/fonts/Barlow/Barlow-Black.ttf",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-barlow",
  display: "swap",
});
