import { Theme } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PremiumNav from "../Nav/PremiumNav";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>();

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
        <>
          <PremiumNav theme={theme} />
          <section className="flex flex-col px-4 pt-[var(--nav-h)]">
            {children}
          </section>
        </>
      )}
    </>
  );
}
