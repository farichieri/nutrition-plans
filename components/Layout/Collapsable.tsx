import { FC, ReactNode, useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface Props {
  showed: ReactNode;
  hidden: ReactNode;
  defaultState: boolean;
}

const Collapsable: FC<Props> = ({ showed, hidden, defaultState }) => {
  const [open, setOpen] = useState(defaultState);

  return (
    <div
      className={`flex w-full flex-col gap-1 rounded-md px-4 py-2 ${
        open ? "bg-gray-300/30 dark:bg-gray-500/20" : ""
      }`}
    >
      <div onClick={() => setOpen(!open)} className="select-none">
        <div className="flex w-full cursor-pointer items-center justify-between">
          {showed}
          <MdExpandMore
            className={`h-6 w-6 duration-200 ease-in-out ${
              open && "-rotate-180 transform text-green-500"
            }`}
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-1 overflow-hidden pl-1 text-sm transition-[max-height] duration-200 ease-linear sm:text-base ${
          open ? " max-h-[30rem]" : "max-h-0"
        }`}
      >
        {hidden}
      </div>
    </div>
  );
};

export default Collapsable;
