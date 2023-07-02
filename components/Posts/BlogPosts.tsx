import { FC } from "react";
import { Posts } from "@/types";
import BlogPost from "./Post/BlogPost";

interface Props {
  posts: Posts;
}

const BlogPosts: FC<Props> = ({ posts }) => {
  return (
    <div className="flex w-full flex-col gap-10 ">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPosts;
