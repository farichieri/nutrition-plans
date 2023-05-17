import { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface Props {
  content: {
    title: string;
    answer: string;
  };
}

const FAQ: FC<Props> = ({ content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      key={content.title}
      className={`flex w-full cursor-pointer select-none flex-col gap-4 ${
        open && "bg-gray-100/40 dark:bg-gray-100/5"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="relative  flex w-full items-center justify-between ">
        <span className="text-xl font-semibold">{content.title}</span>
        <span
          className={`material-icons md-24 duration-200 ease-in-out ${
            open && "-rotate-180 transform text-green-500"
          }`}
        >
          expand_more
        </span>
      </div>
      <span
        className={`overflow-hidden px-4 pt-0 transition-[max-height] duration-300  ${
          open ? " max-h-96" : "max-h-0"
        }`}
      >
        {content.answer}
      </span>
    </div>
  );
};

export default FAQ;
