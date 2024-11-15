import { Post } from "@/.contentlayer/generated";
import Link from "next/link";
import { FC } from "react";
import BlurImage from "../blur-image";
import DateC from "./Post/DateC/DateC";

interface Props {
  posts: Post[];
}

const BlogPosts: FC<Props> = ({ posts }) => {
  const postsSortedByDate = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex w-full flex-col gap-10 ">
      {postsSortedByDate.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="flex h-auto flex-wrap gap-2 sm:flex-nowrap sm:gap-4"
        >
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border object-cover box-shadow-full sm:h-56 sm:w-72 sm:min-w-[18rem]">
            <BlurImage
              src={post.image}
              alt={post.title}
              width={532}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-start gap-2 sm:gap-4">
            <span className="text-xl font-semibold uppercase md:text-2xl lg:text-3xl xl:text-4xl">
              {post.title}
            </span>
            <span className="text-green-500">{post.mainTopic}</span>
            <div className="flex items-center gap-1 opacity-70">
              <DateC dateString={post.date} />
              &#8226;
              <span>{post.timeReading}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPosts;
