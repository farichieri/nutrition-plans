import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";

const SubscribeButton = () => {
  const dispatch = useDispatch();

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(setIsBillingModalOpen(true));
  };

  return (
    <button
      className="flex items-center justify-center gap-1"
      onClick={handleOpenModal}
    >
      <StarIcon className="h-4 w-4 fill-yellow-400" />
      <span>Upgrade</span>
    </button>
  );
};

export default SubscribeButton;
