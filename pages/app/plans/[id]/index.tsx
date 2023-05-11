import BackButton from "@/components/Back/BackButton";
import SubscribeButton from "@/components/Buttons/Subscribe";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import { updateUserPlan } from "@/firebase/helpers/Plans";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { setIsBillingModalOpen } from "@/store/slices/layoutSlice";
import { PlanType } from "@/types/types";
import {
  directories,
  getAllMDData,
  getAllMDIDS,
  getSortedData,
} from "@/utils/mds";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  planData: PlanType;
}

export default function Page({ planData }: Props) {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const selectPlan = async () => {
    if (!user) return;
    const res = await updateUserPlan(planData, user);
    if (!res?.error) {
      const userUpdated = {
        ...user,
        plan_selected: planData.id,
      };
      dispatch(setUpdateUser(userUpdated));
    }
  };

  // useEffect(() => {
  //   if (user?.premium_plan === "free") {
  //     dispatch(setIsBillingModalOpen(true));
  //   }
  // }, [planData]);

  const isFree = user?.premium_plan === "free";

  return (
    <PremiumLayout>
      <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
        <div className="flex max-w-lg flex-col gap-10">
          <div className="fixed left-auto top-[var(--nav-h)] z-[60] flex h-[var(--subnav-h)] w-screen items-center gap-10 border-b bg-white/80 px-4 backdrop-blur-lg dark:bg-black/80">
            <span className="text-lg font-semibold sm:text-3xl">
              {planData.title}
            </span>
            <div className="w-fit min-w-fit">
              {!(user?.plan_selected === planData.id) ? (
                <button
                  className="min-w-fit rounded-3xl border px-2 py-1"
                  onClick={selectPlan}
                >
                  Select plan
                </button>
              ) : (
                <span className="min-w-fit">Plan selected</span>
              )}
            </div>
          </div>
        </div>
        {/* {isFree && (
          // <div className="fixed inset-0 z-[60] h-screen w-screen bg-black/10">
          <div className="h-50vh fixed left-[50%] top-[50%] z-[60] flex w-96 max-w-[95vw] -translate-x-1/2 flex-col items-center justify-center gap-4 rounded-3xl bg-white p-4 shadow-md dark:bg-gray-800">
            <span className="text-center">
              Become premium to access to this plan
            </span>
            <SubscribeButton />
          </div>
          // </div>
        )} */}
        {/* <div className={`${isFree && "z-50 cursor-auto select-none blur-sm"}`}> */}

        <div className="flex max-w-5xl flex-wrap items-start justify-center gap-10 rounded-lg bg-white p-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[1vw] sm:px-10">
          <div
            className={`${
              isFree &&
              "z-50 flex h-full w-full max-w-5xl cursor-auto select-none flex-col gap-5"
            } max-w-5xl`}
          >
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Breakfast</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Lunch</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Dinner</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
            <div className="min-h-20 flex w-full flex-col gap-2 rounded-md border p-4">
              <span>Snack</span>
              <div className="h-20 w-full rounded-md border">.</div>
              <div className="h-20 w-full rounded-md border">.</div>
            </div>
          </div>
        </div>
      </section>
    </PremiumLayout>
  );
}

export const getStaticPaths = async () => {
  const paths = getAllMDIDS(directories.plansDirectory);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const planData = await getAllMDData(directories.plansDirectory, params.id);
  const allPlansData = getSortedData(directories.plansDirectory);
  const restOfPlans = allPlansData.filter((plan) => plan.id !== params.id);

  return {
    props: {
      planData,
      restOfPlans,
    },
  };
};
