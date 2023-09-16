import Footer from "./components/Footer/Footer";
import Head from "next/head";
import NavBar from "./components/Nav/Nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      <>
        <NavBar />
        <div className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center px-4 pt-[var(--nav-h)]">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
