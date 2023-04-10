import { FC } from "react";
import FAQ from "./FAQ";

interface Props {
  content: { title: string; answer: string }[];
}

const FAQS: FC<Props> = ({ content }) => {
  return (
    <section className="flex w-full max-w-3xl flex-col items-center justify-center gap-14 py-24">
      <h1 className="text-center text-4xl font-bold xl:text-5xl">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col gap-8">
        {content.map((faq) => (
          <FAQ content={faq} key={faq.title} />
        ))}
      </div>
    </section>
  );
};

export default FAQS;
