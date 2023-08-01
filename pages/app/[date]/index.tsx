import {
  DayPlan,
  DaySelector,
  useRedirectToday,
  WeekPlan,
} from "@/features/plans";
import { getIsWeek } from "@/utils/dateFormat";
import { getRealDate } from "@/features/plans/utils/dates";
import { GetServerSideProps } from "next";
import { selectAuthSlice } from "@/features/authentication";
import { selectPlansSlice, updateDietNutrition } from "@/features/plans/slice";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import Sidebar from "@/layouts/components/Sidebar/PremiumSidebar";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import { useWindowWidth } from "@/hooks";

interface Props {
  date: string;
}
export default function Page({ date }: { date: Props }) {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const { user } = useSelector(selectAuthSlice);
  const realDate = getRealDate({
    date: String(date),
    userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
  });
  const diet = diets[realDate];
  useRedirectToday(String(date));
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;

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
        {realDate && (
          <>
            <PremiumNav hideScrolling={false} title="" />
            <Sidebar />
            <SubPremiumNav
              title={""}
              hideScrolling={isMobile}
              customClass="top-[var(--subnav-h)]"
            >
              <DaySelector date={String(date)} baseURL={"/app/"} />
            </SubPremiumNav>
            <div className="px-2 sm:px-4 lg:px-5">
              {getIsWeek(realDate) ? (
                <WeekPlan dateInterval={realDate} />
              ) : (
                <DayPlan date={realDate} />
              )}
            </div>
          </>
        )}
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const date = context?.params?.date;
  return { props: { date } };
};
