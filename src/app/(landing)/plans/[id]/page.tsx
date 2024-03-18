import Head from "next/head";
import { notFound } from "next/navigation";
import { BlogPosting, WithContext } from "schema-dts";

import { CustomMDX, StructuredData } from "@/components";
import RestOfPlans from "@/components/Plans/RestOfPlans";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import { IMAGES } from "@/constants";
import { getPlansContent } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let post = getPlansContent().find((post) => post.slug === params.id);
  const restOfPlans = getPlansContent().filter((doc) => doc.slug !== params.id);

  if (!post) {
    notFound();
  }

  const { metadata } = post;

  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    isFamilyFriendly: true,
    image: [metadata.imageURL],
    author: {
      "@type": "Person",
      name: "Nutrition Plans CO",
    },
    url: metadata.URL,
    publisher: {
      "@type": "Organization",
      name: "Nutrition Plans CO",
      logo: {
        "@type": "ImageObject",
        url: IMAGES.LOGO,
      },
    },
    datePublished: metadata.date,
    dateModified: metadata.date,
  };

  const title = `${metadata.title} | Nutrition Plans CO`;

  return (
    <>
      <StructuredData data={structuredData} />
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={metadata.URL} />
        <meta name="description" content={metadata.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={metadata.date} />
        <meta property="article:section" content="Nutrition" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={metadata.URL} />
        <meta property="title" content={title} />
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="twitter:domain" content="nutritionplans.co" />
        <meta property="twitter:url" content={metadata.URL} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.imageURL} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.imageURL} />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.URL} />
        <meta property="og:image:alt" content="Nutrition Plans CO" />
      </Head>
      <div className="relative flex h-full w-full items-start justify-center gap-8">
        <div className="max-w-3xl">
          <article className="mb-10 flex w-full flex-col items-start justify-center px-4 pb-5">
            <div className="mt-14 flex w-full flex-col items-center justify-center gap-4 pb-10">
              <h1 className="mb-8 text-5xl font-extrabold md:text-6xl lg:text-7xl">
                {metadata.title}
              </h1>
              <figure
                key={metadata.URL}
                className="h-full w-auto overflow-hidden rounded-3xl border shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
              >
                <BlurImage
                  width={470}
                  height={470}
                  src={metadata.image}
                  alt={metadata.title}
                />
              </figure>
            </div>
            <CustomMDX source={post.content} />
          </article>
          <aside className="space-y-8 border-t py-14">
            <RestOfPlans plans={restOfPlans} />
            <CallToAction />
          </aside>
        </div>
        {/* <aside className="sticky top-16 hidden w-xxs overflow-y-auto pt-10 lg:flex">
          {toc && <DashboardTableOfContents toc={toc} />}
        </aside> */}
      </div>
    </>
  );
}
