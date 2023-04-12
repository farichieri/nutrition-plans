import PremiumLayout from "@/components/Layout/PremiumLayout";
import { updateUserPlan } from "@/firebase/helpers/Plans";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { PlanType } from "@/types/types";
import {
  directories,
  getAllMDData,
  getAllMDIDS,
  getSortedData,
} from "@/utils/mds";
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

  console.log({ user });
  console.log(planData.id);
  return (
    <PremiumLayout>
      <section className="flex w-full p-4">
        <span>{planData.title}</span>
        {!(user?.plan_selected === planData.id) ? (
          <button
            className="ml-auto rounded-3xl border px-2 py-1"
            onClick={selectPlan}
          >
            Select plan
          </button>
        ) : (
          <span className="ml-auto">Plan selected</span>
        )}
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
