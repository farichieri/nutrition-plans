import {
  UserMealsSettings,
  selectMealsSlice,
  UserMealsC,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import Spinner from "@/components/Loader/Spinner";
import SubPremiumNav from "./components/Nav/SubPremiumNav";

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
      <SubPremiumNav
        title="Meals Settings"
        customClass="top-[var(--subnav-h)]"
      />
      <section className="m-auto mt-[var(--subnav-h)] flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 py-10">
          <UserMealsC meals={meals} />
          {isLoadingMealsSettings ? (
            <Spinner customClass="h-5 w-5" />
          ) : (
            <UserMealsSettings mealsSettings={mealsSettings} />
          )}
          {children}
        </div>
      </section>
    </PremiumLayout>
  );
}
