import LandingLayout from "@/components/Layout/LandingLayout";
import Plans from "@/components/Pricing/Plans";

export default function Pricing() {
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 py-24">
        <span className="text-5xl font-bold">Pricing</span>
        <Plans />
      </section>
    </LandingLayout>
  );
}
