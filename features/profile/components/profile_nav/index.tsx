import {
  MdArrowBackIosNew,
  MdEmojiEvents,
  MdFavorite,
  MdLibraryBooks,
  MdRestaurantMenu,
  MdSettings,
  MdSettingsAccessibility,
  MdVerified,
} from "react-icons/md";
import { AppRoutes } from "@/utils";
import { BackButton } from "@/components/Buttons";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FC } from "react";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/hooks";
import Link from "next/link";

const ProfileNav: FC = () => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const isProfileRoute = router.pathname === "/app/profile";

  const PROFILE_PAGES = [
    {
      name: "Profile",
      url: "/app/profile",
      pathname: ["/app/profile"],
      icon: <MdArrowBackIosNew className="h-5 w-5 text-green-500" />,
    },
    {
      name: "Nutrition Targets",
      url: "/app/profile/nutrition-values",
      pathname: ["/app/profile/nutrition-values", "/app/profile"],
      icon: <BiSolidPieChartAlt2 className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Goal",
      url: "/app/profile/goal",
      pathname: ["/app/profile/goal"],
      icon: <MdEmojiEvents className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Body Features",
      url: "/app/profile/body-features",
      pathname: ["/app/profile/body-features"],
      icon: <MdSettingsAccessibility className="h-6 w-6 text-green-500" />,
    },

    {
      name: "Preferred Plan",
      url: "/app/profile/preferred-plan",
      pathname: ["/app/profile/preferred-plan"],
      icon: <MdVerified className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Meals configuration",
      url: "/app/profile/meals",
      pathname: ["/app/profile/meals"],
      icon: <MdRestaurantMenu className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Settings",
      url: "/app/settings",
      pathname: [
        "/app/settings",
        "/app/settings/account",
        "/app/settings/general",
        "/app/settings/billing",
      ],
      icon: <MdSettings className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Library",
      url: "/app/library/favorites",
      pathname: ["/app/library/favorites"],
      icon: <MdLibraryBooks className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <nav className="z-[60] m-auto flex w-full flex-col items-center border-y bg-primary-color ">
      <BackButton
        route={AppRoutes.nav_menu}
        customClass="top-2 left-2 lg:absolute hidden"
      />
      <div
        className={`flex w-full max-w-[95vw] gap-x-1 overflow-auto ${
          isProfileRoute && isMobile ? "flex-col divide-y" : "flex-row"
        }`}
      >
        {PROFILE_PAGES.map((page) => {
          if (
            (page.name === "Profile" && !isMobile) ||
            (isMobile && isProfileRoute && page.name === "Profile")
          ) {
            return null;
          }
          return (
            <div className="min-w-fit" key={page.url}>
              <Link
                href={page.url}
                key={page.url}
                className={`my-1 flex w-full items-center justify-start gap-1 rounded-md px-3 py-1.5 text-base font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                  page.pathname?.includes(router.pathname)
                    ? "bg-slate-500/20"
                    : ""
                } `}
              >
                {page.icon}
                {page.name}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default ProfileNav;
