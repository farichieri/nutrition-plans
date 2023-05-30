import { ReactNode } from "react";
import RoundButton from "../Buttons/RoundButton";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: Function;
}) => {
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="min-w-screen max-w-screen fixed inset-0 z-[100] m-0 flex min-h-screen items-center justify-center overflow-auto">
      <div
        className="min-w-screen fixed inset-0 z-[90] m-0 flex min-h-screen items-center justify-center bg-black/60 dark:bg-black/40"
        onClick={handleCloseModal}
      ></div>
      <div className="relative z-[100] m-auto max-w-[100vw] overflow-hidden rounded-3xl border bg-white dark:bg-black ">
        <RoundButton
          onClick={handleCloseModal}
          customClass=" p-1.5 h-10 w-10 absolute right-2 top-2"
        >
          <span className="material-icons-outlined">close</span>{" "}
        </RoundButton>
        {children}
      </div>
    </div>
  );
};

export default Modal;
