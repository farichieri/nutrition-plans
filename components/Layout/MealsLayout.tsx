import { selectAuthSlice } from "@/store/slices/authSlice";
import { selectMealsSlice } from "@/store/slices/mealsSlice";
import { useSelector } from "react-redux";
import MealsSettings from "@/components/Premium/UserMeals/MealsSettings/MealsSettings";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import Spinner from "@/components/Loader/Spinner";
import UserMeals from "@/components/Premium/UserMeals/UserMeals/UserMeals";

interface Props {
  children: React.ReactNode;
}

export default function MealsLayout({ children }: Props) {
  const { user } = useSelector(selectAuthSlice);
  const { meals, mealsSettings, isLoadingMealsSettings } =
    useSelector(selectMealsSlice);

  if (!user) return <></>;

  return (
    <PremiumLayout>
      <section className="flex flex-col justify-center gap-5 px-4 py-8">
        <span className="mx-auto text-2xl font-semibold">Meal Settings</span>
        <UserMeals meals={meals} />
        {isLoadingMealsSettings ? (
          <Spinner customClass="h-5 w-5" />
        ) : (
          <MealsSettings mealsSettings={mealsSettings} />
        )}
        {children}
      </section>
    </PremiumLayout>
  );
}
