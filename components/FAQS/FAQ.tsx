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
      <div className="relative z-20 flex w-full items-center justify-between ">
        <span className="text-xl font-semibold">{content.title}</span>
        {!open ? (
          <ChevronDownIcon className="h-7 w-7 opacity-50" />
        ) : (
          <ChevronUpIcon className="h-7 w-7 opacity-50" />
        )}
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
