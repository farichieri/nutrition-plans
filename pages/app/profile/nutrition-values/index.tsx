import PremiumLayout from "@/layouts/PremiumLayout";
import Results from "@/components/Premium/Calculator/Results";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center justify-center gap-5 px-4 py-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          <Results handleSubmit={handleSubmit} />
        </div>
      </section>
    </PremiumLayout>
  );
}
