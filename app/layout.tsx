import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "Cosmic Genesis - Journey Through Space & Time",
  description: "Experience the birth of worlds, supernovas, and cosmic phenomena",
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
