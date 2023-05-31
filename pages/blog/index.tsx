import LandingLayout from "@/layouts/LandingLayout";
import Posts from "@/components/Posts/Posts";
import { Posts as PostsType } from "@/types";
import { directories, getSortedData } from "@/utils/mds";

interface Props {
  posts: PostsType;
}

export default function Blog({ posts }: Props) {
  console.log({ posts });
  return (
    <LandingLayout>
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 py-24">
        <span className="mb-10 text-5xl font-bold md:text-6xl lg:text-7xl">
          Blog
        </span>
        <Posts posts={posts} />
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedData(directories.postsDirectory);
  return {
    props: { posts: allPostData },
  };
};
