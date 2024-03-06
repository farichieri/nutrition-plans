import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectAuthSlice } from "@/features/authentication";
import { AppRoutes } from "@/utils";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Nav/Nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        router.push(AppRoutes.today);
      }
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Nutrition Plans CO</title>
      </Head>
      <>
        <NavBar />
        <main className="flex z-10 h-full min-h-screen w-full flex-col items-center pt-[var(--nav-h)]">
          {children}
        </main>
        <Footer />
      </>
    </>
  );
}
