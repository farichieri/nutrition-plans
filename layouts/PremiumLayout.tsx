import {
  selectAuthSlice,
  setIsSigningUser,
} from "@/features/authentication/slice";
import { AppRoutes } from "@/utils";
import { Login } from "@/features/authentication";
import { selectLayoutSlice } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BillingModal from "../components/Premium/Billing/BillingModal";
import ConnectionError from "@/components/Layout/ConnectionError";
import Head from "next/head";
import InstallModal from "@/components/InstallApp/InstallModal";
import Loader from "../components/Loader/Loader";
import Sidebar from "./components/Sidebar/PremiumSidebar";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import WelcomeSteps from "../components/WelcomeSteps/WelcomeSteps";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {
  children: React.ReactNode;
}

export default function PremiumLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarOpen, isBillingModalOpen } = useSelector(selectLayoutSlice);
  const { user, isCreatingUser, isSigningUser, showInstallModal } =
    useSelector(selectAuthSlice);
  const isOnline = useOnlineStatus();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  useEffect(() => {
    if (user) dispatch(setIsSigningUser(false));
    if (isCreatingUser || !user?.is_profile_completed)
      router.push(AppRoutes.create_user);
  }, [user, router, isCreatingUser]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nutrition Plans</title>
      </Head>
      {(isCreatingUser || isSigningUser) && <Loader />}
      {user && user.is_profile_completed && <WelcomeSteps />}
      {!isOnline && <ConnectionError />}
      {showInstallModal && (
        <div className="sm:hidden">
          <InstallModal />
        </div>
      )}
      {user ? (
        <div className="flex min-h-screen w-full flex-col">
          {isBillingModalOpen && <BillingModal />}
          <Sidebar />
          <div
            className={`flex flex-col pt-[var(--nav-h)] duration-0 ease-in-out ${
              sidebarOpen ? "lg:pl-64 " : "lg:pl-20 "
            } ${isMobile ? "pb-[var(--mobile-sidenav-h)]" : ""}`}
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
