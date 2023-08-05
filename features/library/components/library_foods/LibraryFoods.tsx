import {
  selectLibrarySlice,
  setIsSearching,
  setLibraryFoods,
} from "../../slice";
import {
  Food,
  FoodGroupArray,
  fetchFoodsByIDS,
  FoodCard,
} from "@/features/foods";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const LibraryFoods: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const { libraryFoods, isSearching } = useSelector(selectLibrarySlice);
  const dispatch = useDispatch();
  const foodsRating = user?.ratings.foodsRating;
  const favorites = foodsRating?.favorites;
  const isSearchingFavoriteFoods = isSearching.foods;
  const noData = Object.keys(libraryFoods).length < 1;

  const getLibraryFoods = async () => {
    if (!favorites) return;
    const res = await fetchFoodsByIDS(favorites);
    if (res.result === "success") {
      dispatch(setLibraryFoods(res.data));
    } else {
      dispatch(setLibraryFoods({}));
    }
    dispatch(setIsSearching({ target: "foods", value: false }));
  };

  const sortFavorites = (foods: FoodGroupArray) => {
    return foods.sort((a: Food, b: Food) => {
      return a.name!.localeCompare(b.name!);
    });
  };

  useEffect(() => {
    getLibraryFoods();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-full select-none grid-cols-fluid_lg flex-col items-start justify-center gap-2 px-0 sm:grid sm:grid-cols-fluid sm:px-0 lg:justify-start">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortFavorites(Object.values(libraryFoods)).map((food) => (
          <FoodCard food={food} key={food.id} />
        ))
      )}
    </div>
  );
};

export default LibraryFoods;
