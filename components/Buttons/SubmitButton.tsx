import { MouseEventHandler } from "react";
import Spinner from "../Loader/Spinner";

const SubmitButton = ({
  content,
  isLoading,
  isDisabled,
  loadMessage,
  onClick,
  className,
}: {
  onClick: MouseEventHandler;
  content: string;
  isLoading: boolean;
  isDisabled: boolean;
  loadMessage: string;
  className: string;
}) => {
  return (
    <button
      className={`flex h-8 min-w-[6rem] select-none items-center justify-center rounded-md border px-4 text-sm font-medium duration-100  ${className} ${
        isDisabled
          ? "cursor-not-allowed border bg-transparent opacity-70"
          : "border border-green-500 bg-green-500/70 opacity-100 hover:bg-green-600 active:scale-95 active:shadow-[0_0_10px_gray]"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Spinner customClass="h-5 w-5" /> : <span>{content}</span>}
    </button>
  );
};

export default SubmitButton;
