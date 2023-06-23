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
          <div>
            <SubPremiumNav title={""} customClass="top-[var(--subnav-h)]">
              <DaySelector date={String(params.date)} />
            </SubPremiumNav>
            <div className="flex min-h-[100vh] flex-col items-start justify-start bg-white p-2 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:p-4 lg:p-8 ">
              {getIsWeek(date) ? (
                <WeekPlan dateInterval={date} />
              ) : (
                <DayPlan date={date} />
              )}
            </div>
          </div>
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
