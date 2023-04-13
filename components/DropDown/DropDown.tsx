import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  btnText: any;
  closeDrop: boolean;
  setCloseDrop: Function;
}

const DropDown: FC<Props> = ({
  children,
  btnText,
  closeDrop,
  setCloseDrop,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (closeDrop === true) {
      setOpen(false);
      setCloseDrop(false);
    }
  }, [closeDrop, open]);

  return (
    <div className="relative flex w-6 items-center justify-center">
      <div
        className="flex cursor-pointer rounded-full shadow-[0_0_10px] shadow-green-400/50 duration-300 hover:shadow-[0_0_10px] hover:shadow-green-800 dark:shadow-green-500/30 hover:dark:shadow-green-400/50"
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        {btnText}
      </div>
      {open && (
        <div className="absolute -bottom-2 right-0 gap-2 ">
          <div className="absolute right-2 -mt-1 h-2 w-2 rotate-45 bg-gray-300 shadow shadow-gray-500/60 dark:bg-gray-800"></div>
          <div
            className="absolute right-0 top-auto z-20 rounded-md bg-gray-300 text-base shadow-[0_0_6px_1px] shadow-gray-500/80 dark:bg-gray-800 dark:shadow-cyan-200/40"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="h-auto w-auto">{children}</div>
          </div>
          <div
            className="fixed inset-0 h-screen w-screen "
            onClick={(event) => {
              event.preventDefault();
              setOpen(!open);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
