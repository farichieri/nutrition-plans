import { MdTrendingFlat } from "react-icons/md";
import { Mdx } from "@/components/MDX-Components/MDX-Components";
import { Post, allPosts } from "@/.contentlayer/generated";
import { StructuredData } from "@/components";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import DateC from "@/components/Posts/Post/DateC/DateC";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import type { BlogPosting, WithContext } from "schema-dts";

interface Props {
  data: Post;
}

export default function Page({ data }: Props) {
  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.URL,
    },
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
        url: "https://nutritionplans.co/images/logo.png",
      },
    },
    datePublished: data.date,
    dateModified: data.date,
    keywords: data.keywords,
  };

  return (
    <LandingLayout>
      <StructuredData data={structuredData} />
      <Head>
        <title>{data.title}</title>
        <link rel="canonical" href={data.URL} />
        <meta name="description" content={data.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={data.date} />
        <meta property="article:section" content="Blog" />
        <meta property="title" content={data.title} key="title" />
        {data.keywords.map((keyword, index) => (
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
      <article className="mb-10 flex w-full max-w-3xl flex-col justify-center border-b pb-5 pt-14">
        <aside>
          <Link
            href={"/blog"}
            className="flex items-center gap-1 opacity-50 duration-100 hover:opacity-100"
          >
            <MdTrendingFlat className="h-5 w-5 -rotate-180 transform" />
            <span>Back to Blog</span>
          </Link>
        </aside>
        <div className="flex flex-col items-center justify-center gap-6 pb-6">
          <h1 className="text-left text-3xl font-bold uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <div className="flex items-center gap-1 opacity-50">
            <DateC dateString={data.date} />
            &#8226;
            <span>{data.timeReading}</span>
          </div>

          <figure className="relative h-[80vh] w-full overflow-auto rounded-lg border shadow-lg">
            <BlurImage
              image={{
                imageURL: data.image,
                title: data.title,
                id: data._id,
              }}
            />
          </figure>
        </div>
        <Mdx code={data.body.code} />
      </article>
      <div className="my-24 flex w-full items-center justify-center">
        <CallToAction />
      </div>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = allPosts.map((doc) => ({
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
  const data = allPosts.find((doc) => doc.slugAsParams === params.id);
  return {
    props: {
      data,
    },
  };
};
