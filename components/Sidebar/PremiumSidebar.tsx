import { MEAL_PLANS } from "@/utils/content";
import {
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  ListBulletIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { FC, MouseEventHandler } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectLayoutSlice, setPlansOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";

interface Props {
  sidebarOpen: boolean;
  handleSidebar: MouseEventHandler;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, handleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { plansOpen } = useSelector(selectLayoutSlice);

  const toggleAllPlans = () => {
    if (plansOpen === true) {
      dispatch(setPlansOpen(false));
    } else {
      dispatch(setPlansOpen(true));
    }
  };

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
          sidebarOpen ? "left-0" : "left-[-12rem]"
        } fixed left-0 z-50 flex min-h-screen w-[12rem] select-none flex-col gap-6 border-r px-4 pb-10 pt-16 backdrop-blur-md transition-all duration-300  dark:border-cyan-100/20`}
      >
        <div className="flex w-full items-center gap-2 pb-2">
          <StarIcon className="h-4 w-4 fill-green-500" />
          <Link
            href={"/app/my-plan"}
            className="text-md w-full font-semibold sm:text-lg"
          >
            My Plan
          </Link>
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
            <Link href={"/app/plans"}>All plans</Link>
            {MEAL_PLANS.map((plan) => (
              <Link href={`/app/plans/${plan.id}`} key={plan.id}>
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
        <Cog8ToothIcon className="mx-auto mt-auto h-5 w-5" />
        <div className="mx-auto">
          <Avatar width={50} height={50} />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
