import { getAllPostsIds, getPostData } from "@/utils/posts";
import { Post } from "@/types/types";
import CallToAction from "@/components/CallToAction";
import Date from "@/components/Posts/Post/Date/Date";
import LandingLayout from "@/components/Layout/LandingLayout";

interface Props {
  postData: Post;
}

export default function Page({ postData }: Props) {
  return (
    <LandingLayout>
      <section className="max-w-5xl px-4 py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-5xl font-bold">{postData.title}</span>
          <Date dateString={postData.date} />
        </div>
        <div
          className="flex flex-col gap-4  py-10"
          dangerouslySetInnerHTML={{
            __html: postData.contentHtml,
          }}
        />
        <CallToAction />
      </section>
    </LandingLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
