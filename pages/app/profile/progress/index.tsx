import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import AddProgress from "@/components/Premium/Progress/AddProgress";
import Graphic from "@/components/Premium/Progress/Graphic/Graphic";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import ProgressList from "@/components/Premium/Progress/ProgressList";
import WeightGoal from "@/components/Premium/Progress/WeightGoal/WeightGoal";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);

  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-5 px-4 py-10">
        <Graphic />
        <ProgressList />
        <AddProgress />
        <WeightGoal />
      </section>
    </PremiumLayout>
  );
}
