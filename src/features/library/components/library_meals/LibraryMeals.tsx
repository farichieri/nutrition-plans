"use client";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "@/components/Loader/Spinner";
import { selectAuthSlice } from "@/features/authentication";
import {
  SavedMealCard,
  getSavedMeals,
  selectLibrarySlice,
  setIsSearching,
  setLibraryMeals,
} from "@/features/library";
import { DietMeal, DietMealGroupArr } from "@/features/plans";

interface Props {}

const LibraryMeals: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { libraryMeals, isSearching } = useSelector(selectLibrarySlice);
  const isSearchingFavoriteMeals = isSearching.meals;
  const noData = Object.keys(libraryMeals).length < 1;

  const fetchLibraryMeals = async () => {
    if (!user) return;

    try {
      dispatch(setIsSearching({ target: "meals", value: true }));
      const res = await getSavedMeals({ userID: user.id });
      if (res.result === "success") {
        dispatch(setLibraryMeals(res.data));
      } else {
        dispatch(setLibraryMeals({}));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsSearching({ target: "meals", value: false }));
    }
  };

  const sortDays = (foods: DietMealGroupArr) => {
    return foods.sort((a: DietMeal, b: DietMeal) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchLibraryMeals();
  }, []);

  if (noData && isSearchingFavoriteMeals) {
    return <Spinner customClass="h-10 w-10 m-auto" />;
  }

  return (
    <div className="flex w-full max-w-[95vw] flex-col gap-2 p-2 ">
      {noData ? (
        <div className="m-auto">No Saved Meals Found.</div>
      ) : (
        sortDays(Object.values(libraryMeals)).map((meal) => (
          <SavedMealCard
            replaceMealID={null}
            key={meal.id}
            meal={meal}
            isReplaceable={false}
            handleClose={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default LibraryMeals;
