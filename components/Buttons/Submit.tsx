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
      className={`flex justify-center rounded-3xl bg-green-500 px-4 py-1 text-white shadow-inner ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
    </button>
  );
};

export default Submit;
