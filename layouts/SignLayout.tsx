import Footer from "./components/Footer/Footer";
import Head from "next/head";
import SignBar from "./components/Nav/SignBar";
import { useRouter } from "next/router";

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      <>
        <SignBar />
        <div className="flex h-full min-h-screen w-full max-w-5xl flex-col items-center px-4 ">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
