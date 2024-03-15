import Head from "next/head";

import Plans from "@/components/Plans/Plans";
import { getPlansAvailable } from "@/utils";

export default function Page() {
  const plans = getPlansAvailable();

  console.log({ plans });

  return (
    <>
      <Head>
        <title>Plans | Nutrition Plans CO</title>
        <meta
          property="og:title"
          content="Nutrition Plans | Plans Available"
          key="title"
        />
      </Head>
      <section className="flex w-full max-w-5xl flex-col items-center px-4 pb-24 pt-16">
        <h1 className="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">
          Plans
        </h1>
        <div>
          <p>
            Nutrition plans are essential for a healthy diet. That&apos;s why we
            develop different diet plans to suit your goals, tastes and personal
            requirements, helping you achieve your desired goal in a calculated
            and simple way. Do not worry about the composition, we will do it
            for you.
          </p>
          <p>
            We have created simple, effective and unique plans to plan your
            meals. Each plan includes the macro-nutrients needed for your chosen
            goal, daily energy requirements, and additional tools to help you
            complete your weekly meals. They are designed to provide you with
            the carbohydrates, proteins and fats your body needs each day to
            function optimally.
          </p>
        </div>
        <Plans plans={plans} />
      </section>
    </>
  );
}
