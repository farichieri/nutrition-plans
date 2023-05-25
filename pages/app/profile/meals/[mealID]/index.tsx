import {
  selectMealsSlice,
  setDeleteMealSetting,
} from "@/store/slices/mealsSlice";
import { ButtonType } from "@/types/types";
import { deleteMealSetting } from "@/firebase/helpers/Meals";
import { GetServerSideProps } from "next";
import { MealMinutes, MealSizes } from "@/types/mealsSettingsTypes";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import ActionButton from "@/components/Buttons/ActionButton";
import BackButton from "@/components/Back/BackButton";
import PremiumLayout from "@/components/Layout/PremiumLayout";
import SubPremiumNav from "@/components/Layout/SubPremiumNav";

interface Props {
  mealID: string;
}
export default function Page({ mealID }: Props) {
  const { mealsSettings } = useSelector(selectMealsSlice);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const meal = mealsSettings[mealID];

  const router = useRouter();

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsDeleting(true);
    const res = await deleteMealSetting(user, meal);
    if (!res.error && res.res === "success") {
      router.push("/app/profile/meals").then(() => {
        dispatch(setDeleteMealSetting(meal));
      });
    }
    setIsDeleting(false);
  };

  return (
    <PremiumLayout>
      <section className="flex w-full select-none flex-col gap-[var(--nav-h)]">
        <SubPremiumNav>
          <BackButton />
          {meal && (
            <span className="font-semibold capitalize text-green-500 sm:text-xl">
              {meal.name}
            </span>
          )}
        </SubPremiumNav>
        <div className="flex flex-col items-start justify-start gap-5 bg-white px-4 pb-4 pt-4 shadow-[0_1px_5px_lightgray] dark:bg-black dark:shadow-[0_1px_6px_#292929] sm:m-[0.5vw] sm:min-h-[calc(100vh_-_6rem_-_1vw)] sm:gap-5 sm:rounded-lg sm:border sm:px-10 sm:py-10">
          <div className="flex w-full max-w-sm items-center justify-between gap-1">
            <span>Meal Name:</span>
            <span className="font-semibold capitalize text-green-500 sm:text-xl">
              {meal.name}
            </span>
          </div>
          <div className="flex w-full max-w-sm items-center justify-between gap-1">
            <span>Meal Size:</span>
            <span className="font-semibold capitalize text-green-500 sm:text-xl">
              {MealSizes[meal.size].replaceAll("_", " ")}
            </span>
          </div>
          <div className="flex w-full max-w-sm items-center justify-between gap-1">
            <span>Available Time:</span>
            <span className="font-semibold capitalize text-green-500 sm:text-xl">
              {MealMinutes[meal.time].replaceAll("_", " ")}
            </span>
          </div>
          <div className="flex w-full max-w-sm items-center justify-between gap-1">
            <span>Meal Cook:</span>
            <span className="font-semibold capitalize text-green-500 sm:text-xl">
              {meal.cook ? "Yes" : "No"}
            </span>
          </div>
          <ActionButton
            loadMessage="Deleting..."
            content="Delete Meal Setting"
            isLoading={isDeleting}
            isDisabled={false}
            type={ButtonType.delete}
            className="mt-auto w-44"
            onClick={handleDelete}
            action="submit"
          />
        </div>
      </section>
    </PremiumLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { mealID } = context?.query;

  return { props: { mealID } };
};
