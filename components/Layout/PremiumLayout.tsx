import { Theme } from "@/types/types";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Head from "next/head";
import NavBar from "../NavBar";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <>
          {/* <NavBar theme={theme} /> */}
          <section className="flex flex-col px-4 pt-[var(--nav-h)]">
            {children}
          </section>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}
