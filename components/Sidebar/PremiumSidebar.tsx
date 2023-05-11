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
  ];

  const planVisited = (id: string) => router.asPath === `/app/plans/${id}`;
  const planSelected = user?.plan_selected;

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
          sidebarOpen ? "left-0" : "left-[-14rem]"
        } fixed left-0 z-[70] flex h-screen min-h-screen w-[14rem] select-none flex-col gap-2 overflow-auto border-r bg-white/80 px-2 pb-5 pt-16 backdrop-blur-sm transition-all duration-300 dark:border-slate-400/20 dark:bg-black/80 sm:gap-4`}
      >
        <div className="flex flex-col gap-2">
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
                } flex items-center gap-1.5 rounded-lg py-1 pl-4 pr-2 text-base`}
              >
                <span className="material-icons md-24 notraslate text-green-500">
                  {page.icon}
                </span>

                {page.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <div
            className={`${
              router.asPath === "/app/my-plan" &&
              " bg-slate-500/30 font-semibold"
            } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg`}
          >
            <span className="material-icons md-24 text-green-500">
              description
            </span>
            <Link href={"/app/my-plan"}>My Plan</Link>
          </div>
          <div className="flex w-full">
            {planSelected && (
              <Link
                href={`/app/plans/${planSelected}`}
                className={`${
                  planVisited(planSelected) && "bg-slate-500/30 font-semibold"
                } flex w-full items-center gap-1 rounded-lg py-1 pl-4 pr-2 text-base`}
              >
                {MEAL_PLANS.find((plan) => plan.id === planSelected)?.name}
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
                href={`/app/plans/${plan.id}`}
                key={plan.id}
                className={`${
                  planVisited(plan.id) && " bg-slate-500/30 font-semibold"
                } flex items-center gap-1 rounded-lg py-1 pl-4 pr-2 text-base`}
              >
                {plan.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <div
            className={`${
              router.asPath === "/app/search-food" &&
              " bg-slate-500/30 font-semibold"
            } text-md flex w-full items-center gap-2 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg`}
          >
            <span className="material-icons md-24 text-green-500">
              menu_book
            </span>
            <Link
              href={"/app/search-food"}
              className="text-md w-full font-semibold sm:text-lg"
            >
              Recipes
            </Link>
          </div>
        </div>
        {user?.is_admin && (
          <div className="flex w-full flex-col items-center gap-2">
            <div
              className={`${
                router.asPath === "/app/create-food" &&
                " bg-slate-500/30 font-semibold"
              } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg`}
            >
              <span className="material-icons md-24 text-red-500">add</span>{" "}
              <Link
                href={"/app/create-food"}
                className="text-md w-full font-semibold sm:text-lg"
              >
                Create Food
              </Link>
            </div>
          </div>
        )}
        {user?.is_admin && (
          <div className="flex w-full flex-col items-center gap-2">
            <div
              className={`${
                router.asPath === "/app/create-recipe" &&
                " bg-slate-500/30 font-semibold"
              } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg`}
            >
              <span className="material-icons md-24 text-red-500">add</span>{" "}
              <Link
                href={"/app/create-recipe"}
                className="text-md w-full font-semibold sm:text-lg"
              >
                Create Recipe
              </Link>
            </div>
          </div>
        )}

        <div className="mx-auto mt-auto flex flex-col gap-5">
          <span
            className="material-icons md-24 mx-auto mt-auto h-5 w-5 cursor-pointer text-green-500"
            onClick={handleOpenSettings}
          >
            settings
          </span>
          <div>
            <SubscribeButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
