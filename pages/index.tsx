import PrimaryButton from "@/components/Buttons/Primary";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <section className="flex flex-col px-4">
      <div className="flex h-[97vh] w-full flex-col items-center gap-10 py-24">
        <div className="flex max-w-2xl flex-col items-center justify-center gap-4 text-center text-2xl">
          <h1 className="text-5xl font-bold">
            The best nutrition plans on the internet
          </h1>
          <div className="flex flex-col">
            <span className="text-md opacity-50">
              Choose the plan that fits your requirements
            </span>
            <span className="text-md opacity-50">
              Receive a nutrition plan every week
            </span>
          </div>
        </div>
        <PrimaryButton href="/subscribe" content="Start my plan now ->" />
      </div>
      <FAQ />
      <CallToAction />
    </section>
  );
}
