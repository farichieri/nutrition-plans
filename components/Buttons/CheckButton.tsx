import { FC, MouseEventHandler } from "react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import RoundButton from "./RoundButton";

interface Props {
  onClick: MouseEventHandler;
  checked: boolean;
}

const CheckButton: FC<Props> = ({ onClick, checked }) => {
  return (
    <RoundButton
      customClass="w-10 h-10 p-1.5 my-auto ml-auto "
      onClick={onClick}
    >
      {checked ? (
        <MdCheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
      ) : (
        <MdRadioButtonUnchecked className="h-6 w-6 text-gray-500" />
      )}
    </RoundButton>
  );
};

export default CheckButton;
