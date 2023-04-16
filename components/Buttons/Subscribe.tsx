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
      className="bold:border-green-800 group flex h-full w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1 text-xs font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50 xs:text-base"
      onClick={handleOpenModal}
    >
      <StarIcon className="h-4 w-4 fill-yellow-400" />
      <span>Upgrade</span>
    </button>
  );
};

export default SubscribeButton;
