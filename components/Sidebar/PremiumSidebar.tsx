import {
  selectLayoutSlice,
  setSidebarAdminOpen,
  setSidebarEvolutionOpen,
  setSidebarPlansOpen,
} from "@/store/slices/layoutSlice";
import { BaseDatesEnum } from "@/types/datesTypes";
import { FC, MouseEventHandler } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import SubscribeButton from "../Buttons/Subscribe";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { sidebarPlansOpen, sidebarEvolutionOpen, sidebarAdminOpen } =
    useSelector(selectLayoutSlice);

  const toggleAllPlans = () => {
    if (sidebarPlansOpen === true) {
      dispatch(setSidebarPlansOpen(false));
    } else {
      dispatch(setSidebarPlansOpen(true));
    }
  };
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

  const planVisited = (id: string) => router.asPath.split("/")[3] === `${id}`;
  const planSelected = user?.plan_selected;

  const PROFILE_PAGES = [
    { name: "Progress", url: "/app/profile/progress", icon: "auto_graph" },
    {
      name: "Body Features",
      url: "/app/profile/body-features",
      icon: "settings_accessibility",
    },
    {
      name: "Nutrition Values",
      url: "/app/profile/nutrition-values",
      icon: "data_saver_off",
    },
    {
      name: "Meal settings",
      url: "/app/profile/meal-settings",
      icon: "restaurant_menu",
    },
  ];
  const ADMIN_PAGES = [
    { name: "Create Food", url: "/app/admin/create/food", icon: "add" },
    {
      name: "Create Recipe",
      url: "/app/admin/create/recipe",
      icon: "add",
    },
    {
      name: "Create Meal",
      url: "/app/admin/create/meal",
      icon: "add",
    },
    {
      name: "Create Diet Plan",
      url: "/app/admin/create/diet",
      icon: "add",
    },
  ];

  const COLLAPSED_PAGES = [
    {
      name: "My Plan",
      url: `/app/plans/${planSelected}/today`,
      pathname: "/app/plans/[id]/[date]",
      icon: "description",
    },
    {
      name: "Recipes & Foods",
      url: "/app/search-food",
      pathname: "/app/search-food",
      icon: "menu_book",
    },
    {
      name: "Progress",
      url: "/app/profile/progress",
      pathname: "/app/profile/progress",
      icon: "auto_graph",
    },
  ];

  const fixedOptClass =
    "text-md px-2 py-1 flex w-full items-center gap-1 rounded-lg text-base duration-300 hover:bg-slate-500/30 sm:text-lg active:border-gray-400 dark:active:border-white border border-transparent";

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden"
          onClick={handleSidebar}
        ></div>
      )}
      <div
        className={`${
          !sidebarOpen ? "sm:left-0" : "left-[-5rem]"
        } fixed left-0 z-[70] hidden h-screen min-h-screen w-20 select-none flex-col gap-2 overflow-auto border-r bg-white/80 px-2 pb-5 pt-16 backdrop-blur-sm transition-all duration-0 ease-linear dark:border-slate-400/20 dark:bg-black/80 sm:gap-4 md:flex`}
      >
        {COLLAPSED_PAGES.map((page) => (
          <Link
            key={page.name}
            href={page.url}
            className={`${
              router.pathname === page.pathname &&
              "bg-slate-500/30 font-semibold "
            } text-md hover:opacity-7 flex w-full flex-col items-center gap-1 rounded-lg border border-transparent px-1.5 py-1 text-center text-base duration-300 hover:bg-slate-500/30 active:border-gray-400 dark:active:border-white sm:text-lg`}
          >
            <span className="material-icons md-24 notraslate text-green-500">
              {page.icon}
            </span>
            <span className="text-xs font-light">{page.name}</span>
          </Link>
        ))}
      </div>

      <div
        className={`${
          sidebarOpen ? "left-0" : "left-[-13rem]"
        } fixed left-0 z-[70] flex h-screen min-h-screen w-52 select-none flex-col gap-2 overflow-auto border-r bg-white/80 px-2 pb-5 pt-16 backdrop-blur-sm transition-all duration-300 ease-in-out dark:border-slate-400/20 dark:bg-black/80 sm:gap-4 sm:duration-0`}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={`/app/plans/${planSelected}/today`}
            className={
              `${
                planSelected &&
                planVisited(planSelected) &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <span className="material-icons md-24 text-green-500">
              description
            </span>
            <span>My Plan</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base sm:text-lg "
            onClick={toggleAllPlans}
          >
            <span className="material-icons md-24 text-green-500">
              format_list_bulleted
            </span>
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md  sm:text-lg">All plans</span>
              <span
                className={`material-icons md-24 duration-200 ease-in-out ${
                  sidebarPlansOpen && "-rotate-180 transform text-green-500"
                }`}
              >
                expand_more
              </span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
              sidebarPlansOpen ? " max-h-[30rem]" : "max-h-0"
            }`}
          >
            {MEAL_PLANS.map((plan) => (
              <Link
                href={`/app/plans/${plan.id}/${BaseDatesEnum.today}`}
                key={plan.id}
                className={
                  `${
                    planVisited(plan.id) && " bg-slate-500/30 font-semibold"
                  } px-2` + fixedOptClass
                }
              >
                {plan.name}
                {plan.id === planSelected && (
                  <span className={`material-icons ml-auto text-green-500`}>
                    verified
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Link
            href={"/app/search-food"}
            className={
              `${
                router.asPath === "/app/search-food" &&
                " bg-slate-500/30 font-semibold"
              } px-2` + fixedOptClass
            }
          >
            <span className="material-icons md-24 text-green-500">
              menu_book
            </span>
            <span>Recipes & Foods</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base  sm:text-lg "
            onClick={toggleEvolution}
          >
            <span className="material-icons md-24 text-green-500">person</span>
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md  sm:text-lg">Profile</span>
              <span
                className={`material-icons md-24 duration-200 ease-in-out ${
                  sidebarEvolutionOpen && "-rotate-180 transform text-green-500"
                }`}
              >
                expand_more
              </span>
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
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
                  }` + fixedOptClass
                }
              >
                <span className="material-icons md-24 notraslate text-green-500">
                  {page.icon}
                </span>

                {page.name}
              </Link>
            ))}
          </div>
        </div>

        {user?.is_admin && (
          <div className="flex flex-col gap-1">
            <div
              className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base  sm:text-lg "
              onClick={toggleAdmin}
            >
              <span className="material-icons md-24 text-red-500">
                manage_accounts
              </span>
              <div className="flex w-full cursor-pointer items-center justify-between">
                <span className="text-md  sm:text-lg">Admin</span>
                <span
                  className={`material-icons md-24 duration-200 ease-in-out ${
                    sidebarAdminOpen && "-rotate-180 transform text-red-500"
                  }`}
                >
                  expand_more
                </span>
              </div>
            </div>
            <div
              className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
                sidebarAdminOpen ? " max-h-[30rem]" : "max-h-0"
              }`}
            >
              {ADMIN_PAGES.map((page) => (
                <Link
                  key={page.name}
                  href={page.url}
                  className={
                    `${
                      router.asPath === page.url &&
                      "bg-slate-500/30 font-semibold"
                    }` + fixedOptClass
                  }
                >
                  <span className="material-icons md-24 notraslate text-red-500">
                    {page.icon}
                  </span>

                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mx-auto flex w-full items-center justify-center px-2 py-1">
          <SubscribeButton />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
