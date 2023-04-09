import Footer from "../Footer";
import NavBar from "../NavBar";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Theme } from "@/types/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nutrition Plans",
  description: "The best nutrition plans on the internet",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>();

  // useEffect(() => {
  //   dispatch(verifyUser());
  //   console.log("Verifying User");
  //   onAuthStateChanged(auth, async (user) => {
  //     console.log({ user });

  //     dispatch(userVerified(user));
  //     if (user) {
  //       const settings = await getUserSettings(user);
  //       settings && dispatch(setUserSettings(settings));
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme === "dark";
      setTheme(Theme.dark);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme === "light";
      setTheme(Theme.light);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {theme && (
        <div className={inter.className}>
          <NavBar theme={theme} />
          <main className="min-w-screen flex min-h-screen flex-col items-center justify-between pt-[var(--nav-h)]">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
