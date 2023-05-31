import FAQS from "@/components/FAQS/FAQS";
import LandingLayout from "@/layouts/LandingLayout";
import Plans from "@/components/Pricing/PricingPlans";
import { FAQS_PRICING } from "@/data/content";

export default function Pricing() {
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-24">
        <span className="mb-10 text-5xl font-bold md:text-6xl lg:text-7xl">
          Pricing
        </span>
        <Plans />
        <FAQS content={FAQS_PRICING} />
      </section>
    </LandingLayout>
  );
}
