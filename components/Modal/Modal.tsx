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
    <div className="min-w-screen max-w-screen fixed inset-0 z-[100] m-0 flex min-h-screen items-center justify-center overflow-auto  backdrop-blur-sm">
      <div
        className="min-w-screen fixed inset-0 z-50 m-0 flex min-h-screen items-center justify-center bg-[var(--bg-modal)] bg-blue-500"
        onClick={handleCloseModal}
      ></div>
      <div className="z-50 m-auto h-full w-full max-w-6xl bg-red-500 py-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;
