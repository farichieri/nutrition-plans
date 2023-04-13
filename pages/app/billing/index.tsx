import PremiumLayout from "@/components/Layout/PremiumLayout";
import PricingPlans from "@/components/Pricing/PricingPlans";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);

  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-10 px-4 py-14">
        <div className="flex flex-col items-center text-center text-xs md:text-base">
          <span className="text-xl font-semibold">Subscription Plans</span>
          <span>
            You are currently on the{" "}
            <span className="capitalize">{user?.premium_plan}</span> plan.
          </span>
          <span>
            {user?.premium_plan === "free" &&
              "Upgrade to get access to weekly nutrition plans."}
          </span>
        </div>
        <PricingPlans />
      </section>
    </PremiumLayout>
  );
}
