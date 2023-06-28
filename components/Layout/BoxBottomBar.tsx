import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BoxBottomBar: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-[53px] w-full items-center justify-between border-t bg-slate-300/20 px-4 py-2 dark:bg-gray-600/30">
      {children}
    </div>
  );
};

export default BoxBottomBar;
