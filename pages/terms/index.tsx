import { Mdx } from "@/components/MDX-Components/MDX-Components";
import LandingLayout from "@/layouts/LandingLayout";
import { allLegals } from "contentlayer/generated";
import Head from "next/head";

export default function Page({ data }: { data: any }) {
  return (
    <LandingLayout>
      <Head>
        <title>Terms of service | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex px-4 w-full max-w-5xl flex-col items-center justify-center py-24">
        <h1 className="text-5xl font-bold">{data.title}</h1>
        <div className="w-full">
          <Mdx code={data.body.code} />
        </div>
      </section>
    </LandingLayout>
  );
}

export const getStaticProps = async () => {
  const data = allLegals.find((doc) => doc.slugAsParams === "terms");
  return {
    props: {
      data,
    },
  };
};
