import {
  selectLayoutSlice,
  setIsSubscribeModalOpen,
} from "@/features/layout/slice";
import { AppRoutes } from "@/utils";
import { Login } from "@/features/authentication";
import { PremiumFooter } from "./components";
import { selectAuthSlice } from "@/features/authentication/slice";
import { SubscribeModal } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetMealsQuery, useGetMealsSettingsQuery } from "@/features/meals";
import { useGetProgressQuery } from "@/features/progress";
import { useOnlineStatus, useWindowWidth } from "@/hooks";
import { useRouter } from "next/router";
import ConnectionError from "@/components/Layout/ConnectionError";
import Head from "next/head";
import InstallModal from "@/components/InstallApp/InstallModal";
import Loader from "@/components/Loader/Loader";
import WelcomeSteps from "@/components/WelcomeSteps/WelcomeSteps";
import TrialEnded from "@/components/TrialDaysLeft/TrialEnded";
import dynamic from "next/dynamic";
import { usePremiumStatus } from "@/features/stripe";

interface Props {
  children: React.ReactNode;
}

function PremiumLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarOpen, isSubscribeModalOpen } = useSelector(selectLayoutSlice);
  const { user, isCreatingUser, isSigningUser, showInstallModal, isTrialOver } =
    useSelector(selectAuthSlice);
  const isOnline = useOnlineStatus();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const isProfileCompleted = user?.isProfileCompleted;
  const isPremium = usePremiumStatus(user);

  useGetProgressQuery({ user });
  useGetMealsQuery({ user });
  useGetMealsSettingsQuery({ user });

  useEffect(() => {
    if (isCreatingUser || (user && !isProfileCompleted)) {
      router.push(AppRoutes.create_user);
    }
    if (isSubscribeModalOpen && user?.isPremium) {
      dispatch(setIsSubscribeModalOpen(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isCreatingUser]);

  if (!user && !isSigningUser) {
    return <Login />;
  }
  //  TODO: Lower the amount of renders
  // console.log({ user });
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>App - Nutrition Plans</title>
      </Head>
      {isSubscribeModalOpen && <SubscribeModal />}
      {(isCreatingUser || isSigningUser) && <Loader />}
      {user && user.isProfileCompleted && <WelcomeSteps />}
      {!isOnline && <ConnectionError />}
      {showInstallModal && (
        <div className="sm:hidden">
          <InstallModal />
        </div>
      )}

      {!user?.isPremium && !isPremium && isTrialOver && <TrialEnded />}

      {user && user.isProfileCompleted ? (
        <div className="flex w-full flex-col ">
          <div className="flex min-h-screen w-full flex-col lg:pb-24">
            <div
              className={`flex flex-col pt-[var(--nav-h)] duration-0 ease-in-out ${
                sidebarOpen ? "md:pl-20 xl:pl-56 " : "md:pl-20 "
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

// no ssr for this layout
export default dynamic(() => Promise.resolve(PremiumLayout), {
  ssr: false,
});
