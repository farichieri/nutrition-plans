import { BlogPosting, WithContext } from "schema-dts";
import { IMAGES } from "@/constants";
import { Mdx } from "@/components/MDX-Components/MDX-Components";
import { Plan, allPlans } from "contentlayer/generated";
import { StructuredData } from "@/components";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import RestOfPlans from "@/components/Plans/RestOfPlans";
import { getTableOfContents } from "@/lib/toc";
import { DashboardTableOfContents } from "@/components/Toc/Toc";

interface Props {
  restOfPlans: Plan[];
  data: Plan;
  toc: any;
}

export default function Page({ data, restOfPlans, toc }: Props) {
  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    isFamilyFriendly: true,
    image: [data.imageURL],
    author: {
      "@type": "Person",
      name: "Nutrition Plans CO",
    },
    url: data.URL,
    publisher: {
      "@type": "Organization",
      name: "Nutrition Plans CO",
      logo: {
        "@type": "ImageObject",
        url: IMAGES.LOGO,
      },
    },
    datePublished: data.date,
    dateModified: data.date,
    keywords: data.keywords,
  };

  const title = `${data.title} | Nutrition Plans CO`;

  return (
    <LandingLayout>
      <StructuredData data={structuredData} />
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={data.URL} />
        <meta name="description" content={data.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={data.date} />
        <meta property="article:section" content="Nutrition" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={data.URL} />
        <meta property="title" content={title} />
        {data.keywords.map((keyword: string, index: number) => (
          <meta property="article:tag" content={keyword} key={index} />
        ))}
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="twitter:domain" content="nutritionplans.co" />
        <meta property="twitter:url" content={data.URL} />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.imageURL} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.imageURL} />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
        <meta property="og:title" content={data.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data.URL} />
        <meta property="og:image:alt" content="Nutrition Plans CO" />
      </Head>
      <div className="relative flex h-full w-full items-start justify-center gap-8">
        <div className="max-w-3xl">
          <article className="mb-10 flex w-full flex-col items-center justify-center px-2 pb-5">
            <div className="mt-14 flex w-full flex-col items-center justify-center gap-4 pb-10">
              <h1 className="mb-8 text-5xl font-extrabold md:text-6xl lg:text-7xl">
                {data.title}
              </h1>
              <figure className="h-full w-full max-w-[500px] overflow-hidden rounded-3xl border shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]">
                <BlurImage
                  image={{
                    imageURL: data.image!,
                    title: data.title!,
                    id: data._id,
                  }}
                  customContainerClass="!aspect-h-1 !aspect-w-1"
                />
              </figure>
            </div>
            <Mdx code={data.body.code} />
          </article>
          <aside className="space-y-8 border-t py-14">
            <RestOfPlans plans={restOfPlans} />
            <CallToAction />
          </aside>
        </div>
        <aside className="sticky top-16 hidden w-xxs overflow-y-auto pt-10 lg:flex">
          <DashboardTableOfContents toc={toc} />
        </aside>
      </div>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = allPlans.map((doc) => ({
    params: {
      id: doc.slugAsParams,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const data = allPlans.find((doc) => doc.slugAsParams === params.id);
  const restOfPlans = allPlans.filter((doc) => doc.slugAsParams !== params.id);

  const toc = data && (await getTableOfContents(data.body.raw));

  return {
    props: {
      data,
      restOfPlans,
      toc,
    },
  };
};
