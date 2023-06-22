import { FC, useState } from "react";
import { setBeforeInstallState } from "@/store/slices/layoutSlice";
import { useDispatch } from "react-redux";
import InstallButton from "./InstallButton";
import Modal from "../Modal/Modal";
import useBeforeInstallPrompt from "@/hooks/useBeforeInstallPrompt";

interface Props {}

const InstallModal: FC<Props> = () => {
  const dispatch = useDispatch();
  const deferredPrompt = useBeforeInstallPrompt();
  const [openModal, setCloseModal] = useState(true);

  if (!deferredPrompt || !openModal) return <></>;

  const handleCancel = () => {
    dispatch(setBeforeInstallState(false));
    setCloseModal(false);
  };

  return (
    <Modal onClose={() => setCloseModal(false)}>
      <div className="flex w-[90vw] flex-col items-center justify-center gap-2 px-4 py-10">
        <span className="font-semibold">App available for download!</span>
        <div className="flex items-center gap-5">
          <button
            onClick={handleCancel}
            className="rounded-3xl border border-red-500 bg-red-500 px-3 py-1.5 text-white"
          >
            Discard
          </button>
          <InstallButton deferredPrompt={deferredPrompt} />
        </div>
      </div>
    </Modal>
  );
};

export default InstallModal;