import { FC } from "react";

interface Props {
  message: string | undefined;
}

const FormError: FC<Props> = ({ message }) => {
  if (!message) return <></>;
  return (
    <div className="mt-2 flex items-center gap-1 text-red-500">
      <span className="material-icons">error_outline</span>
      <span>Error: {message}</span>
    </div>
  );
};
export default FormError;
