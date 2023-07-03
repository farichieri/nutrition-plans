import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <section className="m-auto flex w-full flex-col items-start justify-start gap-5 px-4 pb-4 pt-4 sm:px-8">
        <h1>Supplements & Vitamins</h1>
      </section>
    </PremiumLayout>
  );
}
