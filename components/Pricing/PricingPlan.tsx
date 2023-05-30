import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  pricingPlan: any;
}

const PricingPlan: FC<Props> = ({ pricingPlan }) => {
  const { user } = useSelector(selectAuthSlice);
  const [yearly, setYearly] = useState(false);
  return (
    <div
      key={pricingPlan.name}
      className="flex min-h-[27rem] w-full max-w-xs select-none flex-col items-center gap-5 rounded-3xl border border-green-400/20 bg-white px-5 py-10 shadow-[0_3px_20px] shadow-green-800/40 duration-300 dark:border-green-700/20 dark:bg-black dark:hover:shadow-green-400/80"
    >
      <span className="text-2xl font-medium">{pricingPlan.name}</span>
      {yearly && pricingPlan.yearlyPrice > 0 ? (
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">
            ${pricingPlan.yearlyPrice}
          </span>
          <span> /month</span>
          <span className="flex items-center justify-center rounded-3xl bg-green-500/50 px-1.5 py-1 text-xs">
            {pricingPlan.discount}
          </span>
        </div>
      ) : (
        <div>
          <span className="text-xl font-semibold">
            ${pricingPlan.monthlyPrice}
          </span>
          <span> /month</span>
        </div>
      )}
      {pricingPlan.yearlyPrice > 0 && (
        <div
          className="relative mb-2 flex cursor-pointer rounded-3xl border-green-500 text-sm shadow-[0_0_5px_gray]"
          onClick={() => setYearly(!yearly)}
        >
          <div
            className={`${
              yearly ? "right-0 " : "right-[50%] "
            } absolute h-full w-[50%] rounded-3xl bg-green-500 transition-all duration-300`}
          ></div>
          <button className="py- z-10 rounded-3xl px-4">Monthly</button>
          <button className="z-10 rounded-3xl px-4 py-0.5">Annually</button>
        </div>
      )}
      <span className="text-xs">{pricingPlan.checklistTitle}</span>
      <ul className="flex w-full flex-col items-start justify-start gap-2 px-2">
        {pricingPlan.checklist.map((c: any, index: number) => (
          <li key={index} className="flex items-center gap-1">
            <CheckCircleIcon className="h-5 w-5 fill-green-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      {user?.premium_plan === pricingPlan.plan_id ? (
        <span className="mt-auto flex rounded-md border border-gray-400 px-3 py-2 text-xs dark:border-gray-700">
          Current plan
        </span>
      ) : (
        <Link
          href={pricingPlan.checkoutLink}
          className="mt-auto flex rounded-3xl border border-green-500 bg-gradient-to-r from-green-500 via-green-500 to-green-500 px-3 py-2 text-xs text-white duration-300 hover:shadow-[0_1px_10px] hover:shadow-green-300 hover:brightness-110 dark:hover:shadow-green-400/50"
        >
          {pricingPlan.buttonContent}
        </Link>
      )}
    </div>
  );
};

export default PricingPlan;
