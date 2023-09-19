import { FAQS_INDEX } from "@/data/content";
import { getPlansAvailable } from "@/utils/getPlansAvailable";
import { IMAGES, METADATA } from "@/constants";
import { NewsletterSubscriber, Reveal, StructuredData } from "@/components";
import { PlansType } from "@/types";
import { useCanonicalURL } from "@/hooks";
import { useEffect } from "react";
import { WebPage, WithContext } from "schema-dts";
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
  const canonicalURL = useCanonicalURL();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  const KEYWORDS = [
    "nutrition plans",
    "diet plan",
    "healthy eating",
    "meal planning",
    "calorie counting",
    "weight loss",
    "balanced diet",
    "vegetarian diet",
    "keto diet",
    "low carb diet",
    "gluten free diet",
    "mediterranean diet",
  ];

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalURL,
    },
    name: METADATA.TITLE,
    headline: "Nutrition Plans CO",
    description: METADATA.DESCRIPTION,
    image: [IMAGES.LANDING],
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "Nutrition Plans CO",
      logo: {
        "@type": "ImageObject",
        url: IMAGES.LOGO,
      },
    },
    url: canonicalURL,
    datePublished: "2021-08-01",
    dateModified: "2021-08-01",
    keywords: KEYWORDS,
  };

  return (
    <LandingLayout>
      <StructuredData data={structuredData}>
        <title>Nutrition Plans CO</title>
        <link rel="canonical" href={canonicalURL} />
        <meta name="description" content={METADATA.DESCRIPTION} />
        {KEYWORDS.map((keyword, index) => (
          <meta property="article:tag" content={keyword} key={index} />
        ))}
        {/* twitter Meta Tags*/}
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="twitter:domain" content="nutritionplans.co" />
        <meta property="twitter:url" content={canonicalURL} />
        <meta name="twitter:title" content={METADATA.TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={METADATA.DESCRIPTION} />
        <meta name="twitter:image" content={IMAGES.LANDING} />
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:title" content={METADATA.TITLE} />
        <meta property="og:description" content={METADATA.DESCRIPTION} />
        <meta property="og:image" content={IMAGES.LANDING} />
        <meta property="og:image:height" content="1280" />
        <meta property="og:image:secure_url" content={IMAGES.LANDING} />
        <meta property="og:image:width" content="630" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
      </StructuredData>
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
