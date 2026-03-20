import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Tayyab — CS Student & Developer",
  description: "Portfolio of Ali Tayyab — CS student, full-stack developer, and builder of AI-powered web apps.",
  keywords: ["Ali Tayyab", "portfolio", "developer", "Next.js", "Pakistan"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
