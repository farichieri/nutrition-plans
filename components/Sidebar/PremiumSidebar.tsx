import {
  selectLayoutSlice,
  setIsSettingsOpen,
  setSidebarEvolutionOpen,
  setSidebarPlansOpen,
} from "@/store/slices/layoutSlice";
import { FC, MouseEventHandler } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import SubscribeButton from "../Buttons/Subscribe";
import { BaseDatesEnum } from "@/types/datesTypes";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const { sidebarPlansOpen, sidebarEvolutionOpen } =
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

  const handleOpenSettings = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsSettingsOpen(true));
  };

  const planVisited = (id: string) => router.asPath === `/app/plans/${id}`;
  const planSelected = user?.plan_selected;

  const PROFILE_PAGES = [
    { name: "Progress", url: "/app/profile/progress", icon: "auto_graph" },
    {
      name: "Body Features",
      url: "/app/profile/body-features",
      icon: "settings_accessibility",
    },
    // {
    //   name: "Food Preferences",
    //   url: "/app/profile/food-preferences",
    //   icon: "restaurant",
    // },
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

  const COLLAPSED_PAGES = [
    { name: "My Plan", url: `/app/plans/${planSelected}`, icon: "description" },
    {
      name: "Recipes",
      url: "/app/search-food",
      icon: "menu_book",
    },
    {
      name: "Progress",
      url: "/app/profile/progress",
      icon: "auto_graph",
    },
  ];

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
              router.asPath === page.url && "bg-slate-500/30 font-semibold "
            } text-md hover:opacity-7 flex w-full flex-col items-center gap-1  rounded-lg px-2 py-1 text-base font-semibold duration-300 hover:bg-slate-500/30 sm:text-lg`}
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
            href={`/app/plans/${planSelected}`}
            className={`${
              router.asPath === `/app/plans/${planSelected}` &&
              " bg-slate-500/30 font-semibold"
            } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold duration-300 hover:bg-slate-500/30  sm:text-lg`}
          >
            <span className="material-icons md-24 text-green-500">
              description
            </span>
            <span>My Plan</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg "
            onClick={toggleAllPlans}
          >
            <span className="material-icons md-24 text-green-500">
              format_list_bulleted
            </span>
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md font-semibold sm:text-lg">
                All plans
              </span>
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
                className={`${
                  planVisited(plan.id) && " bg-slate-500/30 font-semibold"
                } flex items-center gap-1 rounded-lg py-1 pl-4 pr-2 text-base duration-300 hover:bg-slate-500/30 `}
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
            className={`${
              router.asPath === "/app/search-food" &&
              " bg-slate-500/30 font-semibold"
            } text-md hover:opacity-7 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-base font-semibold duration-300 hover:bg-slate-500/30 sm:text-lg`}
          >
            <span className="material-icons md-24 text-green-500">
              menu_book
            </span>
            <span>Recipes</span>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg "
            onClick={toggleEvolution}
          >
            <span className="material-icons md-24 text-green-500">person</span>
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md font-semibold sm:text-lg">Profile</span>
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
                className={`${
                  router.asPath === page.url && " bg-slate-500/30 font-semibold"
                } hover:opacity-7 flex items-center gap-1.5 rounded-lg py-1 pl-4 pr-2 text-base duration-300 hover:bg-slate-500/30`}
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
          <div className="flex w-full flex-col items-center gap-2">
            <Link
              href={"/app/create-food"}
              className={`${
                router.asPath === "/app/create-food" &&
                " bg-slate-500/30 font-semibold"
              } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold duration-300 hover:bg-slate-500/30  sm:text-lg `}
            >
              <span className="material-icons md-24 text-red-500">add</span>{" "}
              <span>Create Food</span>
            </Link>
          </div>
        )}
        {user?.is_admin && (
          <div className="flex w-full flex-col items-center gap-2">
            <Link
              href={"/app/create-recipe"}
              className={`${
                router.asPath === "/app/create-recipe" &&
                " bg-slate-500/30 font-semibold"
              } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold duration-300 hover:bg-slate-500/30  sm:text-lg `}
            >
              <span className="material-icons md-24 text-red-500">add</span>{" "}
              <span>Create Recipe</span>
            </Link>
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
