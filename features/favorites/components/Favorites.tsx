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

const Favorites: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const food_rating = user?.ratings.food_rating;
  const favorites = food_rating?.favorites;
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
      return a.food_name!.localeCompare(b.food_name!);
    });
  };

  console.log({ favoriteFoods });

  useEffect(() => {
    getFavoriteFoods();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="grid max-w-screen-2xl select-none grid-cols-fluid items-start justify-center gap-4 px-0 sm:px-0 lg:justify-start">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortFavorites(Object.values(favoriteFoods)).map((food) => (
          <FoodCard food={food} key={food.food_id} />
        ))
      )}
    </div>
  );
};

export default Favorites;
