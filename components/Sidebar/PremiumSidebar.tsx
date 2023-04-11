import { MEAL_PLANS } from "@/utils/content";
import {
  CalculatorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  ListBulletIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { FC, useEffect, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: Function;
}

const PremiumSidebar: FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector(selectAuthSlice);
  const [openPlans, setOpenPlans] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("all-plans") === "true" ||
      !("all-plans" in localStorage)
    ) {
      localStorage.setItem("all-plans", "false");
      setOpenPlans(false);
    } else {
      localStorage.setItem("all-plans", "true");
      setOpenPlans(true);
    }
    console.log("asd");
  }, []);

  const toggleAllPlans = () => {
    if (
      localStorage.getItem("all-plans") === "true" ||
      !("all-plans" in localStorage)
    ) {
      localStorage.setItem("all-plans", "false");
      setOpenPlans(false);
    } else {
      localStorage.setItem("all-plans", "true");
      setOpenPlans(true);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div
        className={`${
          sidebarOpen ? "left-0" : "left-[-12rem]"
        } fixed left-0 z-50 flex min-h-screen w-[12rem] select-none flex-col gap-6 border-r px-4 pb-10 pt-16 backdrop-blur-md transition-all duration-300  dark:border-cyan-100/20`}
      >
        <div className="flex w-full items-center gap-2 pb-2">
          <StarIcon className="h-4 w-4 fill-green-500" />
          <Link href={"/app/my-plan"} className="w-full text-lg font-semibold">
            My Plan
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 " onClick={toggleAllPlans}>
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
            className="w-full text-lg font-semibold"
          >
            Plan Calculator
          </Link>
        </div>
        <Cog8ToothIcon className="mx-auto mt-auto h-5 w-5" />
        <div className="mx-auto">
          <Avatar src={user?.photoURL} width={50} height={50} />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
