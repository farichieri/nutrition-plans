import { directories, getAllMDIDS, getAllMDData } from "@/utils/mds";
import { Post } from "@/types/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CallToAction from "@/components/CallToAction";
import Date from "@/components/Posts/Post/Date/Date";
import Image from "next/image";
import LandingLayout from "@/components/Layout/LandingLayout";
import remarkGfm from "remark-gfm";

interface Props {
  postData: Post;
}

export default function Page({ postData }: Props) {
  console.log({ postData });
  return (
    <LandingLayout>
      <section className="flex max-w-5xl flex-col py-24">
        <div className="mb-10 flex flex-col items-center justify-center gap-6 border-b pb-14">
          <span className="text-center text-3xl font-bold sm:text-5xl">
            {postData.title}
          </span>
          <div className="flex items-center gap-1 opacity-50">
            <Date dateString={postData.date} />
            &#8226;
            <span>{postData.timeReading}</span>
          </div>
          <span className="relative h-[80vh] w-full overflow-auto rounded-lg">
            <Image
              src={postData.image}
              alt={postData.title}
              fill
              className="object-cover"
            />
          </span>
        </div>
        <ReactMarkdown
          className="border-b pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            img: (props) => (
              <div className="relative mx-auto my-5 h-[50vh] w-full">
                <Image
                  src={props.src || ""}
                  alt={props.alt || ""}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ),
          }}
        >
          {postData.content}
        </ReactMarkdown>
        <CallToAction />
      </section>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(directories.postsDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const postData = await getAllMDData(directories.postsDirectory, params.id);
  return {
    props: {
      postData,
    },
  };
};
