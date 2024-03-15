import { notFound } from "next/navigation";

import { CustomMDX } from "@/components";
import { getLegalContent } from "@/utils";

export default async function Page() {
  const allLegals = getLegalContent();
  const data = allLegals.find((doc) => doc.slug === "terms");

  if (!data) {
    return notFound();
  }

  return (
    <section className="flex px-4 w-full max-w-5xl flex-col items-center justify-center py-24">
      <h1 className="text-5xl font-bold">{data.metadata.title}</h1>
      <article className="w-full">
        <CustomMDX source={data.content} />
      </article>
    </section>
  );
}
