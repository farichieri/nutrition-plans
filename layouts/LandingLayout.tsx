import { selectLayoutSlice } from "@/features/layout/slice";
import { useSelector } from "react-redux";
import BillingModal from "@/components/Premium/Billing/BillingModal";
import Footer from "./components/Footer/Footer";
import Head from "next/head";
import NavBar from "./components/Nav/Nav";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBillingModalOpen } = useSelector(selectLayoutSlice);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      <>
        {isBillingModalOpen && <BillingModal />}
        <NavBar />
        <div className="flex h-full min-h-screen  w-full max-w-5xl flex-col items-center px-4 pt-[var(--nav-h)]">
          {children}
        </div>
        <Footer />
      </>
    </>
  );
}
