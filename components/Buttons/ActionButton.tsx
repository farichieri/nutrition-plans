import { ButtonType } from "@/types/types";
import { MouseEventHandler } from "react";

const ActionButton = ({
  action,
  className,
  content,
  isDisabled,
  isLoading,
  loadMessage,
  onClick,
  type,
}: {
  action: "button" | "submit" | "reset" | undefined;
  className: string;
  content: string;
  isDisabled: boolean;
  isLoading: boolean;
  loadMessage: string;
  onClick: MouseEventHandler;
  type: ButtonType;
}) => {
  if (type === ButtonType.save) {
    return (
      <button
        type={action}
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
  } else if (type === ButtonType.delete) {
    return (
      <button
        type={action}
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
  } else if (type === ButtonType.discard) {
    return (
      <button
        type={action}
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
