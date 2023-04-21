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
};

export default SubmitButton;
