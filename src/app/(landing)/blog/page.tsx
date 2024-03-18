import Head from "next/head";

import BlogPosts from "@/components/Posts/BlogPosts";
import CallToAction from "@/components/call-to-action/CallToAction";
import { getBlogPosts } from "@/utils/mds";

export default function Blog() {
  const posts = getBlogPosts();
  console.log(JSON.stringify(posts, null, 2));

  return (
    <>
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
    </>
  );
}
