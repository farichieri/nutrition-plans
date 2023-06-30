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
    <div className="relative flex items-center justify-center">
      <div
        className={`flex cursor-pointer rounded-full duration-300 hover:shadow-[0_0_5px] active:shadow-[0_0_10px] dark:hover:shadow-white ${
          open ? "shadow-[0_0_5px]" : ""
        }`}
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        {btnText}
      </div>
      {open && (
        <div className="absolute -bottom-2 right-0 gap-2 ">
          <div className="absolute right-2 -mt-1 h-2 w-2 rotate-45 border bg-primary-color shadow shadow-gray-500/60"></div>
          <div
            className="absolute right-0 top-auto z-20 overflow-auto rounded-xl border bg-tertiary-color text-base shadow-[0_1px_5px] shadow-gray-500/60 dark:shadow-cyan-200/10"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="h-auto w-max">{children}</div>
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
