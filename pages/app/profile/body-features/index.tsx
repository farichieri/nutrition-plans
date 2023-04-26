import BMRCalculator from "@/components/Premium/Calculator/BodyFeatures";
import PremiumLayout from "@/components/Layout/PremiumLayout";

export default function Page() {
  const handleSubmit = () => {};
  return (
    <PremiumLayout>
      <section className="flex flex-col items-center justify-center gap-5 px-4 py-10">
        {/* <div className="mb-5 w-full border-b pb-10">
          <h1 className="mx-auto w-full max-w-5xl text-3xl font-semibold">
            Profile
          </h1>
        </div> */}
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
          <BMRCalculator handleSubmit={handleSubmit} />
        </div>
      </section>
    </PremiumLayout>
  );
}
