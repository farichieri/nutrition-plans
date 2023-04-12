import { PRICING_PLANS } from "@/utils/content";
import PremiumPricingPlan from "./PremiumPricingPlan";

const PremiumPricingPlans = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5 ">
      {PRICING_PLANS.map((plan) => (
        <PremiumPricingPlan pricingPlan={plan} key={plan.name} />
      ))}
    </div>
  );
};

export default PremiumPricingPlans;
