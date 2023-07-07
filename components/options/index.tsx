import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Options: FC<Props> = ({ children }) => {
  return <div className="flex items-center ">{children}</div>;
};

export default Options;
