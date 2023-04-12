import { CheckIcon } from "@heroicons/react/20/solid";
import { FC, useState } from "react";
import Link from "next/link";

interface Props {
  pricingPlan: any;
}

const PremiumPricingPlan: FC<Props> = ({ pricingPlan }) => {
  const [yearly, setYearly] = useState(false);
  return (
    <div
      key={pricingPlan.name}
      className="flex h-[50vh] w-full max-w-xs select-none flex-col items-center gap-5 rounded-3xl border border-green-400/20 px-5 py-14 shadow-[0_3px_20px] shadow-green-800/40 dark:border-green-700/20 dark:shadow-green-400/30"
    >
      <span className="text-2xl font-medium">{pricingPlan.name}</span>
      {yearly && pricingPlan.yearlyPrice > 0 ? (
        <div className="flex items-center gap-2">
          <span>{`$${pricingPlan.yearlyPrice} /month`}</span>
          <span className="flex items-center justify-center rounded-3xl bg-green-500/50 px-2 py-1 text-xs">
            {pricingPlan.discount}
          </span>
        </div>
      ) : (
        <span>{`$${pricingPlan.monthlyPrice} /month`}</span>
      )}
      {pricingPlan.yearlyPrice > 0 && (
        <div
          className="relative flex cursor-pointer rounded-3xl border border-green-500/50"
          onClick={() => setYearly(!yearly)}
        >
          <div
            className={`${
              yearly ? "right-0 " : "right-[50%] "
            } absolute h-full w-[50%] rounded-3xl bg-green-400/50 transition-all duration-300`}
          ></div>
          <button className="py- z-10 rounded-3xl px-4">Monthly</button>
          <button className="z-10 rounded-3xl px-4 py-0.5">Annually</button>
        </div>
      )}
      <span>{pricingPlan.checklistTitle}</span>
      <ul className="flex w-full flex-col items-start justify-start gap-2 px-2 pb-10">
        {pricingPlan.checklist.map((c: any, index: number) => (
          <li key={index} className="flex items-center gap-1">
            <CheckIcon className="h-4 w-4 fill-green-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <Link
        href={pricingPlan.checkoutLink}
        className="mt-auto flex rounded-3xl border border-green-500 bg-gradient-to-r from-green-500 via-green-500 to-green-500 px-3 py-2 text-xs text-white duration-300 hover:shadow-[0_1px_10px] hover:shadow-green-300 hover:brightness-110 dark:hover:shadow-green-400/50"
      >
        {pricingPlan.buttonContent}
      </Link>
    </div>
  );
};

export default PremiumPricingPlan;
