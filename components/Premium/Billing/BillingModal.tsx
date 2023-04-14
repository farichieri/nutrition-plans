import { FC } from "react";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";
import PricingPlans from "@/components/Pricing/PricingPlans";

interface Props {}

const BillingModal: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();

  return (
    <Modal onClose={() => dispatch(setIsBillingModalOpen(false))}>
      <section className="absolute flex h-full w-full flex-col items-center gap-10 bg-gray-500 px-4 py-14">
        <div className="flex flex-col items-center text-center text-xs md:text-base">
          <span className="text-xl font-semibold">Subscription Plans</span>
          <span>
            You are currently on the{" "}
            <span className="capitalize">{user?.premium_plan}</span> plan.
          </span>
          <span>
            {user?.premium_plan === "free" &&
              "Upgrade to get access to weekly nutrition plans."}
          </span>
        </div>
        <PricingPlans />
      </section>
    </Modal>
  );
};

export default BillingModal;
