import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { useDispatch } from "react-redux";

const SubscribeButton = () => {
  const dispatch = useDispatch();

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsBillingModalOpen(true));
  };

  return (
    <button
      className="text-base font-medium text-green-500/70 duration-100 hover:text-green-500"
      onClick={handleOpenModal}
    >
      <span>Upgrade</span>
    </button>
  );
};

export default SubscribeButton;
