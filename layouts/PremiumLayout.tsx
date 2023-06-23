import {
  selectAuthSlice,
  setIsSigningUser,
} from "@/features/authentication/slice";
import { AppRoutes } from "@/utils";
import { Login } from "@/features/authentication";
import { selectLayoutSlice, setSidebarOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BillingModal from "../components/Premium/Billing/BillingModal";
import ConnectionError from "@/components/Layout/ConnectionError";
import Head from "next/head";
import InstallModal from "@/components/InstallApp/InstallModal";
import Loader from "../components/Loader/Loader";
import PremiumNav from "./components/Nav/PremiumNav";
import Settings from "../components/Premium/Settings/Settings";
import Sidebar from "./components/Sidebar/PremiumSidebar";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import WelcomeSteps from "../components/WelcomeSteps/WelcomeSteps";

interface Props {
  children: React.ReactNode;
}

export default function PremiumLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarOpen, isBillingModalOpen, isSettingsOpen } =
    useSelector(selectLayoutSlice);
  const { user, isCreatingUser, isSigningUser, showInstallModal } =
    useSelector(selectAuthSlice);
  const isOnline = useOnlineStatus();

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  useEffect(() => {
    if (user) dispatch(setIsSigningUser(false));
    if (isCreatingUser) router.push(AppRoutes.create_user);
  }, [user, router, isCreatingUser]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {(isCreatingUser || isSigningUser) && <Loader />}
      {isSettingsOpen && <Settings />}
      {user && <WelcomeSteps />}
      {!isOnline && <ConnectionError />}
      {showInstallModal && (
        <div className="sm:hidden">
          <InstallModal />
        </div>
      )}
      {user ? (
        <div className="flex min-h-screen w-full flex-col">
          {isBillingModalOpen && <BillingModal />}
          <PremiumNav handleSidebar={handleSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} handleSidebar={handleSidebar} />
          <div
            className={`flex flex-col bg-white pt-[var(--nav-h)] duration-0 ease-in-out dark:bg-black ${
              sidebarOpen ? "md:pl-56 " : "md:pl-20 "
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
