import { ButtonAction } from "@/types/types";
import { MouseEventHandler } from "react";

const ActionButton = ({
  action,
  content,
  isLoading,
  isDisabled,
  loadMessage,
  onClick,
  className,
}: {
  action: ButtonAction;
  onClick: MouseEventHandler;
  content: string;
  isLoading: boolean;
  isDisabled: boolean;
  loadMessage: string;
  className: string;
}) => {
  if (action === ButtonAction.save) {
    return (
      <button
        className={`flex select-none justify-center rounded-3xl px-4 py-1 font-semibold text-white shadow-[0_1px_5px_gray] duration-300 active:shadow-[0_0_10px_gray] ${className} ${
          isDisabled
            ? "bg-gray-500/50 hover:bg-gray-600/50"
            : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      </button>
    );
  } else if (action === ButtonAction.delete) {
    return (
      <button
        className={`flex select-none justify-center rounded-3xl px-4 py-1 font-semibold text-white shadow-[0_1px_5px_gray] duration-300 active:shadow-[0_0_10px_gray] ${className} ${
          isDisabled
            ? "bg-gray-500/50 hover:bg-gray-600/50"
            : "bg-red-400 hover:bg-red-500"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      </button>
    );
  } else {
    return <></>;
  }
};

export default ActionButton;
