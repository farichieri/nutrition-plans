import Footer from "./components/Footer/Footer";
import Head from "next/head";
import NavBar from "./components/Nav/Nav";

export default function SignLayout({
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
        <div className="app-bg dark:app-bg-dark flex h-full min-h-screen w-full flex-col items-center px-4 ">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
