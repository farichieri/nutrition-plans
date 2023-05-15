import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center justify-center gap-5 px-4 py-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          Meal Settings
        </div>
      </section>
    </PremiumLayout>
  );
}
