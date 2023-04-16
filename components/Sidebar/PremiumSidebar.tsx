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
import SubscribeButton from "../Buttons/Subscribe";

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
          className="fixed inset-0 z-10 sm:hidden"
          onClick={handleSidebar}
        ></div>
      )}
      <div
        className={`${
          sidebarOpen ? "left-0" : "left-[-13rem]"
        } fixed left-0 z-50 flex min-h-screen w-[13rem] select-none flex-col gap-6 border-r px-4 pb-10 pt-16 backdrop-blur-md transition-all duration-300 dark:border-cyan-100/20`}
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
                  planVisited(planSelected) && " font-semibold"
                } flex items-center gap-1`}
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
            className={`flex flex-col gap-2 overflow-hidden px-4 pl-2 text-sm transition-[max-height] duration-300 sm:text-base ${
              plansOpen ? " max-h-96" : "max-h-0"
            }`}
          >
            {/* <Link href={"/app/plans"}>All plans</Link> */}
            {MEAL_PLANS.map((plan) => (
              <Link
                href={`/app/plans/${plan.id}`}
                key={plan.id}
                className={`${
                  planVisited(plan.id) && " font-semibold"
                } flex items-center gap-1`}
              >
                {/* {planSelected === plan.id && (
                  <StarIcon className="h-3 w-3 fill-green-500" />
                )} */}
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
          <SubscribeButton />
          {/* <Avatar width={50} height={50} /> */}
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
