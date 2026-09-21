import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basera — Pakistan's Property Marketplace",
  description:
    "Search verified houses, apartments, plots and commercial properties for sale and rent across Islamabad, Lahore, Karachi, Rawalpindi, Faisalabad and Multan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
