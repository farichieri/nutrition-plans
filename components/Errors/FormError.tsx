import { FC } from "react";

interface Props {
  message: string | undefined;
  customClass?: string;
}

const FormError: FC<Props> = ({ message, customClass }) => {
  if (!message) return <></>;
  return (
    <div className={`mt-2 flex items-start gap-2 text-red-500 ${customClass}`}>
      <span className="material-icons">error_outline</span>
      <span>Error: {message}</span>
    </div>
  );
};
export default FormError;
