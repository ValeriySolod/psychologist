import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Марина Гнатюк | Психологиня-коучиня",
  description: "Психологічна онлайн-підтримка українською під час війни.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
