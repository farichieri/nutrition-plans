import Link from "next/link";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  href?: string;
  isLink?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  position: "left" | "middle" | "right";
  selected?: boolean;
  id?: string;
}

const Option: FC<Props> = ({
  children,
  href,
  isLink,
  onClick,
  position,
  selected,
  id,
}) => {
  return (
    <>
      {isLink && href ? (
        <Link
          id={id}
          href={href}
          className={`flex h-10 cursor-pointer items-center px-3 text-xs duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 xs:text-sm s:px-3.5 sm:px-5 sm:text-lg ${
            position === "left"
              ? "rounded-l-3xl border-y border-l"
              : position === "middle"
              ? "border-x border-y"
              : position === "right"
              ? "rounded-r-3xl border-y border-r"
              : ""
          } ${selected ? "bg-slate-500/20" : "bg-transparent"}`}
        >
          {children}
        </Link>
      ) : (
        <button
          id={id}
          onClick={onClick}
          className={`flex h-10 cursor-pointer items-center px-3 text-xs duration-100 hover:bg-slate-500/20 active:bg-slate-500/50 xs:text-sm s:px-3.5 sm:px-5 sm:text-lg ${
            position === "left"
              ? "rounded-l-3xl border-y border-l"
              : position === "middle"
              ? "border-x border-y"
              : position === "right"
              ? "rounded-r-3xl border-y border-r"
              : ""
          } ${selected ? "bg-slate-500/20" : "bg-transparent"}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Option;
