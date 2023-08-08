import { AppRoutes } from "@/utils";
import { Login } from "@/features/authentication";
import { selectAuthSlice } from "@/features/authentication/slice";
import { selectLayoutSlice } from "@/features/layout/slice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useOnlineStatus, useWindowWidth } from "@/hooks";
import BillingModal from "@/components/Premium/Billing/BillingModal";
import ConnectionError from "@/components/Layout/ConnectionError";
import Head from "next/head";
import InstallModal from "@/components/InstallApp/InstallModal";
import Loader from "@/components/Loader/Loader";
import WelcomeSteps from "@/components/WelcomeSteps/WelcomeSteps";
import { PremiumFooter } from "./components";

interface Props {
  children: React.ReactNode;
}

export default function PremiumLayout({ children }: Props) {
  const router = useRouter();
  const { sidebarOpen, isBillingModalOpen } = useSelector(selectLayoutSlice);
  const {
    user,
    isCreatingUser,
    isSigningUser,
    showInstallModal,
    isFirstDataLoaded,
  } = useSelector(selectAuthSlice);
  const isOnline = useOnlineStatus();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

  useEffect(() => {
    if (isCreatingUser || (user && !user?.isProfileCompleted)) {
      router.push(AppRoutes.create_user);
    }
  }, [user, isCreatingUser]);

  if (!user && !isSigningUser) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NutritionPlans - App</title>
      </Head>
      {(isCreatingUser || isSigningUser || !isFirstDataLoaded) && <Loader />}
      {user && user.isProfileCompleted && <WelcomeSteps />}
      {!isOnline && <ConnectionError />}
      {showInstallModal && (
        <div className="sm:hidden">
          <InstallModal />
        </div>
      )}
      {user && user.isProfileCompleted ? (
        <div className="flex w-full flex-col">
          <div className="flex min-h-screen w-full flex-col lg:pb-24">
            {isBillingModalOpen && <BillingModal />}
            <div
              className={`flex flex-col pt-[var(--nav-h)] duration-0 ease-in-out ${
                sidebarOpen ? "md:pl-20 xl:pl-64 " : "md:pl-20 "
              } ${isMobile ? "pb-[var(--mobile-sidenav-h)]" : ""}`}
            >
              {children}
            </div>
          </div>
          {!isMobile && <PremiumFooter />}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
