import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ReverseRecruit — Reverse Recruiting & Job Autopilot",
  description: "We find, tailor, and apply to 150+ verified engineering roles on your behalf until you land a minimum of 5 tech interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-apple-bg text-apple-text antialiased">
      <body className="min-h-screen flex flex-col bg-apple-bg text-apple-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
