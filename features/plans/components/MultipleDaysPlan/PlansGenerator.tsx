import Modal from "@/components/Modal/Modal";
import { FC, useState } from "react";

interface Props {}

const PlansGenerator: FC<Props> = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-2">
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className="w-fit rounded-3xl border px-4 py-1.5"
      >
        Generate All Unplanned Days
      </button>
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="flex flex-col gap-2 p-10">...</div>
        </Modal>
      )}
    </div>
  );
};

export default PlansGenerator;
