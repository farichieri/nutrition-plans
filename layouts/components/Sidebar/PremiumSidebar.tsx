import {
  MdAddCircle,
  MdAutoGraph,
  MdCreate,
  MdDescription,
  MdEmojiEvents,
  MdExpandMore,
  MdFavorite,
  MdPerson,
  MdRestaurantMenu,
  MdSearch,
  MdSettings,
  MdSettingsAccessibility,
  MdVerified,
} from "react-icons/md";
import {
  selectLayoutSlice,
  setSidebarAdminOpen,
  setSidebarEvolutionOpen,
  setSidebarOpen,
} from "@/store/slices/layoutSlice";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import SubscribeButton from "../../../components/Buttons/Subscribe";
import ToggleSidebar from "./ToggleSidebar";

interface Props {}

const PremiumSidebar: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sidebarEvolutionOpen, sidebarAdminOpen, sidebarOpen } =
    useSelector(selectLayoutSlice);

  const toggleEvolution = () => {
    if (sidebarEvolutionOpen === true) {
      dispatch(setSidebarEvolutionOpen(false));
    } else {
      dispatch(setSidebarEvolutionOpen(true));
    }
  };
  const toggleAdmin = () => {
    if (sidebarAdminOpen === true) {
      dispatch(setSidebarAdminOpen(false));
    } else {
      dispatch(setSidebarAdminOpen(true));
    }
  };

  const handleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

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

  const CREATE_PAGES = [
    {
      name: "Food",
      url: "/app/create/food",
      icon: <MdAddCircle className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Recipe",
      url: "/app/create/recipe",
      icon: <MdAddCircle className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Supplements & Vitamins",
      url: "/app/create/supplements-vitamins",
      icon: <MdAddCircle className="h-6 w-6 text-green-500" />,
    },
  ];

  const COLLAPSED_PAGES = [
    {
      name: "My Plan",
      url: `/app/today`,
      pathname: ["/app/[date]"],
      icon: <MdDescription className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Favorites",
      url: "/app/favorites",
      pathname: ["/app/favorites"],
      icon: <MdFavorite className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <MdSearch className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Settings",
      url: "/app/settings",
      pathname: [
        "/app/settings",
        "/app/settings/general",
        "/app/settings/billing",
        "/app/settings/account",
      ],
      icon: <MdSettings className="h-6 w-6 text-green-500" />,
    },
  ];

  const fixedOptClass =
    " text-md px-2 py-1.5 flex w-full items-center gap-1 rounded-lg text-base duration-300 hover:bg-slate-500/30 md:text-lg active:border-gray-400 dark:active:border-white border border-transparent ";

  const fixedSecOptClass =
    " text-md pr-0 pl-3 my-0.5 py-1 flex w-full items-center gap-1 rounded-lg text-sm duration-300 hover:bg-slate-500/30 md:text-base active:border-gray-400 dark:active:border-white border border-transparent ";

  useEffect(() => {
    console.log(window.innerWidth);
    if (sidebarOpen && window.innerWidth < 640) {
      dispatch(setSidebarOpen(false));
    }
  }, [router.asPath]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/30 md:hidden"
          onClick={handleSidebar}
        ></div>
      )}
      <div
        className={`${
          !sidebarOpen ? "sm:left-0" : "left-[-5rem]"
        } fixed left-0 z-[70] hidden h-screen min-h-screen w-20 select-none flex-col gap-2 overflow-auto bg-primary-color px-2 pb-5 backdrop-blur-sm transition-all duration-0 dark:border-slate-400/20 sm:gap-4 md:flex`}
      >
        <div className="flex w-full items-center justify-center py-1">
          <ToggleSidebar />
        </div>
        {COLLAPSED_PAGES.map((page) => (
          <Link
            key={page.name}
            href={page.url}
            className={`${
              page.pathname.includes(router.pathname) && "bg-slate-500/30  "
            } text-md hover:opacity-7 flex w-full flex-col items-center gap-1 rounded-lg border border-transparent px-1.5 py-1 text-center text-base font-medium duration-300 hover:bg-slate-500/30 active:border-gray-400 dark:active:border-white sm:text-lg`}
          >
            {page.icon}
            <span className="text-xs">{page.name}</span>
          </Link>
        ))}
      </div>

      <div
        className={`${
          sidebarOpen ? "left-0" : "left-[-16rem]"
        } fixed left-0 z-[70] flex h-screen min-h-screen w-64 select-none flex-col gap-1 overflow-auto bg-primary-color px-2 pb-5 font-semibold backdrop-blur-sm transition-all duration-300 dark:border-slate-400/20 sm:gap-2 md:w-64 md:duration-0`}
      >
        <div className="flex w-full items-center py-1 pl-1">
          <div className="hidden md:flex">
            <ToggleSidebar />
          </div>
          <span className="py-1 pl-3 text-lg font-semibold">
            <Logo hideText={false} />
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={`/app/today`}
            className={
              `${
                router.pathname === "/app/[date]" &&
                " bg-slate-500/30 font-semibold "
              } px-2 ` + fixedOptClass
            }
          >
            <MdDescription className="h-6 w-6 text-green-500" />
            <span>My Plan</span>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={"/app/favorites"}
            className={
              `${
                router.asPath === "/app/favorites" &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <MdFavorite className="h-6 w-6 text-green-500" />

            <span>Favorites</span>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={"/app/search"}
            className={
              `${
                (router.pathname === "/app/search" ||
                  router.pathname === "/app/search/my-creations") &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <MdSearch className="h-6 w-6 text-green-500" />
            <span>Search</span>
          </Link>
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={"/app/progress"}
            className={
              `${
                router.pathname === "/app/progress" &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <MdAutoGraph className="h-6 w-6 text-green-500" />
            <span>Progress</span>
          </Link>
        </div>

        <div className="flex flex-col divide-y border-t">
          <div className="flex flex-col py-1">
            <div className={fixedOptClass} onClick={toggleEvolution}>
              <MdPerson className="h-6 w-6 text-green-500" />
              <div className="flex w-full cursor-pointer items-center justify-between">
                <span className="text-md sm:text-lg">Profile</span>
                <MdExpandMore
                  className={`duration-200 ease-in-out ${
                    sidebarEvolutionOpen &&
                    "h-6 w-6 -rotate-180 transform text-green-500"
                  }`}
                />
              </div>
            </div>
            <div
              className={`flex flex-col overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
                sidebarEvolutionOpen ? " max-h-[30rem]" : "max-h-0"
              }`}
            >
              {PROFILE_PAGES.map((page) => (
                <Link
                  key={page.name}
                  href={page.url}
                  className={
                    `${
                      router.asPath === page.url &&
                      " bg-slate-500/30 font-semibold"
                    }` + fixedSecOptClass
                  }
                >
                  {page.icon}
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col py-1">
            <div className={fixedOptClass} onClick={toggleAdmin}>
              <MdCreate className="h-6 w-6 text-green-500" />
              <div className="flex w-full cursor-pointer items-center justify-between">
                <span className="text-md  sm:text-lg">Create</span>
                <MdExpandMore
                  className={`duration-200 ease-in-out ${
                    sidebarAdminOpen &&
                    "h-6 w-6 -rotate-180 transform text-green-500"
                  }`}
                />
              </div>
            </div>
            <div
              className={`flex flex-col overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
                sidebarAdminOpen ? " max-h-[30rem]" : "max-h-0"
              }`}
            >
              {CREATE_PAGES.map((page) => (
                <Link
                  key={page.name}
                  href={page.url}
                  className={
                    `${
                      router.asPath === page.url &&
                      "bg-slate-500/30 font-semibold"
                    }` + fixedSecOptClass
                  }
                >
                  {page.icon}
                  {page.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={"/app/settings"}
            className={
              `${
                router.asPath.includes("settings") &&
                " border bg-slate-500/30 font-semibold"
              } px-2 ` + fixedOptClass
            }
          >
            <MdSettings className="h-6 w-6 text-green-500" />
            <span>Settings</span>
          </Link>
        </div>
        <div className="mx-auto flex w-full items-center justify-center px-2 py-1">
          <SubscribeButton />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
