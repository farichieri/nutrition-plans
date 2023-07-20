import {
  selectLayoutSlice,
  setIsBillingModalOpen,
} from "@/features/layout/slice";
import { useDispatch, useSelector } from "react-redux";

const SubscribeButton = () => {
  const { isBillingModalOpen } = useSelector(selectLayoutSlice);
  const dispatch = useDispatch();

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsBillingModalOpen(true));
  };

  return (
    <>
      <button
        className={`rounded-3xl border px-2 py-1 text-base font-medium text-green-500/70 duration-300 hover:border-green-500 hover:text-green-500 ${
          isBillingModalOpen ? "border-green-500" : "border-transparent"
        }`}
        onClick={handleOpenModal}
      >
        <span>Upgrade</span>
      </button>
    </>
  );
};

export default SubscribeButton;
