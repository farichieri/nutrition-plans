import { getAllMDIDS, getAllMDData, MDDirectories } from "@/utils/mds";
import { MdTrendingFlat } from "react-icons/md";
import { Post } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useCanonicalURL } from "@/hooks";
import BlurImage from "@/components/blur-image";
import CallToAction from "@/components/call-to-action/CallToAction";
import Date from "@/components/Posts/Post/Date/Date";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import remarkGfm from "remark-gfm";

interface Props {
  postData: Post;
}

export default function Page({ postData }: Props) {
  const canonicalURL = useCanonicalURL();

  return (
    <LandingLayout>
      <Head>
        <title>{postData.title}</title>
        <link rel="canonical" href={canonicalURL} />
        <meta property="title" content={`${postData.title}`} key="title" />
        <meta
          property="og:title"
          content={`${postData.title}`}
          key="og:title"
        />
        <meta name="description" content={postData.description} />
        <meta
          property="og:description"
          content={postData.description}
          key="description"
        />
        <meta property="og:image" content={postData.image} key="image" />
        <meta
          property="og:image:secure_url"
          content={postData.image}
          key="image:secure_url"
        />
        <meta property="article:author" content="Nutrition Plans CO" />
        <meta property="article:published_time" content={postData.date} />
        <meta property="article:section" content="Blog" />
        <meta property="og:locale" content="en_US" key="locale" />
        <meta
          property="og:site_name"
          content="Nutrition Plans CO"
          key="site_name"
        />
        <meta property="og:type" content="article" key="type" />
        <meta property="og:url" content={canonicalURL} key="url" />
      </Head>
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

          <span className="relative h-[80vh] w-full overflow-auto rounded-lg">
            <BlurImage
              image={{
                imageURL: postData.image,
                title: postData.title,
                id: postData.id,
              }}
            />
          </span>
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
