import { MEAL_PLANS } from "@/utils/content";
import {
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { FC, MouseEventHandler } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import {
  selectLayoutSlice,
  setIsSettingsOpen,
  setPlansOpen,
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
  const { plansOpen } = useSelector(selectLayoutSlice);

  const toggleAllPlans = () => {
    if (plansOpen === true) {
      dispatch(setPlansOpen(false));
    } else {
      dispatch(setPlansOpen(true));
    }
  };

  const handleOpenSettings = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsSettingsOpen(true));
  };

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
        } fixed left-0 z-[70] flex min-h-screen w-[13rem] select-none flex-col gap-6 border-r bg-white/100 px-4 pb-10 pt-16 transition-all duration-300 dark:border-cyan-100/20 dark:bg-black/100`}
      >
        <div className="flex w-full flex-col items-center gap-2 pb-2">
          <div className="flex w-full items-center gap-2">
            <StarIcon className="h-4 w-4 fill-green-500" />
            <Link
              href={"/app/my-plan"}
              className="text-md w-full font-semibold sm:text-lg"
            >
              My Plan
            </Link>
          </div>
          <div className="flex w-full">
            {planSelected && (
              <Link
                href={`/app/plans/${planSelected}`}
                className={`${
                  planVisited(planSelected) && " bg-slate-500/30 font-semibold"
                } flex w-full items-center gap-1 rounded-lg px-2 py-1 text-base`}
              >
                {MEAL_PLANS.find((plan) => plan.id === planSelected)?.name}
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 " onClick={toggleAllPlans}>
            <ListBulletIcon className="h-4 w-4 fill-green-500" />
            <div className="flex w-full cursor-pointer items-center justify-between">
              <span className="text-md font-semibold sm:text-lg">
                All plans
              </span>
              {plansOpen ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </div>
          </div>
          <div
            className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-300 sm:text-base ${
              plansOpen ? " max-h-[30rem]" : "max-h-0"
            }`}
          >
            {MEAL_PLANS.map((plan) => (
              <Link
                href={`/app/plans/${plan.id}`}
                key={plan.id}
                className={`${
                  planVisited(plan.id) && " bg-slate-500/30 font-semibold"
                } flex items-center gap-1 rounded-lg px-2 py-1 text-base`}
              >
                {plan.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <CalculatorIcon className="h-4 w-4 fill-green-500" />
          <Link
            href={"/app/plan-calculator"}
            className="text-md w-full font-semibold sm:text-lg"
          >
            Plan Calculator
          </Link>
        </div>
        <div className="mx-auto mt-auto flex flex-col gap-4">
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
