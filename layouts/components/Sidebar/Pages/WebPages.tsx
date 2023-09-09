import {
  MdAutoGraph,
  MdCreate,
  MdExpandMore,
  MdPerson,
  MdSettings,
  MdLocalGroceryStore,
  MdOutlineCalendarMonth,
  MdLibraryBooks,
} from "react-icons/md";
import {
  selectLayoutSlice,
  setSidebarAdminOpen,
  setSidebarOpen,
} from "@/features/layout/slice";
import { AppRoutes } from "@/utils";
import { BiFoodMenu } from "react-icons/bi";
import { FC } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useWindowWidth } from "@/hooks";
import Link from "next/link";
import TrialDaysLeft from "@/components/TrialDaysLeft/TrialDaysLeft";
import { SubscribeButton } from "@/components/Buttons";

interface Props {}

const WebPages: FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sidebarAdminOpen, sidebarOpen } = useSelector(selectLayoutSlice);
  const windowWidth = useWindowWidth();
  const isSidebarRepleagable = windowWidth < 1280;

  const toggleAdmin = () => {
    if (sidebarAdminOpen === true) {
      dispatch(setSidebarAdminOpen(false));
    } else {
      dispatch(setSidebarAdminOpen(true));
    }
  };

  const handleSidebar = () => {
    if (sidebarOpen === true && isSidebarRepleagable) {
      dispatch(setSidebarOpen(false));
    }
  };

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
  ];

  const WEB_PAGES = [
    {
      id: "tour-welcome-0",
      name: "Planner",
      url: AppRoutes.today,
      pathname: ["/app/[date]"],
      icon: <MdOutlineCalendarMonth className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-search-0",
      name: "Search",
      url: "/app/search",
      pathname: ["/app/search", "/app/search/my-creations"],
      icon: <RiSearchLine className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-progress-0",
      name: "Progress",
      url: "/app/progress",
      pathname: ["/app/progress"],
      icon: <MdAutoGraph className="h-6 w-6 text-green-500" />,
    },
    {
      id: "",
      name: "Groceries",
      url: "/app/shopping/today",
      pathname: ["/app/shopping/[date]", "/app/cupboard"],
      icon: <MdLocalGroceryStore className="h-6 w-6 text-green-500" />,
    },
    {
      id: "tour-library-0",
      name: "Library",
      url: "/app/library/favorites",
      pathname: [
        "/app/library/days",
        "/app/library/favorites",
        "/app/library/meals",
      ],
      icon: <MdLibraryBooks className="h-6 w-6 text-green-500" />,
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
          id={page.id}
          key={page.name}
          href={page.url}
          onClick={handleSidebar}
          className={
            `${
              page.pathname.includes(router.pathname) &&
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
            <div className="flex w-full cursor-pointer items-center justify-between ">
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
                onClick={handleSidebar}
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

        <div className="flex flex-col  py-1">
          <Link
            id="tour-profile-0"
            href={"/app/profile"}
            onClick={handleSidebar}
            className={
              `${
                router.pathname.includes("/profile") &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <MdPerson className="h-6 w-6 text-green-500" />
            <span className="text-md sm:text-lg">Profile</span>{" "}
          </Link>
        </div>

        <Link
          href={"/app/settings"}
          onClick={handleSidebar}
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
      <div className="flex flex-col items-center justify-center">
        <SubscribeButton />
        <TrialDaysLeft />
      </div>
    </>
  );
};

export default WebPages;
