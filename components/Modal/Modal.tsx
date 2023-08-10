import { MdClose } from "react-icons/md";
import { ReactNode } from "react";
import RoundButton from "../Buttons/RoundButton";

const Modal = ({
  children,
  onClose,
  customClass = "",
  isMobileFullScreen = false,
}: {
  children: ReactNode;
  onClose: Function;
  customClass?: string;
  isMobileFullScreen?: boolean;
}) => {
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="min-w-screen max-w-screen fixed inset-0 z-[500] m-0 flex items-center justify-center overflow-auto">
      <div
        className="min-w-screen fixed inset-0 z-[90] m-0 flex items-center justify-center bg-black/60 dark:bg-black/40"
        onClick={handleCloseModal}
      ></div>
      <div
        className={
          ` relative z-[100] m-auto max-w-[100vw] overflow-hidden border bg-tertiary-color ${
            isMobileFullScreen ? "rounded-none sm:rounded-xl" : "rounded-xl"
          } ` + customClass
        }
      >
        <RoundButton
          onClick={handleCloseModal}
          customClass="p-1.5 h-10 w-10 absolute right-1 lg:right-5 top-1 z-[100]"
        >
          <MdClose className="h-6 w-6" />
        </RoundButton>
        {children}
      </div>
    </div>
  );
};

export default Modal;
