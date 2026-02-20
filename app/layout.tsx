import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smetana Run — Survive Poland. One phrase at a time.",
  description: "The most fun way to learn basic Polish. Audio phrasebook with cinematic flair.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
