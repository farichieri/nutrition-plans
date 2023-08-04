import {
  MealCard,
  getSavedMeals,
  selectFavoritesSlice,
  setFavoriteMeals,
  setIsSearchingFavoriteMeals,
} from "@/features/favorites";
import { DietMeal, DietMealGroupArr } from "@/features/plans";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const FavoriteMeals: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const { favoriteMeals, isSearchingFavoriteMeals } =
    useSelector(selectFavoritesSlice);
  const noData = Object.keys(favoriteMeals).length < 1;

  const fetchFavoriteMeals = async () => {
    if (!user) return;
    const res = await getSavedMeals({ userID: user.id });
    if (res.result === "success") {
      dispatch(setFavoriteMeals(res.data));
    } else {
      dispatch(setFavoriteMeals({}));
    }
    dispatch(setIsSearchingFavoriteMeals(false));
  };

  const sortDays = (foods: DietMealGroupArr) => {
    return foods.sort((a: DietMeal, b: DietMeal) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchFavoriteMeals();
  }, []);

  if (noData && isSearchingFavoriteMeals) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-full max-w-[95vw] flex-col gap-2 p-2 ">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortDays(Object.values(favoriteMeals)).map((meal) => (
          <MealCard
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

export default FavoriteMeals;
