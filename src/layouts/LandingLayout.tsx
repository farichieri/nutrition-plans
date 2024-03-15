import Head from "next/head";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { Nav } from "@/components";
import { selectAuthSlice } from "@/features/authentication";

import Footer from "../components/Footer/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (user) {
  //       router.push(AppRoutes.today);
  //     }
  //   }
  // }, [user, router]);

  return (
    <>
      <Head>
        <title>Nutrition Plans CO</title>
      </Head>
      <>
        <Nav />
        <main className="flex z-10 h-full min-h-screen w-full flex-col items-center pt-[var(--nav-h)]">
          {children}
        </main>
        <Footer />
      </>
    </>
  );
}
