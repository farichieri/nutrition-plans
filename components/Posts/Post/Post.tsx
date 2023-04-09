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
    <Link href={`/blog/${post.id}`} className="flex h-full overflow-auto">
      <Image
        src={`/images/posts/${post.id}.png`}
        width={200}
        height={200}
        alt={post.title}
        className="rounded-3xl "
      />
      <div className="flex flex-col justify-between gap-4 p-5">
        <span>{post.topic}</span>
        <span className="font-semibold md:text-3xl">{post.title}</span>
        <Date dateString={post.date} />
      </div>
    </Link>
  );
};

export default Post;
