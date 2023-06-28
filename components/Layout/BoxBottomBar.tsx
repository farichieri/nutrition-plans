import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BoxBottomBar: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full justify-between border-t bg-slate-300/20 p-4 dark:bg-gray-500/10">
      {children}
    </div>
  );
};

export default BoxBottomBar;
