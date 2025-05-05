import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Niumedia Studio",
  description: "Niumedia Networks Sanity Studio",
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
