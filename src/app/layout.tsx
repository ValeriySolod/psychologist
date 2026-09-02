import type { Metadata } from "next";
import { Manrope, Nunito_Sans, Playfair_Display } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "@/styles/globals.scss";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Марина Гнатюк | Психологиня-коучиня",
  description: "Психологічна онлайн-підтримка українською під час війни.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${playfairDisplay.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
