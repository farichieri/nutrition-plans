import {
  fetchMeals,
  fetchMealsSettings,
  setUserMeals,
  setUserMealsSettings,
} from "@/features/meals";
import {
  selectLayoutSlice,
  setIsSubscribeModalOpen,
} from "@/features/layout/slice";
import { AppRoutes } from "@/utils";
import { fetchProgress, setProgress } from "@/features/progress";
import { getThisWeekDiets } from "@/features/plans";
import { Login, setIsFirstDataLoaded } from "@/features/authentication";
import { PremiumFooter } from "./components";
import { selectAuthSlice } from "@/features/authentication/slice";
import { setDiets } from "@/features/plans/slice";
import { SubscribeModal } from "@/components";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useOnlineStatus, useWindowWidth } from "@/hooks";
import { useRouter } from "next/router";
import ConnectionError from "@/components/Layout/ConnectionError";
import Head from "next/head";
import InstallModal from "@/components/InstallApp/InstallModal";
import Loader from "@/components/Loader/Loader";
import WelcomeSteps from "@/components/WelcomeSteps/WelcomeSteps";

interface Props {
  children: React.ReactNode;
}

export default function PremiumLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarOpen, isSubscribeModalOpen } = useSelector(selectLayoutSlice);
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
  const isProfileCompleted = user?.isProfileCompleted;

  useEffect(() => {
    if (isCreatingUser || (user && !isProfileCompleted)) {
      router.push(AppRoutes.create_user);
    }
    if (isSubscribeModalOpen && user?.isPremium) {
      dispatch(setIsSubscribeModalOpen(false));
    }
  }, [user, isCreatingUser]);

  useEffect(() => {
    const unsubscribe = async () => {
      if (!user) return;
      if (isFirstDataLoaded) return;
      try {
        const [progressRes, userMealsRes, mealsSettings, thisWeekDiets] =
          await Promise.all([
            fetchProgress(user),
            fetchMeals(user.id),
            fetchMealsSettings(user.id),
            getThisWeekDiets({ user }),
          ]);
        if (
          progressRes.result === "success" &&
          userMealsRes.result === "success" &&
          mealsSettings.result === "success" &&
          thisWeekDiets.result === "success"
        ) {
          dispatch(setProgress(progressRes.data));
          dispatch(setUserMeals(userMealsRes.data));
          dispatch(setUserMealsSettings(mealsSettings.data));
          dispatch(setDiets(thisWeekDiets.data));
          dispatch(setIsFirstDataLoaded(true));
        } else {
          throw new Error("An error occurred while loading user data.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while loading your data.");
      }
    };
    unsubscribe();
  }, []);

  if (!user && !isSigningUser) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NutritionPlans - App</title>
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
      {user && user.isProfileCompleted ? (
        <div className="flex w-full flex-col">
          <div className="flex min-h-screen w-full flex-col lg:pb-24">
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
