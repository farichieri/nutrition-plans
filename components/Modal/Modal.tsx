import { XCircleIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: Function;
}) => {
  const handleCloseModal = (e: any) => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="min-w-screen max-w-screen fixed inset-0 z-[100] m-0 flex min-h-screen items-center justify-center overflow-auto">
      <div
        className="min-w-screen fixed inset-0 z-50 m-0 flex min-h-screen items-center justify-center bg-black/60 dark:bg-black/40"
        onClick={handleCloseModal}
      ></div>
      <div className="relative z-50 m-auto max-w-[95vw] rounded-3xl bg-gray-100 dark:bg-gray-800">
        <XCircleIcon
          onClick={handleCloseModal}
          className="absolute right-2 top-2 h-5 w-5 cursor-pointer fill-gray-500"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
