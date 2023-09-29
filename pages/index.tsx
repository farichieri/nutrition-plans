import { FAQS_INDEX } from "@/data/content";
import { getPlansAvailable } from "@/utils/getPlansAvailable";
import { IMAGES, METADATA } from "@/constants";
import { NewsletterSubscriber, StructuredData } from "@/components";
import { Plan } from "@/.contentlayer/generated";
import { WebPage, WithContext } from "schema-dts";
import CallToAction from "@/components/call-to-action/CallToAction";
import FAQS from "@/components/FAQS/FAQS";
import Head from "next/head";
import Image from "next/image";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import Plans from "@/components/Plans/Plans";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

interface Props {
  plans: Plan[];
}

export default function Home({ plans }: Props) {
  if (typeof window !== "undefined") {
    window.history.scrollRestoration = "manual";
  }

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": METADATA.URL,
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
    url: METADATA.URL,
    datePublished: "2021-08-01",
    dateModified: "2021-08-01",
    keywords: METADATA.KEYWORDS_DEFAULT,
  };

  return (
    <LandingLayout>
      <StructuredData data={structuredData} />
      <Head>
        <title>Nutrition Plans CO</title>
        <link rel="canonical" href={METADATA.URL} />
        <meta name="description" content={METADATA.DESCRIPTION} />
        {METADATA.KEYWORDS_DEFAULT.map((keyword, index) => (
          <meta property="article:tag" content={keyword} key={index} />
        ))}
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="twitter:domain" content="nutritionplans.co" />
        <meta property="twitter:url" content={METADATA.URL} />
        <meta name="twitter:title" content={METADATA.TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={METADATA.DESCRIPTION} />
        <meta name="twitter:image" content={IMAGES.LANDING} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={METADATA.URL} />
        <meta property="og:title" content={METADATA.TITLE} />
        <meta property="og:description" content={METADATA.DESCRIPTION} />
        <meta property="og:image" content={IMAGES.LANDING} />
        <meta property="og:image:height" content="1280" />
        <meta property="og:image:width" content="630" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
        <meta property="og:image:alt" content="Nutrition Plans CO" />
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
          <Image
            src="/images/general/landing-img.png"
            alt="Demo"
            width={1347}
            height={686}
            className="rounded-3xl border shadow-xl"
            blurDataURL="data:image/webp;base64,UklGRqQEAABXRUJQVlA4WAoAAAAgAAAAEQEAmQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggtgIAALAZAJ0BKhIBmgA+MRiLRKIhoRAUACADBLS3cB10kzZWh7N2oa8dXPzc3cj+UX//9dWYdXDup6OjvoArBW1c0jpsiVnMhsoNEdatcrOyzLEdWkh2AesXA5RqLepkGycicJoCw+1X3suHnyP6EKSWZCDwPj9fPMD+UGJlbIrP91V1nlGnpKf3hE1y4XRvu4qfvV9ch0qnPgosiI9yG71f/vtmJyBDCMhXcZDyftfq80qz7p/BmRqbiSlu89U6D6UaBnuZIWZk+sNI+bvQsi2JOfcSt2tpBHAA/vnoTlKI/XFzcjE25/Fpl8as/PRJKTsDMBfQpXo+GdHaC2XqWWN992jQK761Kd90r7Ei7AqyNK+7EKOp6gm6ADKNO4uBPOcGHuj1rbL6zxtnLxvSip2szGB+Tf8u4lnH3kwdiXUbXtPktXgx4WegzrdZE/c3LGWS3SieY2iqf9RGZ3JpaPScuZ3pLOHENX5TYFVKG9m5m8b6DwKMdjy/rMM1N/FZgBROpvaKTqCg7rZHNDmJnHkkX8FKVdVgTlOv6hknNKELaNOdOzc2jeUJnXf4dwy45bWOtMgHI43JPiMAzN2Boy+fYLxKPHuSUwko/40JEJouzqu0FaYWYL8RrlZDA2xLsSr2Jvu6BswG3h0IUXugx9GUfEUxjo5TkjgG5zCUylODX97wb/4qqrPT7R+83zLtsil71Bp4jwAU2ocrcOgV0o1JGG9Ho0iO3rkeoJlKHxKq3IeICtlguJqmq3bXF0NVDOHVyvstH6F1FQ7cDRUEB+ocL8HqpkbcOzjcKEeFya8qdZ/x1/BVUNi8cpBc0GHlR1kM/k37KPF6dKfjF8zFjYyHbtl6HxaFVoKbLdKjarS4U35/RJMgjCanQH20E94ipMB1kNJYJeDqrJf8srCRjz4WZ0M34AAAAAA="
            placeholder="blur"
          />
        </div>
        <div className="my-10">
          <h2 className="mx-auto my-0 flex w-fit py-0 text-4xl font-extrabold sm:text-5xl">
            Plans included
          </h2>
          <Plans plans={plans} />
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
