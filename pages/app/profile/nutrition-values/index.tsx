import PremiumLayout from "@/layouts/PremiumLayout";
import Results from "@/features/authentication/components/create-user/results/Results";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="" />
      <section className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          <Results handleSubmit={handleSubmit} />
        </div>
      </section>
    </PremiumLayout>
  );
}
