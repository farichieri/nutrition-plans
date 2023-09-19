import { DonateText } from "@/features/stripe";
import { FAQS_PRICING } from "@/data/content";
import FAQS from "@/components/FAQS/FAQS";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import Plans from "@/components/Pricing/PricingPlans";

export default function Pricing() {
  return (
    <LandingLayout>
      <Head>
        <title>Pricing | Nutrition Plans CO</title>
        <meta
          property="og:title"
          content="Nutrition Plans Pricing"
          key="title"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex w-full max-w-5xl flex-col items-center pb-24 pt-16">
        <span className="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">
          Pricing
        </span>
        <Plans />
        <div className="mt-6">
          <DonateText />
        </div>
        <div className="my-24 flex w-full items-center justify-center">
          <FAQS content={FAQS_PRICING} />
        </div>
      </section>
    </LandingLayout>
  );
}
