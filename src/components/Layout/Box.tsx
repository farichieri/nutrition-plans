import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  customClass?: string;
  id?: string;
}
const Box: FC<Props> = ({ children, customClass, ...props }) => {
  return (
    <div
      {...props}
      className={`flex w-full flex-col gap-2 rounded-md border bg-white/80 dark:bg-black/50 ${customClass}`}
    >
      {children}
    </div>
  );
};

export default Box;
