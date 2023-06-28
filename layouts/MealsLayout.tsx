import {
  UserMealsSettings,
  selectMealsSlice,
  UserMealsC,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import PremiumLayout from "@/layouts/PremiumLayout";
import PremiumNav from "./components/Nav/PremiumNav";
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
      <PremiumNav hideScrolling={false} title="" />
      <section className="m-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-4 pb-4 pt-4 sm:px-10">
        <div className="flex w-full max-w-7xl flex-wrap justify-center gap-5 ">
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
