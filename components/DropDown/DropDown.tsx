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
        className="flex cursor-pointer rounded-full shadow-green-300 duration-300 hover:shadow-[0_0_20px] dark:shadow-green-500/70"
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        {btnText}
      </div>
      {open && (
        <div className="absolute -bottom-2 right-0 gap-2 ">
          <div className="absolute right-2 -mt-1 h-2 w-2 rotate-45 bg-[var(--modal)] shadow-inner shadow-[var(--box-shadow-light)]"></div>
          <div
            className="drop-menu"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="menu">{children}</div>
          </div>
          <div
            className="modal"
            onClick={(event) => {
              event.preventDefault();
              setOpen(!open);
            }}
          ></div>
        </div>
      )}
      <style jsx>{`
        }
        .modal {
          position: fixed;
          background: transparent;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          display: block;
        }
        .menu {
          height: auto;
          width: 100%;
          width: auto;
        }
        .drop-menu {
          position: absolute;
          background: inherit;
          background: lightgray;
          box-shadow: 0 0 6px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: auto;
          right: 0;
          z-index: 12;
          font-size: 80%;
          height: auto;
          min-width: fit-content;
          width: 6rem;
          padding: 0.5rem 0rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rdp-row {
        }
      `}</style>
    </div>
  );
};

export default DropDown;
