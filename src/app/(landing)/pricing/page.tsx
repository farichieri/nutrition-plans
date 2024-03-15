import Head from "next/head";

import FAQS from "@/components/FAQS/FAQS";
import Plans from "@/components/Pricing/PricingPlans";
import { FAQS_PRICING } from "@/data/content";
import { DonateText } from "@/features/stripe";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | Nutrition Plans CO</title>
        <meta
          property="og:title"
          content="Nutrition Plans Pricing"
          key="title"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex w-full max-w-5xl flex-col items-center px-4 pb-24 pt-16">
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
    </>
  );
}
