import { FC, useState } from "react";
import FAQ from "./FAQ";

interface Props {
  content: { title: string; answer: string }[];
}

const FAQS: FC<Props> = ({ content }) => {
  const [open, setOpen] = useState(-1);

  return (
    <section className="flex w-full max-w-2xl flex-col items-center justify-center gap-14">
      <h1 className="text-center text-4xl font-bold xl:text-5xl">FAQs</h1>
      <div className="flex flex-col divide-y overflow-auto rounded-md">
        {content.map((faq, index) => (
          <FAQ
            content={faq}
            key={faq.title}
            index={index}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQS;
