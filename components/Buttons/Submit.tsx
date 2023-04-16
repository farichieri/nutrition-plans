import { MouseEventHandler } from "react";

const Submit = ({
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
      className={`flex select-none justify-center rounded-3xl bg-green-600 px-4 py-1 text-white shadow-inner duration-300 hover:bg-green-500 active:shadow-lg ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
    </button>
  );
};

export default Submit;
