import Footer from "../Footer";
import Head from "next/head";
import NavBar from "../Nav/Nav";
import { useSelector } from "react-redux";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useSelector(selectLayoutSlice);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {theme && (
        <>
          <NavBar theme={theme} />
          <div className="flex h-full w-full flex-col items-center px-4 pt-[var(--nav-h)]">
            {children}
          </div>
          <Footer />
        </>
      )}
      {/* <style jsx>{`
        div {
          background: radial-gradient(
            ellipse 80% 50% at 50% -20%,
            rgb(123 198 119 / 0.3),
            transparent
          );
        }
      `}</style> */}
    </>
  );
}
