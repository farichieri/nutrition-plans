import { FC, ReactNode, useState } from "react";
import { MdExpandMore } from "react-icons/md";

interface Props {
  showed: ReactNode;
  hidden: ReactNode;
  defaultState: boolean;
  doNotExpand?: boolean;
  doNotCollapse?: boolean;
}

const Collapsable: FC<Props> = ({
  showed,
  hidden,
  defaultState,
  doNotExpand,
  doNotCollapse,
}) => {
  const [open, setOpen] = useState(defaultState);

  const handleOpen = () => {
    if (!doNotCollapse) {
      setOpen(!open);
    }
  };

  return (
    <div
      className={`flex w-full flex-col gap-1 rounded-xl border border-transparent px-4 py-2 hover:bg-gray-300/30 dark:hover:bg-gray-500/20 sm:active:border-black/10 sm:dark:active:border-white/10 ${
        open && !doNotExpand ? "bg-gray-300/30 dark:bg-gray-500/20" : ""
      }`}
    >
      <div onClick={handleOpen} className="select-none">
        <div
          className={`flex w-full items-center justify-between ${
            doNotExpand ? "cursor-default" : "cursor-pointer"
          }`}
        >
          {showed}
          {!doNotExpand && (
            <MdExpandMore
              className={`h-6 w-6 duration-200 ease-in-out ${
                open && "-rotate-180 transform text-green-500"
              }`}
            />
          )}
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
