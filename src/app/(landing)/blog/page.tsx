import { Post } from "@/.contentlayer/generated";
import BlogPosts from "@/components/Posts/BlogPosts";
import CallToAction from "@/components/call-to-action/CallToAction";
import LandingLayout from "@/layouts/LandingLayout";
import { getBlogPosts } from "@/utils/mds";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export default function Blog({ posts }: Props) {
  return (
    <LandingLayout>
      <Head>
        <title>Blog | Nutrition Plans CO</title>
        <meta property="og:title" content="Nutrition Plans Blog" key="title" />
      </Head>
      <section className="flex px-4 w-full max-w-5xl flex-col items-center gap-10 pb-24 pt-14">
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
  let allBlogs = getBlogPosts();

  console.log(JSON.stringify(allBlogs, null, 2));

  return {
    props: { posts: allBlogs },
  };
};
