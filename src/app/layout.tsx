import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutrition Plans",
  description: "An app for managing your nutrition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
