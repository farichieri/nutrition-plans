import PrimaryButton from "@/components/Buttons/Primary";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import LandingLayout from "@/components/Layout/LandingLayout";
import Image from "next/image";

export default function Home() {
  return (
    <LandingLayout>
      <div className="flex w-full flex-col items-center gap-10 py-24">
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
        <PrimaryButton href="/signup" content="Start my plan now ->" />
        <Image
          src="/images/general/cooking.jpg"
          width={400}
          height={400}
          alt="cooking"
          className="m-auto my-24 flex rounded-3xl shadow-lg dark:shadow-gray-400/20"
        />
      </div>

      <FAQ />
      <CallToAction />
    </LandingLayout>
  );
}
