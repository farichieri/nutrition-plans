import Head from "next/head";
import { notFound } from "next/navigation";

import { CustomMDX } from "@/components";
import { getLegalContent } from "@/utils";

export default function Page() {
  const allLegals = getLegalContent();
  const data = allLegals.find((doc) => doc.slug === "terms");

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>Terms of privacy | Nutrition Plans CO</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex px-4 w-full max-w-5xl flex-col items-center justify-center py-24">
        <span className="text-5xl font-bold">{data.metadata.title}</span>
        <div className="w-full">
          <CustomMDX source={data.content} />
        </div>
      </section>
    </>
  );
}
