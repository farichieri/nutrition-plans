import { FC } from "react";
import { MdInfo } from "react-icons/md";
import { Tooltip } from "react-tooltip";

interface Props {
  customClass?: string;
  id: string;
  message: string;
}

const InfoTooltip: FC<Props> = ({ message, id, customClass }) => {
  return (
    <>
      <MdInfo id={id} className="h-6 w-6 text-slate-500" />
      <Tooltip anchorSelect={`#${id}`} className={`z-100 ${customClass}`}>
        <div className="max-w-xs sm:max-w-sm">{message}</div>
      </Tooltip>
    </>
  );
};

export default InfoTooltip;
