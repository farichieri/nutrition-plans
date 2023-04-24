import Footer from "../Footer";
import Head from "next/head";
import SignBar from "../Nav/SignBar";

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
        <SignBar />
        <div className="flex h-full w-full max-w-5xl flex-col items-center px-4 pt-[var(--nav-h)]">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
