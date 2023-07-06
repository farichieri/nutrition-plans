import { selectAuthSlice } from "@/features/authentication/slice";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import PricingPlans from "@/components/Pricing/PricingPlans";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);

  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-10 px-4 py-14">
        <div className="flex flex-col items-center text-center text-xs md:text-base">
          <span className="text-xl font-semibold">Subscription Plans</span>
          <span>
            You are currently on the{" "}
            <span className="capitalize">{user?.subscriptionState}</span> plan.
          </span>
          <span>
            {user?.subscriptionState === "free" &&
              "Upgrade to get full access to all the features."}
          </span>
        </div>
        <PricingPlans />
      </section>
    </PremiumLayout>
  );
}
