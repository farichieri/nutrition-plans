import { FC } from "react";
import { Post } from "@/types";
import Date from "./Date/Date";
import Link from "next/link";
import BlurImage from "@/components/BlurImage";

interface Props {
  post: Post;
}

const BlogPost: FC<Props> = ({ post }) => {
  return (
    <Link
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
  );
};

export default BlogPost;
