import { FC } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

interface Props {
  message: string | undefined;
  customClass?: string;
}

const FormError: FC<Props> = ({ message, customClass }) => {
  if (!message) return <></>;
  return (
    <div className={`mt-2 flex items-start gap-2 text-red-500 ${customClass}`}>
      <MdOutlineErrorOutline className="block h-6 w-6 min-w-fit" />
      <span>Error: {message}</span>
    </div>
  );
};
export default FormError;
