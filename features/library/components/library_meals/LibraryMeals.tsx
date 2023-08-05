import {
  SavedMealCard,
  getSavedMeals,
  selectLibrarySlice,
  setIsSearching,
  setLibraryMeals,
} from "@/features/library";
import { DietMeal, DietMealGroupArr } from "@/features/plans";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const LibraryMeals: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const { libraryMeals, isSearching } = useSelector(selectLibrarySlice);
  const isSearchingFavoriteMeals = isSearching.meals;
  const noData = Object.keys(libraryMeals).length < 1;

  const fetchLibraryMeals = async () => {
    if (!user) return;
    const res = await getSavedMeals({ userID: user.id });
    if (res.result === "success") {
      dispatch(setLibraryMeals(res.data));
    } else {
      dispatch(setLibraryMeals({}));
    }
    dispatch(setIsSearching({ target: "meals", value: false }));
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
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-full max-w-[95vw] flex-col gap-2 p-2 ">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
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
