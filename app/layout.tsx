import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tessilo — Premium B2B Furniture Solutions",
  description:
    "Tessilo is a premium B2B furniture supplier for hospitality, commercial, executive and custom contract projects.",
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
      <body>{children}</body>
    </html>
  );
}
