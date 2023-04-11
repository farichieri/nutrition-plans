import { directories, getAllMDIDS, getAllMDData } from "@/utils/mds";
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
      <section className="max-w-5xl py-10">
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
  const paths = getAllMDIDS(directories.postsDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const postData = await getAllMDData(directories.postsDirectory, params.id);
  console.log(params.id);
  return {
    props: {
      postData,
    },
  };
};