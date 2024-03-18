import Link from "next/link";

import { ArticlePost } from "@/types";

import DateC from "../Posts/Post/DateC/DateC";
import BlurImage from "../blur-image";

interface Props {
  posts: ArticlePost[];
}

const OtherPosts: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <h2 className="font-semibold">Related posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex h-full flex-wrap gap-2 overflow-auto sm:flex-nowrap sm:gap-4"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-3xl border object-cover shadow-md sm:h-56 sm:w-72 sm:min-w-[18rem]">
                <BlurImage
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  width={532}
                  height={400}
                />
              </div>
              <div className="flex flex-col justify-start gap-2 sm:gap-4">
                <span className="text-xl font-semibold uppercase">
                  {post.metadata.title}
                </span>
                <span className="text-green-500">
                  {post.metadata.mainTopic}
                </span>
                <div className="flex items-center gap-1 opacity-70">
                  <DateC dateString={post.metadata.date} />
                  {/* &#8226; */}
                  {/* <span>{post.metadata.timeReading}</span> */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherPosts;
