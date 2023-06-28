import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Box: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-white/80  dark:bg-black/50">
      {children}
    </div>
  );
};

export default Box;
