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
        <title>Nutrition Plans CO</title>
      </Head>
      <>
        <NavBar />
        <div className="flex h-full min-h-screen w-full flex-col items-center bg-primary-color px-4 ">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
