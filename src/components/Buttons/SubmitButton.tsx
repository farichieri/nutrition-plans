import { MouseEventHandler, ReactNode } from "react";
import Spinner from "../Loader/Spinner";

const SubmitButton = ({
  className,
  content,
  icon,
  isDisabled,
  isLoading,
  loadMessage,
  onClick,
  onSubmit,
  type,
  ...props
}: {
  className: string;
  content: string;
  icon?: ReactNode;
  isDisabled: boolean;
  isLoading: boolean;
  loadMessage: string;
  onClick?: MouseEventHandler;
  onSubmit?: React.FormEventHandler;
  type?: "button" | "submit" | "reset" | undefined;
  [x: string]: any;
}) => {
  return (
    <button
      {...props}
      className={`flex min-w-[4rem] select-none items-center justify-center rounded-md border px-4 duration-100  ${className} ${
        isDisabled
          ? "cursor-not-allowed border bg-transparent opacity-70"
          : "border border-green-500 bg-green-500 opacity-100 hover:bg-green-600 active:shadow-[0_0_10px_gray]"
      }`}
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Spinner customClass="h-5 w-5" />
      ) : (
        <div className="flex w-full items-center justify-center">
          {icon && icon}
          <span>{content}</span>
        </div>
      )}
    </button>
  );
};

export default SubmitButton;
