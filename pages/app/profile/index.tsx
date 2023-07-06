import {
  MdEmojiEvents,
  MdFavorite,
  MdRestaurantMenu,
  MdSettings,
  MdSettingsAccessibility,
  MdVerified,
} from "react-icons/md";
import { AppRoutes } from "@/utils";
import { BackButton } from "@/components/Buttons";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { MdArrowBackIosNew } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar/Avatar";
import Link from "next/link";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const isProfileRoute = router.asPath === "/app/profile";

  const PROFILE_PAGES = [
    {
      name: "Favorites",
      url: "/app/profile/favorites",
      pathname: ["/app/profile/favorites"],
      icon: <MdFavorite className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Goal",
      url: "/app/profile/goal",
      icon: <MdEmojiEvents className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Body Features",
      url: "/app/profile/body-features",
      icon: <MdSettingsAccessibility className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Nutrition Values",
      url: "/app/profile/nutrition-values",
      icon: <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Preferred Plan",
      url: "/app/profile/preferred-plan",
      icon: <MdVerified className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Meals configuration",
      url: "/app/profile/meals",
      icon: <MdRestaurantMenu className="h-6 w-6 text-green-500" />,
    },

    {
      name: "Settings",
      url: "/app/settings",
      pathname: ["/app/settings"],
      icon: <MdSettings className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={true} />
      <nav className="fixed inset-0 z-[60] m-auto flex max-w-3xl flex-col items-center bg-primary-color pt-[var(--nav-h)]">
        <BackButton
          route={AppRoutes.nav_menu}
          customClass="top-2 left-2 lg:absolute hidden"
        />
        <div className="flex w-full justify-center border-b py-8 text-2xl font-semibold">
          Profile
        </div>
        <div className="flex w-full max-w-[95vw] flex-col divide-y border-b">
          <div className="flex items-center justify-between  py-2">
            <div className="flex flex-col items-start justify-center  opacity-60">
              <span className="opacity-100">{user?.displayName}</span>
              <span className="opacity-70">{user?.emailAddress}</span>
            </div>
            <Avatar width={75} height={75} />
          </div>
          {isProfileRoute ? (
            PROFILE_PAGES.map((page) => {
              return (
                <Link
                  href={page.url}
                  key={page.url}
                  className={`flex w-full items-center justify-start gap-4 px-2 py-5 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 `}
                >
                  {page.icon}
                  {page.name}
                </Link>
              );
            })
          ) : (
            <nav className="flex h-full flex-col gap-1 ">
              <Link
                href={"/app/profile"}
                className="flex items-center gap-2 border-b px-4 py-5 sm:hidden"
              >
                <MdArrowBackIosNew className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </nav>
          )}
        </div>
      </nav>
    </PremiumLayout>
  );
}
