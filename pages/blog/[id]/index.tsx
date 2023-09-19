import { getAllMDIDS, getAllMDData, MDDirectories } from "@/utils/mds";
import { MdTrendingFlat } from "react-icons/md";
import { Post } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { StructuredData } from "@/components";
import { useCanonicalURL } from "@/hooks";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import Date from "@/components/Posts/Post/Date/Date";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import type { BlogPosting, WithContext } from "schema-dts";

interface Props {
  postData: Post;
}

export default function Page({ postData }: Props) {
  const canonicalURL = useCanonicalURL();

  const structuredData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalURL,
    },
    headline: postData.title,
    description: postData.description,
    isFamilyFriendly: true,
    image: [postData.imageURL],
    author: {
      "@type": "Person",
      name: "Nutrition Plans CO",
    },
    url: canonicalURL,
    publisher: {
      "@type": "Organization",
      name: "Nutrition Plans CO",
      logo: {
        "@type": "ImageObject",
        url: "https://nutritionplans.co/images/logo.png",
      },
    },
    datePublished: postData.date,
    dateModified: postData.date,
    keywords: postData.keywords,
  };

  return (
    <LandingLayout>
      <StructuredData data={structuredData}>
        <title>{postData.title}</title>
        <link rel="canonical" href={canonicalURL} />
        <meta name="description" content={postData.description} />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={postData.date} />
        <meta property="article:section" content="Blog" />
        <meta property="title" content={postData.title} key="title" />
        {postData.keywords.map((keyword, index) => (
          <meta property="article:tag" content={keyword} key={index} />
        ))}
        {/* twitter Meta Tags*/}
        <meta name="twitter:creator" content="@nutritionplans_" />
        <meta name="twitter:site" content="@nutritionplans_" />
        <meta property="twitter:domain" content="nutritionplans.co" />
        <meta property="twitter:url" content={canonicalURL} />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={postData.description} />
        <meta name="twitter:image" content={postData.imageURL} />
        {/* Facebook Meta Tags */}
        {/* <meta property="og:image:height" content="1280" /> */}
        {/* <meta property="og:image:width" content="630" /> */}
        <meta property="og:description" content={postData.description} />
        <meta property="og:image:secure_url" content={postData.imageURL} />
        <meta property="og:image" content={postData.imageURL} />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta property="og:site_name" content="Nutrition Plans CO" />
        <meta property="og:title" content={postData.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalURL} />
      </StructuredData>
      <article className="flex max-w-4xl flex-col pt-14">
        <aside>
          <Link
            href={"/blog"}
            className="flex items-center gap-1 opacity-50 duration-100 hover:opacity-100"
          >
            <MdTrendingFlat className="h-5 w-5 -rotate-180 transform" />
            <span>Back to Blog</span>
          </Link>
        </aside>
        <div className="mb-10 flex flex-col items-center justify-center gap-6 border-b pb-4 ">
          <h1 className="text-left text-3xl font-bold uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {postData.title}
          </h1>
          <div className="flex items-center gap-1 opacity-50">
            <Date dateString={postData.date} />
            &#8226;
            <span>{postData.timeReading}</span>
          </div>

          <figure className="relative h-[80vh] w-full overflow-auto rounded-lg">
            <BlurImage
              image={{
                imageURL: postData.image,
                title: postData.title,
                id: postData.id,
              }}
            />
          </figure>
        </div>
        <ReactMarkdown
          className="border-b pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            img: (props) => (
              <div className="relative mx-auto my-5 h-[50vh] w-full overflow-hidden rounded-md">
                <BlurImage
                  image={{
                    imageURL: props.src!,
                    title: props.alt!,
                    id: props.alt!,
                  }}
                />
              </div>
            ),
            li: (props) => (
              <li
                className=" before:absolute before:-ml-4 before:inline-block before:text-gray-500 before:content-['–']"
                {...props}
              />
            ),
          }}
        >
          {postData.content}
        </ReactMarkdown>
      </article>
      <div className="my-24 flex w-full items-center justify-center">
        <CallToAction />
      </div>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(MDDirectories.posts);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const postData = await getAllMDData(MDDirectories.posts, params.id);
  return {
    props: {
      postData,
    },
  };
};
