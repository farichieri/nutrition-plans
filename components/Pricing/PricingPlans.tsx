import { PRICING_PLANS } from "@/utils/content";
import Plan from "./PricingPlan";

const PricingPlans = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5 ">
      {PRICING_PLANS.map((plan) => (
        <Plan pricingPlan={plan} key={plan.name} />
      ))}
    </div>
  );
};

export default PricingPlans;
