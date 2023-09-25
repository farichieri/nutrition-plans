import { FC } from "react";
import { Post } from "@/.contentlayer/generated";
import BlurImage from "../blur-image";
import Date from "./Post/Date/Date";
import Link from "next/link";

interface Props {
  posts: Post[];
}

const BlogPosts: FC<Props> = ({ posts }) => {
  return (
    <div className="flex w-full flex-col gap-10 ">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="flex h-full flex-wrap gap-2 overflow-auto sm:flex-nowrap sm:gap-4"
        >
          <span className="relative h-64 w-full overflow-hidden rounded-lg sm:h-56 sm:w-56 sm:min-w-[14rem]">
            <BlurImage
              image={{
                imageURL: post.image,
                title: post.title,
                id: post.id,
              }}
            />
          </span>
          <div className="flex flex-col justify-start gap-2 sm:gap-4">
            <span className="text-xl font-semibold uppercase md:text-2xl lg:text-3xl xl:text-4xl">
              {post.title}
            </span>
            <span className="text-green-500">{post.topic}</span>
            <div className="flex items-center gap-1 opacity-70">
              <Date dateString={post.date} />
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
