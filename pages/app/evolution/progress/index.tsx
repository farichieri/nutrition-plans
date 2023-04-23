import { selectAuthSlice } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import AddProgress from "@/components/Premium/Progress/AddProgress";
import Graphic from "@/components/Premium/Progress/Graphic/Graphic";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import ProgressList from "@/components/Premium/Progress/ProgressList";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);

  return (
    <PremiumLayout>
      <section className="flex flex-col items-center gap-2 px-4 py-10">
        <h1 className="mb-5 text-3xl font-bold">Progress</h1>
        <Graphic />
        <ProgressList />
        <AddProgress />
      </section>
    </PremiumLayout>
  );
}
