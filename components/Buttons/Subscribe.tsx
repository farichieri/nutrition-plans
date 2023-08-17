import { MdVerified } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import { useState } from "react";
import SubscribeModal from "../SubscribeModal/SubscribeModal";

const SubscribeButton = () => {
  const { user } = useSelector(selectAuthSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <SubscribeModal handleClose={() => setIsModalOpen(false)} />
      )}
      {user?.isPremium ? (
        <span className="flex items-center gap-1 rounded-3xl  p-2 font-semibold text-green-500">
          Premium <MdVerified className="h-5 w-5 text-green-500" />
        </span>
      ) : (
        <button
          className={`rounded-3xl border px-2 py-1 text-base font-medium text-green-500/70 duration-300 hover:border-green-500 hover:text-green-500 ${
            isModalOpen ? "border-green-500" : "border-transparent"
          }`}
          onClick={() => setIsModalOpen(true)}
        >
          <span>Upgrade</span>
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
