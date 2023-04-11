import { MEAL_PLANS } from "@/utils/content";
import {
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  ListBulletIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { selectAuthSlice } from "@/store/slices/authSlice";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector(selectAuthSlice);
  const [openPlans, setOpenPlans] = useState(false);
  return (
    <div
      className={`${
        sidebarOpen ? "left-0" : "-left-[12rem]"
      } absolute left-0 z-50 flex h-screen w-[12rem] flex-col gap-6 border-r px-4 pb-10 pt-16 backdrop-blur-md transition-all duration-300 dark:border-cyan-100/20`}
    >
      <div className="flex w-full items-center gap-2 pb-2">
        <StarIcon className="h-4 w-4 fill-green-500" />
        <span className="text-lg font-semibold">My plan</span>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-2"
          onClick={() => setOpenPlans(!openPlans)}
        >
          <ListBulletIcon className="h-4 w-4 fill-green-500" />
          <div className="flex w-full cursor-pointer items-center justify-between">
            <span className="text-lg font-semibold">All plans</span>
            {openPlans ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
        </div>
        <div
          className={` flex flex-col gap-2 overflow-hidden px-4 pl-2 transition-[max-height] duration-300 ${
            openPlans ? " max-h-96" : "max-h-0"
          }`}
        >
          {MEAL_PLANS.map((plan) => (
            <span key={plan.id}>{plan.name}</span>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <CalculatorIcon className="h-4 w-4 fill-green-500" />
        <span>Plan calculator</span>
      </div>
      <Cog8ToothIcon className="mx-auto mt-auto h-5 w-5" />
      <div className="mx-auto">
        <Avatar src={user?.photoURL} width={50} height={50} />
      </div>
    </div>
  );
};

export default PremiumSidebar;
