import {
  selectFavoritesSlice,
  setFavoriteFoods,
  setIsSearchingFavoriteFoods,
} from "@/features/favorites";
import { FC, useEffect } from "react";
import { Food, FoodGroupArray, fetchFoodsByIDS } from "@/features/foods";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "@/features/foods/components/search-food/FoodsSearched/FoodCard";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const FavoriteFoods: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const foodsRating = user?.ratings.foodsRating;
  const favorites = foodsRating?.favorites;
  const { favoriteFoods, isSearchingFavoriteFoods } =
    useSelector(selectFavoritesSlice);
  const noData = Object.keys(favoriteFoods).length < 1;

  const getFavoriteFoods = async () => {
    if (!favorites) return;
    const res = await fetchFoodsByIDS(favorites);
    if (res.result === "success") {
      dispatch(setFavoriteFoods(res.data));
    } else {
      dispatch(setFavoriteFoods({}));
    }
    dispatch(setIsSearchingFavoriteFoods(false));
  };

  const sortFavorites = (foods: FoodGroupArray) => {
    return foods.sort((a: Food, b: Food) => {
      return a.name!.localeCompare(b.name!);
    });
  };

  useEffect(() => {
    getFavoriteFoods();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-full select-none grid-cols-fluid_lg flex-col items-start justify-center gap-2 px-0 sm:grid sm:grid-cols-fluid sm:px-0 lg:justify-start">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortFavorites(Object.values(favoriteFoods)).map((food) => (
          <FoodCard food={food} key={food.id} />
        ))
      )}
    </div>
  );
};

export default FavoriteFoods;
