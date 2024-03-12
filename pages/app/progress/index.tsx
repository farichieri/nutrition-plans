import RememberGoal from "@/components/Goals/RememberGoal";
import WeightSelector from "@/components/WeightSelector/WeightSelector";
import {
  AddProgress,
  DaysLeft,
  Graphic,
  ProgressList,
} from "@/features/progress";
import { PremiumSidebar } from "@/layouts";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "@/layouts/components/Nav/PremiumNav";
import { WeightUnitsT } from "@/types";
import dynamic from "next/dynamic";
import { useState } from "react";

function Page() {
  const isMobile = window.innerWidth < 1024;
  const [weightSelected, setWeightSelected] = useState<WeightUnitsT>("kgs");

  const handleChangeUnit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const unit = event.currentTarget.value as WeightUnitsT;
    setWeightSelected(unit);
  };

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
