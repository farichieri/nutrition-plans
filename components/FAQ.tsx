import { FC } from "react";

interface Props {}

const FAQ: FC<Props> = () => {
  return (
    <section className="flex max-w-5xl flex-col items-center justify-center py-36">
      <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      <span>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita iure
        maiores odit consectetur veritatis ex beatae ipsam, provident dolore
        aspernatur aliquam facere eveniet eos accusamus modi assumenda dolorem
        numquam aperiam!
      </span>
    </section>
  );
};

export default FAQ;
