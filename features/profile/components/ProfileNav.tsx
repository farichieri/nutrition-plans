import {
  MdEmojiEvents,
  MdRestaurantMenu,
  MdSettingsAccessibility,
  MdVerified,
} from "react-icons/md";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FC } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";

interface Props {}

const ProfileNav: FC<Props> = ({}) => {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;
  const isProfileRoute = router.asPath === "/app/profile";

  const PROFILE_PAGES = [
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
      name: "Meals settings",
      url: "/app/profile/meals",
      icon: <MdRestaurantMenu className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <nav className="fixed inset-0 z-[60] m-auto flex max-w-3xl flex-col items-center bg-primary-color pt-[var(--nav-h)]">
      <div className="flex w-full justify-center border-b py-8 text-2xl font-semibold">
        Profile
      </div>
      <div className="flex w-full max-w-[95vw] flex-col divide-y border-b">
        {isProfileRoute ? (
          PROFILE_PAGES.map((page) => {
            return (
              <Link
                href={page.url}
                key={page.url}
                className={`flex w-full items-center justify-start px-2 py-5 text-xl font-medium capitalize duration-100 hover:bg-slate-500/20 hover:opacity-100 ${
                  router.asPath === page.url ? "opacity-100" : "opacity-50"
                }`}
              >
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
  );
};

export default ProfileNav;
