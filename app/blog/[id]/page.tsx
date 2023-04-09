import CallToAction from "components/CallToAction";
import { getAllPostsIds, getPostData } from "utils/posts";

interface Params {
  id: string;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const allPostsIds = getAllPostsIds();
  return allPostsIds;
}

async function getPost(params: Params) {
  const postData = await getPostData(params.id);
  return postData;
}

export default async function Page({ params }: { params: Params }) {
  const post = await getPost(params);
  console.log({ post });
  return (
    <section className="px-4 py-10">
      <span>Our blog:</span>
      <div
        className="flex flex-col gap-4 px-8 py-10"
        dangerouslySetInnerHTML={{
          __html: post.contentHtml,
        }}
      />
      <CallToAction />
    </section>
  );
}
