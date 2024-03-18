import Head from "next/head";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdTrendingFlat } from "react-icons/md";
import type { BlogPosting, WithContext } from "schema-dts";

import { CustomMDX, StructuredData } from "@/components";
import OtherPosts from "@/components/OtherPosts/OtherPosts";
import DateC from "@/components/Posts/Post/DateC/DateC";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import { getBlogPosts } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const posts = getBlogPosts();
  let post = posts.find((post) => post.slug === params.id);

  const otherPosts =
    post &&
    posts
      .filter(
        (doc) =>
          doc.metadata.mainTopic === post?.metadata.mainTopic &&
          doc.slug !== post?.slug
      )
      .slice(0, 3);

  if (!post) {
    notFound();
  }

  const { metadata } = post;

  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": metadata.URL,
    },
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
        url: "https://nutritionplans.co/images/logo.png",
      },
    },
    datePublished: metadata.date,
    dateModified: metadata.date,
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <Head>
        <title>{metadata.title}</title>
        <link rel="canonical" href={metadata.URL} />
        <meta name="description" content={metadata.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={metadata.date} />
        <meta property="article:section" content="Blog" />
        <meta property="title" content={metadata.title} key="title" />
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
      <div className="relative px-4 flex h-full w-full items-start justify-center gap-8">
        <div className="max-w-3xl">
          <article className="z-10 mx-auto mb-10 flex w-full flex-col justify-center bg-white px-2 pb-5 pt-10 dark:bg-black">
            <aside>
              <Link
                href={"/blog"}
                className="flex items-center gap-1 opacity-50 duration-100 hover:opacity-100"
              >
                <MdTrendingFlat className="h-5 w-5 -rotate-180 transform" />
                <span>All posts</span>
              </Link>
            </aside>
            <div className="flex flex-col items-center justify-center gap-6 pb-6">
              <h1 className="text-left text-3xl font-bold uppercase sm:text-4xl md:text-5xl lg:text-6xl">
                {metadata.title}
              </h1>
              <div className="flex items-center gap-1 opacity-50">
                <DateC dateString={metadata.date} />
                {/* &#8226; */}
                {/* <span>{metadata.timeReading}</span> */}
              </div>

              <figure className="relative w-full overflow-auto rounded-3xl border shadow-lg">
                <BlurImage
                  width={1200}
                  height={900}
                  src={metadata.image}
                  alt={metadata.title}
                />
              </figure>
            </div>
            <CustomMDX source={post.content} />
          </article>
          <hr />
          <aside className="flex w-full flex-col items-center justify-center gap-20 pb-24">
            {otherPosts && <OtherPosts posts={otherPosts} />}
            <CallToAction />
          </aside>
        </div>
        {/* <aside className="sticky top-16 hidden w-xxs overflow-y-auto pt-10 lg:flex">
        </aside> */}
      </div>
    </>
  );
}
