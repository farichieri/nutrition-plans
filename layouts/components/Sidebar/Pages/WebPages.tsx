import {
  MdAutoGraph,
  MdCreate,
  MdEmojiEvents,
  MdExpandMore,
  MdFavorite,
  MdHomeFilled,
  MdPerson,
  MdRestaurantMenu,
  MdSearch,
  MdSettings,
  MdSettingsAccessibility,
  MdShoppingCart,
  MdVerified,
} from "react-icons/md";
import {
  selectLayoutSlice,
  setSidebarAdminOpen,
  setSidebarEvolutionOpen,
} from "@/store/slices/layoutSlice";
import { BiFoodMenu, BiSolidPieChartAlt2 } from "react-icons/bi";
import { PiBowlFoodFill, PiPillFill } from "react-icons/pi";
import { FC } from "react";
import { SubscribeButton } from "@/components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

const WebPages: FC<Props> = () => {
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
      icon: <PiBowlFoodFill className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Recipe",
      url: "/app/create/recipe",
      icon: <BiFoodMenu className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Supplements & Vitamins",
      url: "/app/create/supplements-vitamins",
      icon: <PiPillFill className="h-6 w-6 text-green-500" />,
    },
  ];

  const WEB_PAGES = [
    {
      name: "Home",
      url: `/app/today`,
      pathname: ["/app/[date]"],
      icon: <MdHomeFilled className="h-6 w-6 text-green-500" />,
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
      name: "Shopping",
      url: "/app/shopping/today",
      pathname: ["/app/shopping/[date]"],
      icon: <MdShoppingCart className="h-6 w-6 text-green-500" />,
    },
  ];

  const fixedOptClass =
    " text-md px-2 py-1.5 flex w-full items-center gap-1 rounded-xl text-base duration-300 hover:bg-slate-500/30 md:text-lg active:border-gray-400 dark:active:border-white border border-transparent ";

  const fixedSecOptClass =
    " text-md pr-0 pl-3 my-0.5 py-1 flex w-full items-center gap-1 rounded-xl text-sm duration-300 hover:bg-slate-500/30 md:text-base active:border-gray-400 dark:active:border-white border border-transparent ";

  return (
    <>
      {WEB_PAGES.map((page) => (
        <Link
          key={page.name}
          href={page.url}
          className={
            `${
              page.pathname.includes(router.asPath) &&
              " bg-slate-500/30 font-semibold"
            } px-2` + fixedOptClass
          }
        >
          {page.icon}
          <span>{page.name}</span>
        </Link>
      ))}

      <div className="flex flex-col divide-y border-y pb-1">
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
            className={`flex flex-col overflow-hidden border-b pb-1 pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
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

        <Link
          href={"/app/settings"}
          className={
            `${
              router.asPath.includes("settings") &&
              " bg-slate-500/30 font-semibold"
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
    </>
  );
};

export default WebPages;
