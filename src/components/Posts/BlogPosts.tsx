import Link from "next/link";
import { FC } from "react";

import { ArticlePost } from "@/types";

import DateC from "./Post/DateC/DateC";

import BlurImage from "../blur-image";

interface Props {
  posts: ArticlePost[];
}

const BlogPosts: FC<Props> = ({ posts }) => {
  const postsSortedByDate = posts.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return (
    <div className="flex w-full flex-col gap-10 ">
      {postsSortedByDate.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="flex h-auto flex-wrap gap-2 sm:flex-nowrap sm:gap-4"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border object-cover box-shadow-full sm:h-56 sm:w-72 sm:min-w-[18rem]">
            <BlurImage
              src={post.metadata.image}
              alt={post.metadata.title}
              width={532}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-start gap-2 sm:gap-4">
            <span className="text-xl font-semibold uppercase md:text-2xl lg:text-3xl xl:text-4xl">
              {post.metadata.title}
            </span>
            <span className="text-green-500">{post.metadata.mainTopic}</span>
            <div className="flex items-center gap-1 opacity-70">
              <DateC dateString={post.metadata.date} />
              {/* &#8226; */}
              {/* <span>{post.metadata.timeReading}</span> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPosts;
