import Posts from "components/Posts/Posts";
import { Metadata } from "next";
import { Posts as PostsType } from "types/types";
import { getSortedPostData } from "utils/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our thoughts on nutrition plans, and more.",
};

export default function Page() {
  const posts: any = getSortedPostData();

  console.log({ posts });

  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-10">
      <span className="text-4xl font-bold">Blog</span>
      <Posts posts={posts} />
    </section>
  );
}
