import { FC } from "react";
import FAQ from "./FAQ";

const FAQS_CONTENT = [
  {
    title: "Title",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "Title",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "Title",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
  {
    title: "Title",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic. Facilis, provident incidunt cumque ducimus officiis dolorem quos quam sint dignissimos asperiores, dicta voluptate, numquam unde? Esse ducimus praesentium atque!",
  },
];

interface Props {}

const FAQS: FC<Props> = () => {
  return (
    <section className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-center text-4xl font-bold xl:text-5xl">
        Frequently Asked Questions
      </h1>
      {FAQS_CONTENT.map((faq) => (
        <FAQ content={faq} />
      ))}
    </section>
  );
};

export default FAQS;
