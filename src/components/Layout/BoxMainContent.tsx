import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  customClass?: string;
}
const BoxMainContent: FC<Props> = ({ children, customClass }) => {
  return (
    <div className={`flex w-full justify-between p-4 ${customClass}`}>
      {children}
    </div>
  );
};

export default BoxMainContent;
