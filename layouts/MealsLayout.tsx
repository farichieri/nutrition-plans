import {
  UserMealsSettings,
  selectMealsSlice,
  UserMealsC,
} from "@/features/meals";
import { selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import ProfileLayout from "./ProfileLayout";
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
    <ProfileLayout>
      <div className="flex w-full flex-col gap-4 lg:gap-10">
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
