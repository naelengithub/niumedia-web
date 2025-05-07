import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Niumedia",
  description: "Niumedia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-neue">
        <Navbar className="text-white mix-blend-difference" />
        {children}
      </body>
    </html>
  );
}
