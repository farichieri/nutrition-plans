import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import BillingModal from "../Premium/Billing/BillingModal";
import Head from "next/head";
import Loader from "../Loader/Loader";
import Login from "../Auth/Login";
import PremiumNav from "../Nav/PremiumNav";
import Sidebar from "../Sidebar/PremiumSidebar";
import Settings from "../Premium/Settings/Settings";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { sidebarOpen, isBillingModalOpen, isSettingsOpen } =
    useSelector(selectLayoutSlice);
  const { user, isCreatingUser, isSigningUser } = useSelector(selectAuthSlice);

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {(isCreatingUser || isSigningUser) && <Loader />}
      {isSettingsOpen && <Settings />}
      {user ? (
        <div className="flex min-h-screen w-screen flex-col bg-gray-100 dark:bg-[#1717176b]">
          {isBillingModalOpen && <BillingModal />}
          <PremiumNav sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <div
            className={`flex flex-col pt-[var(--nav-h)] duration-300 ${
              sidebarOpen && "sm:pl-[13rem]"
            }`}
          >
            {children}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
