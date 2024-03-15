"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { FC, useState } from "react";

import { SubscriptionPlan } from "@/types";

const IsCurrentPlan = dynamic(() => import("./IsCurrentPlan"), { ssr: false });

interface Props {
  price: SubscriptionPlan;
}

const PricingPlan: FC<Props> = ({ price }) => {
  const [isYearly, setIsYearly] = useState(true);

  const prices = price.prices;
  const monthly = prices?.monthly;
  const yearly = prices?.yearly;

  return (
    <div
      key={price.name}
      className="relative flex min-h-[27rem] w-full max-w-xs select-none flex-col items-center gap-5 rounded-3xl border bg-white px-5 py-10 shadow-[0_3px_20px] shadow-green-800/40 duration-300 dark:bg-primary  dark:shadow-white/10 dark:hover:shadow-white/50"
    >
      {price.beta && (
        <span className="absolute right-0 top-0 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-r from-red-300 via-red-400 to-red-500 px-4 py-1 text-sm font-semibold text-white">
          Discounts for a limited time only!
        </span>
      )}
      <span className="text-3xl font-semibold">{price.name}</span>
      {yearly && monthly && (
        <>
          {isYearly && yearly.price > 0 ? (
            <div className="flex w-fit items-center gap-2 overflow-auto">
              <div className="relative flex w-fit">
                <span className="text-xl">${yearly.price}</span>
              </div>
              <span> /month</span>
              {yearly.discount && (
                <span className="flex items-center justify-center rounded-3xl bg-red-500/50 px-1.5 py-1 text-xs">
                  {yearly.discount}
                </span>
              )}
            </div>
          ) : (
            <div className="relative flex w-fit items-center gap-2 overflow-auto text-center">
              <div className="relative flex w-fit">
                <span className="text-xl">${monthly.price}</span>
              </div>
              <span> /month</span>
              {monthly.discount && (
                <span className="flex items-center justify-center rounded-3xl bg-red-500/50 px-1.5 py-1 text-xs">
                  {monthly.discount}
                </span>
              )}
            </div>
          )}
          {yearly.price > 0 && (
            <div
              className="relative mb-2 flex cursor-pointer rounded-3xl border-green-500 text-sm shadow-[0_0_5px_gray]"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`${
                  isYearly ? "right-0 " : "right-[50%] "
                } absolute h-full w-[50%] rounded-3xl bg-green-500 transition-all duration-300`}
              ></div>
              <button className="py- z-10 rounded-3xl px-4">Monthly</button>
              <button className="z-10 rounded-3xl px-4 py-0.5">Annually</button>
            </div>
          )}
        </>
      )}
      <span className="text-xs">{price.checklistTitle}</span>
      <ul className="flex w-full flex-col items-start justify-start gap-2 px-2">
        {price.checklist.map((c: any, index: number) => (
          <li key={index} className="flex items-center gap-1">
            <CheckCircleIcon className="h-5 w-5 fill-green-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <div className="h-8 mt-auto">
        <IsCurrentPlan price={price} />
      </div>
    </div>
  );
};

export default PricingPlan;
