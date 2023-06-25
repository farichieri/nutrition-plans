import BMRCalculator from "@/features/authentication/components/create-user/body-features/BodyFeatures";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

export default function Page() {
  const handleContinue = () => {};
  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={false} title="body features" />
      <section className="m-auto  flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          <BMRCalculator handleContinue={handleContinue} />
        </div>
      </section>
    </PremiumLayout>
  );
}
