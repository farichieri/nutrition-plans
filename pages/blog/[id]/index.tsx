import { blurDataURL } from "@/components/Layout/BlurDataImage";
import { directories, getAllMDIDS, getAllMDData } from "@/utils/mds";
import { Post } from "@/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CallToAction from "@/components/CallToAction";
import Date from "@/components/Posts/Post/Date/Date";
import Head from "next/head";
import Image from "next/image";
import LandingLayout from "@/layouts/LandingLayout";
import Link from "next/link";
import remarkGfm from "remark-gfm";

interface Props {
  postData: Post;
}

export default function Page({ postData }: Props) {
  return (
    <LandingLayout>
      <Head>
        <title>Nutrition Plans | {postData.title}</title>
        <meta
          property="og:title"
          content={`Nutrition Plans | ${postData.title}`}
          key="title"
        />
      </Head>
      <section className="flex max-w-4xl flex-col pb-24 pt-10">
        <Link
          href={"/blog"}
          className="flex items-center gap-1 opacity-50 duration-100 hover:opacity-100"
        >
          <span className="material-icons-outlined md-14 -rotate-180 transform">
            trending_flat
          </span>
          <span>Back to Blog</span>
        </Link>
        <div className="mb-10 flex flex-col items-center justify-center gap-6 border-b pb-14 ">
          <h1 className="text-left text-3xl font-bold uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            {postData.title}
          </h1>
          <div className="flex items-center gap-1 opacity-50">
            <Date dateString={postData.date} />
            &#8226;
            <span>{postData.timeReading}</span>
          </div>
          <span className="relative h-[80vh] w-full overflow-auto rounded-lg">
            <Image
              src={postData.image}
              alt={postData.title}
              blurDataURL={blurDataURL(1200, 1200)}
              fill
              className="object-cover"
            />
          </span>
        </div>
        <ReactMarkdown
          className="border-b pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            img: (props) => (
              <div className="relative mx-auto my-5 h-[50vh] w-full">
                <Image
                  src={props.src || ""}
                  alt={props.alt || ""}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL(1200, 1200)}
                  className="rounded-lg object-cover"
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
        <CallToAction />
      </section>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(directories.postsDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const postData = await getAllMDData(directories.postsDirectory, params.id);
  return {
    props: {
      postData,
    },
  };
};
