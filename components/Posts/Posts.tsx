import { FC } from "react";
import { Posts } from "@/types/types";
import Post from "./Post/Post";

interface Props {
  posts: Posts;
}

const Posts: FC<Props> = ({ posts }) => {
  return (
    <div className="flex w-full flex-col gap-10 ">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
