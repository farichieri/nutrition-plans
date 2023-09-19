import { FAQS_INDEX } from "@/data/content";
import { getPlansAvailable } from "@/utils/getPlansAvailable";
import { NewsletterSubscriber, Reveal } from "@/components";
import { PlansType } from "@/types";
import { useCanonicalURL } from "@/hooks";
import { useEffect } from "react";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Goals from "@/components/Goals/Goals";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Props {
  plans: PlansType;
}

export default function Home({ plans }: Props) {
  const canonicalURL = useCanonicalURL();
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <LandingLayout>
      <Head>
        <title>
          Meal Planner | Personalized Nutrition Plans | Nutrition Plans CO
        </title>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <section className="flex w-full flex-col items-center gap-10 pb-20 pt-10">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center text-2xl">
            <h1 className="max-w-6xl bg-gradient-to-br from-green-300 to-green-800 bg-clip-text pb-2 text-4xl font-extrabold text-transparent dark:from-green-300 dark:to-green-800 md:text-6xl lg:text-7xl">
              Achieve Your Desired Physique with Our Meal Planner Platform
            </h1>
            <div className="flex flex-col">
              <p className="my-0 max-w-2xl py-0 text-sm font-semibold opacity-50 md:text-lg">
                Reach your daily nutrient goals and transform your physique with
                our meal planner, while following your preferred type of diet!
              </p>
            </div>
          </div>
          <div className="h-10">
            <Link aria-label="button" href="/signup" tabIndex={0}>
              <PrimaryButton onClick={() => {}} content={`Get Started`} />
            </Link>
          </div>
          <Reveal width="w-full">
            <span className="relative flex h-full w-full overflow-hidden rounded-xl border duration-300">
              <BlurImage
                image={{
                  imageURL: "/images/general/landing-img.png",
                  title: "Demo",
                  id: "Demo",
                }}
                customClass="!object-fill"
                customContainerClass="!aspect-h-4 !aspect-w-8"
              />
            </span>
          </Reveal>
        </div>
        <div className="my-20">
          <Goals />
        </div>
        <div className="my-10 w-full">
          <Reveal width="w-full">
            <div className="flex flex-col gap-5">
              <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
                Adapt your diet
              </h2>
              <span className="relative flex h-full w-full overflow-hidden rounded-xl border duration-300">
                <BlurImage
                  image={{
                    imageURL: "/images/general/search-img.png",
                    title: "Search",
                    id: "Search",
                  }}
                  customClass="!object-fill"
                  customContainerClass="!aspect-h-4 !aspect-w-8"
                />
              </span>
            </div>
          </Reveal>
        </div>
        <div className="my-10 w-full">
          <Reveal width="w-full">
            <div className="flex flex-col gap-5">
              <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
                Follow your Progress
              </h2>
              <span className="relative flex h-full w-full overflow-hidden rounded-xl border duration-300">
                <BlurImage
                  image={{
                    imageURL: "/images/general/landing-progress.png",
                    title: "Progress",
                    id: "Progress",
                  }}
                  customClass="!object-fill"
                  customContainerClass="!aspect-h-4 !aspect-w-8"
                />
              </span>
            </div>
          </Reveal>
        </div>
        <div className="my-10">
          <Reveal width="w-full">
            <>
              <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
                Plans included
              </h2>
              <Plans plans={plans} />
            </>
          </Reveal>
        </div>
        <div className="my-10 flex w-full items-center justify-center">
          <FAQS content={FAQS_INDEX} />
        </div>
        <div className="my-10 flex w-full items-center justify-center">
          <NewsletterSubscriber />
        </div>
        <div className="my-10 flex w-full items-center justify-center">
          <CallToAction />
        </div>
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const plansAvailable = getPlansAvailable();
  return {
    props: { plans: plansAvailable },
  };
};
