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
      className="bold:border-green-800 group flex h-full w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-5 py-1.5 text-xs font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50 xs:text-base"
      onClick={handleOpenModal}
    >
      <span className="material-icons md-18 text-yellow-400">star</span>
      <span>Upgrade</span>
    </button>
  );
};

export default SubscribeButton;
