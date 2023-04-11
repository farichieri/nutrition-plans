import { Theme } from "@/types/types";
import { useEffect, useState } from "react";
import Head from "next/head";
import PremiumNav from "../Nav/PremiumNav";
import Sidebar from "../Sidebar/PremiumSidebar";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <div className="relative flex h-screen w-screen justify-center">
            <div className="relative flex w-screen flex-col items-center">
              <PremiumNav
                theme={theme}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <div className="flex flex-col px-4 pt-[var(--nav-h)]">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
