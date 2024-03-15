import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RememberGoal from "@/components/Goals/RememberGoal";
import { selectAuthSlice } from "@/features/authentication";
import {
  DayPlan,
  DaySelector,
  MultipleDaysPlan,
  useRedirectToday,
} from "@/features/plans";
import { selectPlansSlice, updateDietNutrition } from "@/features/plans/slice";
import { getRealDate } from "@/features/plans/utils/dates";
import { useWindowWidth } from "@/hooks";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";
import Sidebar from "@/layouts/components/Sidebar/PremiumSidebar";
import { StartsOfWeek } from "@/types";
import { getIsWeek } from "@/utils/dateFormat";

export default function Page() {
  const dispatch = useDispatch();
  const { diets } = useSelector(selectPlansSlice);
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const date = router.query.date;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, diet?.meals]);

  return (
    <>
      <PremiumLayout>
        <section className="mt-[calc(1_*_var(--nav-h))] flex w-full select-none flex-col pb-2 sm:mt-[var(--nav-h)]">
          {realDate && (
            <>
              <PremiumNav hideScrolling={true} title="">
                <RememberGoal />
              </PremiumNav>
              <Sidebar hideScrolling={isMobile} />
              <SubPremiumNav
                title={""}
                hideScrolling={true}
                customClass="top-[var(--subnav-h)]"
              >
                <DaySelector date={String(date)} baseURL={"/app/"} />
              </SubPremiumNav>
              <div className="px-2 sm:px-4 lg:px-5">
                {getIsWeek(realDate) ? (
                  <MultipleDaysPlan dateInterval={realDate} />
                ) : (
                  <>
                    <DayPlan date={realDate} />
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </PremiumLayout>
    </>
  );
}
