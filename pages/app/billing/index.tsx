import PremiumLayout from "@/components/Layout/PremiumLayout";
import PremiumPricingPlans from "@/components/Premium/Pricing/PremiumPricingPlans";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col p-4">
        <span>Subscribe now.....</span>
        <PremiumPricingPlans />
      </section>
    </PremiumLayout>
  );
}
