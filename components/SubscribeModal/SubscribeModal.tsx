import Spinner from "@/components/Loader/Spinner";
import Modal from "@/components/Modal/Modal";
import { PRICES } from "@/constants";
import { selectAuthSlice } from "@/features/authentication/slice";
import { setIsSubscribeModalOpen } from "@/features/layout/slice";
import { DonateText, createCheckoutSession } from "@/features/stripe";
import { ensureError } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  isCloseable?: boolean;
  isTrialOver?: boolean;
}

const SubscribeModal: FC<Props> = ({
  isCloseable = true,
  isTrialOver = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [priceSelected, setPriceSelected] = useState(PRICES.yearly.id);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return <></>;

  // This should discriminate the pricing plan and redirect with that data.
  const handleContinue = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await createCheckoutSession({
        uid: user.id,
        priceId: priceSelected,
      });
      if (res.result === "error") {
        throw new Error("Error redirecting to stripe.", { cause: res.error });
      }
    } catch (error) {
      const err = ensureError(error);
      console.log(err);
      setIsLoading(false);
      toast.error("Something went wrong.");
    }
  };

  const handleClose = () => {
    dispatch(setIsSubscribeModalOpen(false));
  };

  return (
    <Modal isCloseable={isCloseable} isFullScreen onClose={handleClose}>
      <section className="relative flex h-auto w-auto min-w-full max-w-[95vw] overflow-hidden">
        <div className="m-auto flex h-full w-full flex-col items-center gap-5 overflow-auto px-4 py-10 ">
          <div className="flex flex-col items-center text-center text-xs md:text-base">
            <span className="text-xl font-semibold sm:text-3xl">
              Level up. Go Premium
            </span>
            {isTrialOver ? (
              <span className="opacity-70">
                Your free trial is over, upgrade to get Full Access
              </span>
            ) : (
              <span className="opacity-70">
                Upgrade to get full access to all the features
              </span>
            )}
          </div>
          <div className="m-auto flex w-full min-w-fit max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4">
            {Object.values(PRICES).map((opt) => {
              const isSelected = priceSelected === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`flex w-full max-w-xs cursor-pointer select-none flex-col items-center rounded-3xl border dark:border-gray-700 `}
                  onClick={() => setPriceSelected(opt.id)}
                >
                  <div
                    className={`relative flex h-full w-full items-center justify-center gap-1 rounded-3xl border-2 px-8 py-3 ${
                      isSelected
                        ? "border-green-500 opacity-100"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    {isSelected && opt.popular && (
                      <span className="absolute -top-3 rounded-3xl bg-green-500 px-2 text-sm text-white">
                        Most Popular
                      </span>
                    )}
                    <div className="absolute left-3 flex items-center justify-center ">
                      {isSelected && (
                        <CheckCircleIcon className="h-5 w-5 fill-green-500" />
                      )}
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                      <span className="text-xl font-semibold">{opt.title}</span>
                      <div className="relative flex items-baseline gap-1">
                        <div className="relative flex w-fit">
                          <div className="absolute top-1/2 h-0.5 w-full bg-red-500" />
                          <span className="text-md">${opt.monthlyPrice}</span>
                        </div>
                        <span className="text-base font-semibold text-red-500">
                          {opt.discountPrice}
                        </span>
                        <span>/mo</span>
                        {opt.discount && (
                          <span
                            className={`text-sm font-semibold ${
                              isSelected && "text-red-600"
                            }`}
                          >
                            {" "}
                            Save {opt.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="max-w-xs">
              <DonateText />
            </div>
          </div>
          <button
            className="bold:border-green-800 group mt-auto flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-10 py-1.5 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50"
            onClick={handleContinue}
          >
            <span>Continue</span>
            {isLoading && <Spinner customClass="h-5 w-5" />}
          </button>
          {isCloseable && (
            <button
              className="text-sm duration-300 hover:text-green-500"
              onClick={handleClose}
            >
              NO, THANKS
            </button>
          )}
        </div>
      </section>
    </Modal>
  );
};

export default SubscribeModal;
