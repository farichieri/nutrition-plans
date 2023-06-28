import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BoxMainContent: FC<Props> = ({ children }) => {
  return <div className="flex w-full justify-between p-4">{children}</div>;
};

export default BoxMainContent;
