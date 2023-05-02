import { FC } from "react";
import Spinner from "../Loader/Spinner";

interface Props {
  handleSubmit: React.FormEventHandler;
  type: string;
  action: "button" | "submit" | "reset" | undefined;
  text: string;
  isLoading: boolean;
}

const FormAction: FC<Props> = ({
  handleSubmit,
  type = "Submit",
  action = "submit",
  text,
  isLoading = false,
}) => {
  return (
    <>
      {type === "Submit" ? (
        <button
          type={action}
          className="group relative mt-10 flex h-10 w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onSubmit={handleSubmit}
        >
          {isLoading ? <Spinner customClass="h-6 w-6" /> : <span>{text}</span>}
        </button>
      ) : type === "Cancel" ? (
        <button
          type={action}
          className="group relative mt-10 flex h-10 w-full items-center justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormAction;
