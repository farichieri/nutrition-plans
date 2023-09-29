import { SUBSCRIPTION_PLANS } from "@/data/content";
import { SubscriptionPlan } from "@/types";
import dynamic from "next/dynamic";

const Plan = dynamic(() => import("./PricingPlan"), { ssr: false });

const PricingPlans = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-5 ">
      {SUBSCRIPTION_PLANS.map((price: SubscriptionPlan) => (
        <Plan price={price} key={price.name} />
      ))}
    </div>
  );
};

export default PricingPlans;
