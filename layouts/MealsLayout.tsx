import {
  UserMealsSettings,
  selectMealsSlice,
  UserMealsC,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import Spinner from "@/components/Loader/Spinner";

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
        <span className="mx-auto text-2xl font-semibold">Meals Settings</span>
        <UserMealsC meals={meals} />
        {isLoadingMealsSettings ? (
          <Spinner customClass="h-5 w-5" />
        ) : (
          <UserMealsSettings mealsSettings={mealsSettings} />
        )}
        {children}
      </section>
    </PremiumLayout>
  );
}
