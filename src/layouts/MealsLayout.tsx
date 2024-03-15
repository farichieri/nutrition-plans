import {
  UserMealsSettings,
  selectMealsSlice,
  UserMealsC,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import ProfileLayout from "./ProfileLayout";
import Spinner from "@/components/Loader/Spinner";
import dynamic from "next/dynamic";

interface Props {
  children: React.ReactNode;
}

function MealsLayout({ children }: Props) {
  const { user } = useSelector(selectAuthSlice);
  const { meals, mealsSettings, isLoadingMealsSettings } =
    useSelector(selectMealsSlice);

  if (!user) return <></>;

  return (
    <ProfileLayout>
      <div
        id="profile_meals-0"
        className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 lg:gap-10"
      >
        <UserMealsC meals={meals} />
        {isLoadingMealsSettings ? (
          <Spinner customClass="h-5 w-5" />
        ) : (
          <UserMealsSettings mealsSettings={mealsSettings} />
        )}
      </div>
      {children}
    </ProfileLayout>
  );
}

export default dynamic(() => Promise.resolve(MealsLayout), { ssr: false });
