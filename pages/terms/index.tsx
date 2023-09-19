import { MDDirectories, getAllMDData } from "@/utils/mds";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import LandingLayout from "@/layouts/LandingLayout";
import remarkGfm from "remark-gfm";

export default function Page({ data }: { data: any }) {
  return (
    <LandingLayout>
      <Head>
        <title>Terms of service | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex w-full max-w-5xl flex-col items-center justify-center py-24">
        <span className="text-5xl font-bold">Terms of service</span>
        <ReactMarkdown
          className="w-full pb-14"
          remarkPlugins={[remarkGfm]}
          components={{
            li: (props) => (
              <li
                className=" before:absolute before:-ml-4 before:inline-block before:text-gray-500 before:content-['–']"
                {...props}
              />
            ),
            p: (props) => <p className="m-0 py-1" {...props} />,
            h3: (props) => (
              <h3 className="mt-10 " {...props}>
                {}
              </h3>
            ),
          }}
        >
          {data.content}
        </ReactMarkdown>
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllMDData(MDDirectories.legal, "terms");
  return {
    props: {
      data,
    },
  };
};
