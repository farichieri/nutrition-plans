import {
  selectPlansSlice,
  DaySelector,
  updateDietNutrition,
  DayPlan,
  WeekPlan,
  useRedirectToday,
} from "@/features/plans";
import { getIsWeek } from "@/utils/dateFormat";
import { getRealDate } from "@/features/plans/utils/dates";
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";

interface Props {
  date?: string;
}
export default function Page({ params }: { params: Props }) {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const date = getRealDate(String(params.date));
  const diet = diets[date];
  useRedirectToday(String(params.date));

  useEffect(() => {
    if (diet) {
      const { diet_id } = diet;
      if (diet_id) {
        dispatch(updateDietNutrition({ diet_id }));
      }
    }
  }, [diet?.diet_meals]);

  return (
    <PremiumLayout>
      <section className="mt-[calc(1_*_var(--nav-h))] flex w-full select-none flex-col sm:mt-[var(--nav-h)]">
        {date && (
          <>
            <PremiumNav hideScrolling={false} title="my plan" />
            <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
              <DaySelector date={String(params.date)} />
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
