import {
  selectFavoritesSlice,
  setFavoriteFoods,
  setIsSearchingFavoriteFoods,
} from "@/features/favorites";
import { FC, useEffect } from "react";
import { fetchFoodsByIDS } from "@/features/foods";
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

  useEffect(() => {
    getFavoriteFoods();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div>
      <div className="grid max-w-screen-2xl select-none grid-cols-fluid_fr items-start justify-center gap-4 px-4 sm:px-0 lg:grid-cols-fluid lg:justify-start">
        {noData ? (
          <div className="m-auto">No favorites found 😔</div>
        ) : (
          Object.keys(favoriteFoods).map((food_id) => (
            <FoodCard food={favoriteFoods[food_id]} key={food_id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
