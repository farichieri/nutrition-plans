import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}

const RoundButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent p-1.5 active:bg-slate-500/30 sm:hover:bg-slate-500/20 sm:active:border-black/10 sm:dark:active:border-white/10"
    >
      {children}
    </button>
  );
};

export default RoundButton;
