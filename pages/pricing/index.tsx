import FAQS from "@/components/FAQS/FAQS";
import LandingLayout from "@/components/Layout/LandingLayout";
import Plans from "@/components/Pricing/PricingPlans";
import { FAQS_PRICING } from "@/utils/content";

export default function Pricing() {
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-24">
        <span className="text-5xl font-bold">Pricing</span>
        <Plans />
        <FAQS content={FAQS_PRICING} />
      </section>
    </LandingLayout>
  );
}
