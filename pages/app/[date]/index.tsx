import {
  DayPlan,
  DaySelector,
  useRedirectToday,
  MultipleDaysPlan,
} from "@/features/plans";
import { getIsWeek } from "@/utils/dateFormat";
import { getRealDate } from "@/features/plans/utils/dates";
import { GetServerSideProps } from "next";
import { selectAuthSlice } from "@/features/authentication";
import { selectPlansSlice, updateDietNutrition } from "@/features/plans/slice";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useRef } from "react";
import { useTour } from "@/features/tours";
import { useWindowWidth } from "@/hooks";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import RememberGoal from "@/components/Goals/RememberGoal";
import Sidebar from "@/layouts/components/Sidebar/PremiumSidebar";
import SubPremiumNav from "@/layouts/components/Nav/SubPremiumNav";

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

  useTour({
    name: "welcome",
    user: user,
    steps: () => [
      {
        element: document.querySelector("#tour-welcome-0"),
        title: "Planner Section",
        intro: "Let's have a quick tour in the Planner section!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-welcome-1"),
        title: "Generate Day Plan!",
        intro:
          "Here you can generate your meal plan for the day: Manually, Automatically, or Load a Saved One.",
        position: "right",
      },
      {
        element: document.querySelector("#tour-welcome-2"),
        title: "Change View Layout",
        intro:
          "Here you can select between Day, Week or a Range of Days. You can also change the start of the week in your settings.",
        position: "right",
      },
      {
        element: document.querySelector("#tour-welcome-3"),
        title: "Change Day(s) you see",
        intro: "Here you can go back and forward in time",
        position: "left",
      },
      {
        title: "Generate your first Plan!",
        intro: "Click on manually once the tour is finished!",
        position: "right",
      },
    ],
  });

  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 h-screen w-screen bg-red-500">
          Loading....
        </div>
      }
    >
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
                  <DayPlan date={realDate} />
                )}
              </div>
            </>
          )}
        </section>
      </PremiumLayout>
    </Suspense>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const date = context?.params?.date;
  return { props: { date } };
};
