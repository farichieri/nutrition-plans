import { FAQS_INDEX } from "@/data/content";
import { getPlansAvailable } from "@/utils/getPlansAvailable";
import { PlansType } from "@/types";
import { NewsletterSubscriber, Reveal } from "@/components";
import { useEffect } from "react";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Goals from "@/components/Goals/Goals";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Props {
  plans: PlansType;
}

export default function Home({ plans }: Props) {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <LandingLayout>
      <section className="flex w-full flex-col items-center gap-10 pb-20 pt-10">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center text-2xl">
            <h1 className="max-w-5xl bg-gradient-to-br from-green-300 to-green-800 bg-clip-text pb-2 text-4xl font-extrabold text-transparent dark:from-green-300 dark:to-green-800 md:text-6xl lg:text-7xl">
              Achieve your desired physique
            </h1>
            <div className="flex flex-col">
              <p className="my-0 max-w-md py-0 text-sm font-semibold opacity-50 md:text-lg">
                Reach the exact amount of nutrients you need
                <br />
                every day to make real physique changes
                <br />
                Choose from a variety of diet plans <br />
                and follow your progress <br />
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
              <span className="mx-auto flex w-fit text-4xl font-bold sm:text-5xl">
                Adapt your diet
              </span>
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
              <span className="mx-auto flex w-fit text-center text-4xl font-bold sm:text-5xl">
                Follow your Progress
              </span>
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
              <span className="mx-auto flex w-fit text-4xl font-bold sm:text-5xl">
                Plans included
              </span>
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
