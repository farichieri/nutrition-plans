import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import BillingModal from "../Premium/Billing/BillingModal";
import Head from "next/head";
import Loader from "../Loader/Loader";
import LoaderWithText from "../Loader/LoaderWithText";
import Login from "../Auth/Login";
import PremiumNav from "../Nav/PremiumNav";
import Settings from "../Premium/Settings/Settings";
import Sidebar from "../Sidebar/PremiumSidebar";
import WelcomeSteps from "../WelcomeSteps/WelcomeSteps";

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { sidebarOpen, isBillingModalOpen, isSettingsOpen, loadingWithText } =
    useSelector(selectLayoutSlice);
  const { user, isCreatingUser, isSigningUser } = useSelector(selectAuthSlice);

  console.log({ user });

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
      {loadingWithText && <LoaderWithText />}
      {isSettingsOpen && <Settings />}
      {user && <WelcomeSteps />}
      {user ? (
        <div className="flex min-h-screen w-screen flex-col bg-gray-100 dark:bg-[#50525043]">
          {isBillingModalOpen && <BillingModal />}
          <PremiumNav sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <div
            className={`flex flex-col pt-[var(--nav-h)] duration-300 ${
              sidebarOpen && "sm:pl-[14rem]"
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
