import Head from "next/head";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Nav/Nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Nutrition Plans CO</title>
      </Head>
      <>
        <NavBar />
        <main className="flex z-10 h-full min-h-screen w-full flex-col items-center px-4 pt-[var(--nav-h)]">
          {children}
        </main>
        <Footer />
      </>
    </>
  );
}
