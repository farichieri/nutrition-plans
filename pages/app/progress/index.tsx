import RememberGoal from "@/components/Goals/RememberGoal";
import WeightSelector from "@/components/WeightSelector/WeightSelector";
import { selectAuthSlice } from "@/features/authentication";
import {
  AddProgress,
  DaysLeft,
  Graphic,
  ProgressList,
} from "@/features/progress";
import { useTour } from "@/features/tours";
import { PremiumSidebar } from "@/layouts";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import { WeightUnitsT } from "@/types";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";

function Page() {
  const isMobile = window.innerWidth < 1024;
  const { user } = useSelector(selectAuthSlice);
  const [weightSelected, setWeightSelected] = useState<WeightUnitsT>("kgs");

  const handleChangeUnit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const unit = event.currentTarget.value as WeightUnitsT;
    setWeightSelected(unit);
  };

  useTour({
    name: "progress",
    user: user,
    steps: () => [
      {
        element: document.querySelector("#tour-progress-0"),
        title: "Progress Section",
        intro:
          "In this section you will see your progress in the goal you have set. Is the second most important section of the app!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-progress-1"),
        title: "List of your Progress",
        intro: "This is the list of your progresses",
        position: "right",
      },
      {
        element: document.querySelector("#tour-progress-2"),
        title: "Add Progress",
        intro:
          "Here you can add a new progress! (adding the exact day and the Weight of that day)",
        position: "right",
      },
      {
        element: document.querySelector("#tour-progress-3"),
        title: "See your Progress graphically",
        intro:
          "You can see your progress graphically here! And if you have a Goal set, you will see the goal line too!",
        position: "right",
      },
      {
        element: document.querySelector("#tour-progress-4"),
        title: "Days left",
        intro: "Here you can see how many days are left to reach your goal!",
        position: "right",
      },
      {
        title: "You can do it!",
        intro:
          "Day to day you will reach your goal! Remember to be constant respecting your nutrient targets and you will see the results in your weight, your energy and in the mirror!",
        position: "right",
      },
    ],
  });

  return (
    <PremiumLayout>
      <PremiumNav hideScrolling={true} title="">
        <RememberGoal />
      </PremiumNav>
      <PremiumSidebar hideScrolling={isMobile} />
      <section className="m-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-5 px-2 pb-2 pt-2 sm:px-5 sm:pt-4">
        <div className="flex w-full flex-wrap justify-center gap-5">
          <Graphic unitSelected={weightSelected} />
          <div>
            <WeightSelector
              onChange={handleChangeUnit}
              unitSelected={weightSelected}
            />
          </div>
          <ProgressList unitSelected={weightSelected} />
        </div>
        <AddProgress />
        <DaysLeft unitSelected={weightSelected} />
      </section>
    </PremiumLayout>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });
