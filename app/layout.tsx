import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Theme } from "types/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nutrition Plans",
  description: "The best nutrition plans on the internet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme =
    cookies().get("theme")?.value === "dark" ? Theme.dark : Theme.light;

  return (
    <html lang="en" className={theme}>
      <body className={inter.className}>
        <NavBar theme={theme} />
        <main className="min-w-screen flex min-h-screen flex-col items-center justify-between pt-[var(--nav-h)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
