import { ButtonType } from "@/types";
import { MouseEventHandler } from "react";
import Spinner from "../Loader/Spinner";

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
  if (type === ButtonType.Save) {
    return (
      <button
        type={action}
        className={`flex select-none justify-center rounded-md  border px-4 py-2 text-sm font-medium duration-300  ${className} ${
          isDisabled
            ? "cursor-not-allowed border bg-transparent opacity-70"
            : " border-green-500 bg-green-500/70 opacity-100 hover:bg-green-600 active:shadow-[0_0_10px_gray]"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      </button>
    );
  } else if (type === ButtonType.Delete) {
    return (
      <button
        type={action}
        className={`flex select-none justify-center rounded-md border px-4 py-2 text-sm font-medium duration-300 ${className} ${
          isDisabled
            ? "cursor-not-allowed border-transparent bg-transparent opacity-70"
            : "border-red-500 text-red-500"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {isLoading ? (
          <div className="flex w-full items-center justify-between gap-2">
            <span>{loadMessage}</span>
            <Spinner customClass="h-5 w-5" />
          </div>
        ) : (
          <span className="w-full">{content}</span>
        )}
      </button>
    );
  } else if (type === ButtonType.Discard) {
    return (
      <button
        type={action}
        className={`flex select-none justify-center rounded-md border px-4 py-2 text-sm font-medium duration-300  ${className} ${
          isDisabled
            ? "cursor-not-allowed bg-transparent opacity-70"
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
