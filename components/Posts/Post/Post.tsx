import Image from "next/image";
import { FC } from "react";
import { Post } from "@/types/types";
import Date from "./Date/Date";
import Link from "next/link";

interface Props {
  post: Post;
}

const Post: FC<Props> = ({ post }) => {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="flex h-full flex-wrap overflow-auto sm:flex-nowrap"
    >
      <span className="relative h-56 w-full overflow-auto rounded-lg sm:w-56">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </span>
      <div className="flex flex-col justify-between gap-4 p-5">
        <span>{post.topic}</span>
        <span className="font-semibold md:text-3xl">{post.title}</span>
        <div className="flex items-center gap-1 opacity-50">
          <Date dateString={post.date} />
          &#8226;
          <span>{post.timeReading}</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
