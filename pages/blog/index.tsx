import LandingLayout from "@/components/Layout/LandingLayout";
import Posts from "@/components/Posts/Posts";
import { Posts as PostsType } from "@/types/types";
import { getSortedPostData } from "@/utils/posts";

interface Props {
  posts: PostsType;
}

export default function Blog({ posts }: Props) {
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 py-24">
        <span className="text-5xl font-bold">Blog</span>
        <Posts posts={posts} />
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();
  return {
    props: { posts: allPostData },
  };
};
