import {
  DayPlan,
  DaySelector,
  selectPlansSlice,
  updateDietNutrition,
  useRedirectToday,
  WeekPlan,
} from "@/features/plans";
import { getIsWeek } from "@/utils/dateFormat";
import { getRealDate } from "@/features/plans/utils/dates";
import { GetServerSideProps } from "next";
import { selectAuthSlice } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

interface Props {
  date?: string;
}
export default function Page({ params }: { params: Props }) {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const { user } = useSelector(selectAuthSlice);
  const date = getRealDate({
    date: String(params.date),
    userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
  });
  const diet = diets[date];
  useRedirectToday(String(params.date));

  useEffect(() => {
    if (diet) {
      const { id } = diet;
      if (id) {
        dispatch(updateDietNutrition({ dietID: id }));
      }
    }
  }, [dispatch, diet?.meals]);

  return (
    <PremiumLayout>
      <section className="mt-[calc(1_*_var(--nav-h))] flex w-full select-none flex-col sm:mt-[var(--nav-h)]">
        {date && (
          <>
            <PremiumNav hideScrolling={false} title="" />
            <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
              <DaySelector date={String(params.date)} baseURL={"/app/"} />
            </SubPremiumNav>
            <div className="p-2 sm:p-4 lg:p-5">
              {getIsWeek(date) ? (
                <WeekPlan dateInterval={date} />
              ) : (
                <DayPlan date={date} />
              )}
            </div>
          </>
        )}
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let params: Props = {};

  if (context.params) {
    Object.entries(context?.params).forEach((param) => {
      if (params) {
        params[param[0] as keyof Props] = String(param[1]);
      }
    });
  }
  return { props: { params } };
};
