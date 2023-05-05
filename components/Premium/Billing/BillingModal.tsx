import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FC, useState } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";

interface Props {}

const BillingModal: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  const OPTIONS = [
    {
      discount: null,
      monthlyPrice: 20,
      title: "1 month",
      totalPrice: 10,
      id: "standard-month",
      popular: false,
    },
    {
      discount: "20%",
      monthlyPrice: 16,
      title: "12 months",
      totalPrice: 192,
      id: "standard-year",
      popular: true,
    },
  ];

  const [planSelected, setPlanSelected] = useState("standard-year");

  return (
    <Modal onClose={() => dispatch(setIsBillingModalOpen(false))}>
      <section className="flex h-auto max-h-70vh w-auto min-w-full max-w-[95vw] overflow-hidden">
        <div className="m-auto flex h-full w-full flex-col items-center gap-10 overflow-auto px-4 py-10 sm:p-10">
          <div className="flex flex-col items-center text-center text-xs md:text-base">
            <span className="text-xl font-semibold sm:text-3xl">
              Level up. Go Premium
            </span>
            <span>
              {user?.premium_plan === "free" &&
                "Upgrade to get access to all weekly nutrition plans."}
            </span>
          </div>
          <div className="m-auto flex w-full min-w-fit max-w-md flex-wrap items-center justify-center gap-3 sm:gap-4">
            {OPTIONS.map((opt) => {
              const isSelected = planSelected === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`flex w-full max-w-xs cursor-pointer select-none flex-col items-center rounded-3xl border dark:border-gray-700 `}
                  onClick={() => setPlanSelected(opt.id)}
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
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xl font-semibold">{opt.title}</span>
                      <div>
                        <span className="text-md">${opt.monthlyPrice}</span>
                        <span>/mo</span>
                        {opt.discount && (
                          <span
                            className={`text-sm ${
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
          </div>
          <button className="bold:border-green-800 group mt-auto flex w-fit items-center justify-center gap-1 rounded-3xl bg-gradient-to-r from-green-700 via-green-500 to-green-400 px-3 py-1 font-semibold text-white duration-300 hover:shadow-[0_1px_40px] hover:shadow-green-300 dark:hover:shadow-green-400/50">
            <span>Continue</span>
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default BillingModal;
