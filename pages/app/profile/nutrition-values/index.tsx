import PremiumLayout from "@/layouts/PremiumLayout";
import Results from "@/components/Premium/Calculator/Results";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <SubPremiumNav
        title="Nutrition Values"
        customClass="top-[var(--subnav-h)]"
      />
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          <Results handleSubmit={handleSubmit} />
        </div>
      </section>
    </PremiumLayout>
  );
}
