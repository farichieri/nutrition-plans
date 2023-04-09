import PrimaryButton from "components/Buttons/Primary";
import CallToAction from "components/CallToAction";
import FAQ from "components/FAQ";

export default function Home() {
  return (
    <section className="flex flex-col px-4">
      <div className="flex h-[97vh] w-full flex-col items-center gap-10 py-24">
        <div className="flex flex-col items-center justify-center gap-4 text-center text-2xl">
          <h1 className="text-5xl font-bold">
            The best nutrition plans on the internet
          </h1>
          <span>Choose the plan that fits your requirements</span>
          <span>Receive a nutrition plan every week</span>
        </div>
        <PrimaryButton href="/subscribe" content="Start my plan" />
      </div>
      <FAQ />
      <CallToAction />
    </section>
  );
}
