import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roxas Dental | Patient Engagement",
  description: "Interactive patient engagement demo for modules 16, 17, 18, 24 and 25.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
