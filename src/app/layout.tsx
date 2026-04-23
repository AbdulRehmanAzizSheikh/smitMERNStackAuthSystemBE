import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth App - MERN to Next.js",
  description: "Complete authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
