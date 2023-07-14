import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler;
  name?: string;
  id?: string;
  customClass?: string;
}

const RoundButton: FC<Props> = ({
  children,
  onClick,
  name,
  id,
  customClass = "",
}) => {
  return (
    <button
      name={name}
      id={id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
      }}
      className={
        ` flex items-center justify-center rounded-full border border-transparent active:bg-slate-500/30 sm:hover:bg-slate-500/20 sm:active:border-black/10 sm:dark:active:border-white/10 ` +
        customClass
      }
    >
      {children}
    </button>
  );
};

export default RoundButton;
