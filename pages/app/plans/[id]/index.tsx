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
      <section className={`relative flex w-full flex-col p-4`}>
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
        {isFree && (
          <div className="h-50vh z-100 absolute left-[50%] top-[50%] flex -translate-x-1/2 flex-col items-center justify-center bg-white">
            <span>Become Premium to access to this nutrition plan</span>
            <SubscribeButton />
          </div>
        )}
        <div className={`${isFree && "z-50 select-none blur-sm"}`}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Totam consequuntur, dignissimos impedit id earum fuga in. Possimus
            quaerat nulla ut, fugit officia iusto? Animi maxime ducimus at
            repellat vero quasi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Totam consequuntur, dignissimos impedit id earum
            fuga in. Possimus quaerat nulla ut, fugit officia iusto? Animi
            maxime ducimus at repellat vero quasi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Totam consequuntur, dignissimos
            impedit id earum fuga in. Possimus quaerat nulla ut, fugit officia
            iusto? Animi maxime ducimus at repellat vero quasi? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Totam consequuntur,
            dignissimos impedit id earum fuga in. Possimus quaerat nulla ut,
            fugit officia iusto? Animi maxime ducimus at repellat vero quasi?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Totam consequuntur, dignissimos impedit id earum fuga in. Possimus
            quaerat nulla ut, fugit officia iusto? Animi maxime ducimus at
            repellat vero quasi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Totam consequuntur, dignissimos impedit id earum
            fuga in. Possimus quaerat nulla ut, fugit officia iusto? Animi
            maxime ducimus at repellat vero quasi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Totam consequuntur, dignissimos
            impedit id earum fuga in. Possimus quaerat nulla ut, fugit officia
            iusto? Animi maxime ducimus at repellat vero quasi? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Totam consequuntur,
            dignissimos impedit id earum fuga in. Possimus quaerat nulla ut,
            fugit officia iusto? Animi maxime ducimus at repellat vero quasi?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Totam consequuntur, dignissimos impedit id earum fuga in. Possimus
            quaerat nulla ut, fugit officia iusto? Animi maxime ducimus at
            repellat vero quasi? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Totam consequuntur, dignissimos impedit id earum
            fuga in. Possimus quaerat nulla ut, fugit officia iusto? Animi
            maxime ducimus at repellat vero quasi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Totam consequuntur, dignissimos
            impedit id earum fuga in. Possimus quaerat nulla ut, fugit officia
            iusto? Animi maxime ducimus at repellat vero quasi? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Totam consequuntur,
            dignissimos impedit id earum fuga in. Possimus quaerat nulla ut,
            fugit officia iusto? Animi maxime ducimus at repellat vero quasi?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            consequuntur, dignissimos impedit id earum fuga in. Possimus quaerat
            nulla ut, fugit officia iusto? Animi maxime ducimus at repellat vero
            quasi?
          </p>
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
