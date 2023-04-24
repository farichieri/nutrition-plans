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
        className={`flex select-none justify-center rounded-md  border px-4 py-1 text-sm font-medium shadow-[0_1px_5px_gray] duration-300  ${className} ${
          isDisabled
            ? "cursor-not-allowed border-transparent bg-transparent opacity-70"
            : " border-green-500 bg-green-500/70 opacity-100 hover:bg-green-600 active:shadow-[0_0_10px_gray]"
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
        className={`flex select-none justify-center rounded-md border px-4 py-1 text-sm font-medium shadow-[0_1px_5px_gray] duration-300  ${className} ${
          isDisabled
            ? "cursor-not-allowed border-transparent bg-transparent opacity-70"
            : " border-red-500 bg-red-500/70 opacity-100 hover:bg-red-600 active:shadow-[0_0_10px_gray]"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      </button>
    );
  } else if (action === ButtonAction.discard) {
    return (
      <button
        className={`flex select-none justify-center  rounded-md border px-4 py-1 text-sm font-medium shadow-[0_1px_5px_gray] duration-300  ${className} ${
          isDisabled
            ? "cursor-not-allowed border-transparent bg-transparent opacity-70"
            : " border-red-500 bg-red-500/70 opacity-100 hover:bg-red-600 active:shadow-[0_0_10px_gray]"
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
