import Posts from "@/components/Posts/Posts";
import { Posts as PostsType } from "@/types/types";
import { getSortedPostData } from "@/utils/posts";

interface Props {
  posts: PostsType;
}

export default function Blog({ posts }: Props) {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-10">
      <span className="text-4xl font-bold">Blog</span>
      <Posts posts={posts} />
    </section>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();
  return {
    props: { posts: allPostData },
  };
};
