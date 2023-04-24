import { MouseEventHandler } from "react";

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
      className={`flex select-none justify-center rounded-md px-4 py-1 text-sm font-medium shadow-[0_1px_5px_gray] duration-300  ${className} ${
        isDisabled
          ? "cursor-not-allowed border border-transparent bg-transparent opacity-70"
          : "border border-green-500 bg-green-500/70 opacity-100 hover:bg-green-600 active:shadow-[0_0_10px_gray]"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
    </button>
  );
};

export default SubmitButton;
