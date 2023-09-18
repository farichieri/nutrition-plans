import { MDDirectories, getSortedData } from "@/utils/mds";
import { Posts as PostsType } from "@/types";
import BlogPosts from "@/components/Posts/BlogPosts";
import CallToAction from "@/components/call-to-action/CallToAction";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";

interface Props {
  posts: PostsType;
}

export default function Blog({ posts }: Props) {
  return (
    <LandingLayout>
      <Head>
        <title>Blog | Nutrition Plans CO</title>
        <meta property="og:title" content="Nutrition Plans Blog" key="title" />
      </Head>
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 pb-24 pt-14">
        <h1 className="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">
          Blog
        </h1>
        <BlogPosts posts={posts} />
        <div className="my-24 flex w-full items-center justify-center">
          <CallToAction />
        </div>
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedData(MDDirectories.posts);
  return {
    props: { posts: allPostData },
  };
};
