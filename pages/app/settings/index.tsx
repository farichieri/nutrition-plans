import PremiumLayout from "@/components/Layout/PremiumLayout";
import Settings from "@/components/Premium/Settings/Settings";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="p-4">
        <Settings />
      </section>
    </PremiumLayout>
  );
}
