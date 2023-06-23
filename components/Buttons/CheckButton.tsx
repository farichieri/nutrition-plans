import { FC, MouseEventHandler } from "react";
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
        <span className="material-icons text-green-500">check_circle</span>
      ) : (
        <span className="material-icons">radio_button_unchecked</span>
      )}
    </RoundButton>
  );
};

export default CheckButton;
