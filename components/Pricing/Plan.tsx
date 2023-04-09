import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FC, useState } from "react";

interface Props {
  plan: any;
}

const Plan: FC<Props> = ({ plan }) => {
  const [yearly, setYearly] = useState(false);
  return (
    <div
      key={plan.name}
      className="max-w-80 flex select-none flex-col items-center gap-5 rounded-3xl border px-5 py-14 shadow-lg dark:border-gray-700 dark:shadow-cyan-100/30"
    >
      <span className="text-2xl font-medium">{plan.name}</span>
      {yearly ? (
        <div className="flex items-center gap-2">
          <span>{`$${plan.yearlyPrice} /year`}</span>
          <span className="flex items-center justify-center rounded-3xl bg-cyan-400/50 px-2 py-1 text-xs">
            {plan.discount}
          </span>
        </div>
      ) : (
        <span>{`$${plan.monthlyPrice} /month`}</span>
      )}
      <div
        className="relative flex cursor-pointer rounded-3xl border border-cyan-400"
        onClick={() => setYearly(!yearly)}
      >
        <div
          className={`${
            yearly ? "right-0 " : "right-[50%] "
          } absolute h-full w-[50%] rounded-3xl bg-cyan-400/50 transition-all duration-300`}
        ></div>
        <button className="py- z-10 rounded-3xl px-4">Monthly</button>
        <button className="z-10 rounded-3xl px-4 py-0.5">Annually</button>
      </div>
      <span>{plan.checklistTitle}</span>
      <ul className="flex w-full flex-col items-start justify-start gap-2 px-2 pb-10">
        {plan.checklist.map((c: any) => (
          <li className="flex items-center gap-1">
            <CheckIcon className="h-4 w-4 fill-green-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <Link
        href={plan.checkoutLink}
        className="rounded-3xl bg-green-900 px-4 py-2 text-xs sm:text-base"
      >
        {plan.buttonContent}
      </Link>
    </div>
  );
};

export default Plan;
