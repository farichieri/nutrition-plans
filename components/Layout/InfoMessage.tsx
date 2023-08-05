import { FC } from "react";
import { MdInfo } from "react-icons/md";

interface Props {
  message: string;
}

const InfoMessage: FC<Props> = ({ message }) => {
  return (
    <div className="flex items-start gap-1.5 opacity-50">
      <MdInfo className="block h-6 w-6 min-w-fit" />
      <span className="text-sm leading-5">{message}</span>
    </div>
  );
};

export default InfoMessage;
