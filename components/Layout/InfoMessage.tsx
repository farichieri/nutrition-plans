import { FC } from "react";

interface Props {
  message: string;
}

const InfoMessage: FC<Props> = ({ message }) => {
  return (
    <div className="flex items-start gap-1.5 opacity-50">
      <span className="material-icons-outlined">info</span>
      <span>{message}</span>
    </div>
  );
};

export default InfoMessage;
