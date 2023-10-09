import { selectAuthSlice } from "@/features/authentication";
import { SubscriptionPlan } from "@/types";
import { useSelector } from "react-redux";
import Link from "next/link";

interface Props {
  price: SubscriptionPlan;
}

const IsCurrentPlan: React.FC<Props> = ({ price }) => {
  const { user } = useSelector(selectAuthSlice);

  const currentPlan =
    (price.id === "free" && user?.isPremium === false) ||
    (price.id === "premium" && user?.isPremium === true);

  const getStarted =
    (price.id === "free" && !user?.isPremium) ||
    (price.id === "premium" && !user?.isPremium);

  return (
    <>
      {user && currentPlan ? (
        <span className="mt-auto flex h-8  items-center rounded-md border border-gray-400 px-3 py-2 text-xs dark:border-gray-700">
          Current plan
        </span>
      ) : (
        <>
          {getStarted && (
            <Link
              href={price.checkoutLink}
              className="mt-auto flex h-8 items-center rounded-3xl  border border-green-500 bg-gradient-to-r from-green-500 via-green-500 to-green-500 px-3 py-2 text-xs text-white duration-300 hover:shadow-[0_1px_10px] hover:shadow-green-300 hover:brightness-110 dark:hover:shadow-green-400/50"
            >
              {price.buttonContent}
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default IsCurrentPlan;
