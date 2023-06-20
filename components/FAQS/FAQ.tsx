import { FC } from "react";

interface Props {
  setOpen: Function;
  open: number;
  index: number;
  content: {
    title: string;
    answer: string;
  };
}

const FAQ: FC<Props> = ({ content, setOpen, open, index }) => {
  return (
    <div
      key={content.title}
      className={`flex w-full cursor-pointer select-none flex-col px-2 py-4 ${
        open === index && "bg-gray-300/30 dark:bg-gray-500/20"
      }`}
      onClick={() => setOpen(index === open ? null : index)}
    >
      <div className="relative flex w-full items-center justify-between ">
        <span className="text-xl font-semibold">{content.title}</span>
        <span
          className={`material-icons md-24 duration-200 ease-in-out ${
            open === index && "-rotate-180 transform text-green-500"
          }`}
        >
          expand_more
        </span>
      </div>
      <span
        className={`overflow-hidden px-4 transition-[max-height] duration-300  ${
          open === index ? " max-h-96" : "max-h-0"
        }`}
      >
        {content.answer}
      </span>
    </div>
  );
};

export default FAQ;
