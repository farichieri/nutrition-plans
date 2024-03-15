"use client";

import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { setBeforeInstallState } from "@/features/authentication";

import InstallButton from "./InstallButton";

import Modal from "../Modal/Modal";

interface Props {}

const InstallModal: FC<Props> = () => {
  const dispatch = useDispatch();
  const [openModal, setCloseModal] = useState(true);

  if (!openModal) return <></>;

  const handleCancel = () => {
    dispatch(setBeforeInstallState(false));
    setCloseModal(false);
  };

  return (
    <Modal onClose={() => setCloseModal(false)}>
      <div className="flex flex-col items-center justify-center gap-5 px-10 pb-5 pt-10">
        <span className="text-xl font-semibold">
          App available for download!
        </span>
        <div className="flex items-center gap-5">
          <button
            onClick={handleCancel}
            className="rounded-md border border-red-500 bg-red-500/50 px-3 py-1.5 text-white hover:bg-red-500"
          >
            Discard
          </button>
          <InstallButton />
        </div>
      </div>
    </Modal>
  );
};

export default InstallModal;
