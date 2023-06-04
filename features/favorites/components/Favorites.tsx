import { FC, useEffect } from "react";
import { fetchFoodsByIDS } from "@/features/foods";
import { selectAuthSlice } from "@/features/authentication";
import { selectFavoritesSlice, setFavoriteFoods } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "@/features/foods/components/search-food/FoodsSearched/FoodCard";

interface Props {}

const Favorites: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const food_rating = user?.ratings.food_rating;
  const favorites = food_rating?.favorites;
  const { favoriteFoods } = useSelector(selectFavoritesSlice);
  const noData = Object.keys(favoriteFoods).length < 1;

  const getFavoriteFoods = async () => {
    if (!favorites) return;
    const res = await fetchFoodsByIDS(favorites);
    console.log({ res });
    if (res.result === "success") {
      dispatch(setFavoriteFoods(res.data));
    } else {
      dispatch(setFavoriteFoods({}));
    }
  };

  useEffect(() => {
    getFavoriteFoods();
  }, []);

  return (
    <div>
      <div className="sm:grid-cols grid max-w-screen-2xl select-none grid-cols-fluid gap-4 px-4 sm:px-0">
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
