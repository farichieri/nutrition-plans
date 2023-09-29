import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/features/authentication/slice";
import { SubscriptionPlan } from "@/types";
import { useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  price: SubscriptionPlan;
}

const PricingPlan: FC<Props> = ({ price }) => {
  const { user } = useSelector(selectAuthSlice);
  const [isYearly, setIsYearly] = useState(true);

  const currentPlan =
    (price.id === "free" && user?.isPremium === false) ||
    (price.id === "premium" && user?.isPremium === true);

  const getStarted =
    (price.id === "free" && !user?.isPremium) ||
    (price.id === "premium" && !user?.isPremium);

  const prices = price.prices;
  const { monthly, yearly } = prices;

  return (
    <div
      key={price.name}
      className="relative flex min-h-[27rem] w-full max-w-xs select-none flex-col items-center gap-5 rounded-3xl border bg-white px-5 py-10 shadow-[0_3px_20px] shadow-green-800/40 duration-300 dark:bg-primary-color  dark:shadow-white/10 dark:hover:shadow-white/50"
    >
      {price.beta && (
        <span className="absolute right-0 top-0 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-r from-red-300 via-red-400 to-red-500 px-4 py-1 text-sm font-semibold text-white">
          Discounts for a limited time only!
        </span>
      )}
      <span className="text-2xl font-medium">{price.name}</span>
      {isYearly && yearly.price > 0 ? (
        <div className="flex w-fit items-center gap-2 overflow-auto">
          <div className="relative flex w-fit">
            <div className="absolute top-1/2 h-0.5 w-full bg-red-500" />
            <span className="text-xl">${monthly.price}</span>
          </div>
          {price.beta && (
            <span className="text text-xl font-bold text-red-500">${4.5}</span>
          )}
          <span> /month</span>
          <span className="flex items-center justify-center rounded-3xl bg-red-500/50 px-1.5 py-1 text-xs">
            {yearly.discount}
          </span>
        </div>
      ) : (
        <div className="relative flex w-fit items-center gap-2 overflow-auto text-center">
          <div className="relative flex w-fit">
            <div className="absolute top-1/2 h-0.5 w-full bg-red-500" />
            <span className="text-xl">${monthly.price}</span>
          </div>
          {price.beta && (
            <span className="text text-xl font-bold text-red-500">${7.5}</span>
          )}
          <span> /month</span>
          <span className="flex items-center justify-center rounded-3xl bg-red-500/50 px-1.5 py-1 text-xs">
            {monthly.discount}
          </span>
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
      {/* <span className="text-xs  ">{price.checklistTitle}</span> */}
      <ul className="flex w-full flex-col items-start justify-start gap-2 px-2">
        {price.checklist.map((c: any, index: number) => (
          <li key={index} className="flex items-center gap-1">
            <CheckCircleIcon className="h-5 w-5 fill-green-500" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      {currentPlan ? (
        <span className="mt-auto flex rounded-md border border-gray-400 px-3 py-2 text-xs dark:border-gray-700">
          Current plan
        </span>
      ) : (
        <>
          {getStarted && (
            <Link
              href={price.checkoutLink}
              className="mt-auto flex rounded-3xl border border-green-500 bg-gradient-to-r from-green-500 via-green-500 to-green-500 px-3 py-2 text-xs text-white duration-300 hover:shadow-[0_1px_10px] hover:shadow-green-300 hover:brightness-110 dark:hover:shadow-green-400/50"
            >
              {price.buttonContent}
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default PricingPlan;
