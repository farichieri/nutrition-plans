import { FC } from "react";
import { Tooltip } from "react-tooltip";

interface Props {
  customClass?: string;
  id: string;
  message: string;
}

const InfoTooltip: FC<Props> = ({ message, id, customClass }) => {
  return (
    <>
      <span className="material-icons md-22 flex text-slate-500" id={id}>
        info
      </span>
      <Tooltip anchorSelect={`#${id}`} className={`z-100 ${customClass}`}>
        <div className="max-w-xs sm:max-w-sm">{message}</div>
      </Tooltip>
    </>
  );
};

export default InfoTooltip;
