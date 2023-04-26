import { MEAL_PLANS } from "@/utils/content";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  DocumentCheckIcon,
  NewspaperIcon,
} from "@heroicons/react/20/solid";
import { FC, MouseEventHandler } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectLayoutSlice,
  setIsSettingsOpen,
  setSidebarEvolutionOpen,
  setSidebarPlansOpen,
} from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

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
    { name: "Progress", url: "/app/profile/progress" },
    { name: "Body Features", url: "/app/profile/body-features" },
    { name: "Food Preferences", url: "/app/profile/food-preferences" },
    { name: "Nutrition Values", url: "/app/profile/nutrition-values" },
  ];

  const planVisited = (id: string) => router.asPath === `/app/plans/${id}`;
  const planSelected = user?.plan_selected;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0  z-[70] sm:hidden"
          onClick={handleSidebar}
        ></div>
      )}
      <div
        className={`${
          sidebarOpen ? "left-0" : "left-[-13rem]"
        } fixed left-0 z-[70] flex min-h-screen w-[13rem] select-none flex-col gap-6 border-r bg-white/100 px-2 pb-10 pt-16 transition-all duration-300 dark:border-slate-400/20 dark:bg-black/100`}
      >
        <div className="flex flex-col gap-2">
          <div
            className="text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg "
            onClick={toggleEvolution}
          >
            <ChartBarIcon className="h-5 w-5 fill-green-500" />
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md font-semibold sm:text-lg">Profile</span>
              <ChevronDownIcon
                className={`h-5 w-5 duration-300 ease-in-out ${
                  sidebarEvolutionOpen && "-rotate-180 transform fill-green-500"
                }`}
              />
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-300 ease-linear sm:text-base ${
              sidebarEvolutionOpen ? " max-h-[30rem]" : "max-h-0"
            }`}
          >
            {PROFILE_PAGES.map((page) => (
              <Link
                key={page.name}
                href={page.url}
                className={`${
                  router.asPath === page.url && " bg-slate-500/30 font-semibold"
                } flex items-center gap-1 rounded-lg py-1 pl-4 pr-2 text-base`}
              >
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
            <DocumentCheckIcon className="h-5 w-5 fill-green-500" />
            <Link href={"/app/my-plan"}>My Plan</Link>
          </div>
          <div className="flex w-full">
            {planSelected && (
              <Link
                href={`/app/plans/${planSelected}`}
                className={`${
                  planVisited(planSelected) && "bg-slate-500/30 font-semibold"
                } flex items-center gap-1 rounded-lg py-1 pl-4 pr-2 text-base`}
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
            <ArchiveBoxIcon className="h-5 w-5 fill-green-500" />
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md font-semibold sm:text-lg">
                All plans
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 duration-300 ease-in-out ${
                  sidebarPlansOpen && "-rotate-180 transform fill-green-500"
                }`}
              />
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-300 ease-linear sm:text-base ${
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
              router.asPath === "/app/recipes" &&
              " bg-slate-500/30 font-semibold"
            } text-md flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base font-semibold sm:text-lg`}
          >
            <NewspaperIcon className="h-5 w-5 fill-green-500" />
            <Link
              href={"/app/recipes"}
              className="text-md w-full font-semibold sm:text-lg"
            >
              Recipes
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-auto flex flex-col gap-5">
          <Cog6ToothIcon
            className="mx-auto mt-auto h-5 w-5 cursor-pointer"
            onClick={handleOpenSettings}
          />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
