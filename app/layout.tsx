import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "Cosmic Genesis - Journey Through Space & Time",
  description: "Experience the birth of worlds, supernovas, and cosmic phenomena",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
