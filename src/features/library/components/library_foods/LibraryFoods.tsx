"use client";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "@/components/Loader/Spinner";
import { selectAuthSlice } from "@/features/authentication";
import {
  FoodCard,
  FoodGroup,
  FoodHit,
  FoodHitsGroup,
  fetchFoodsByIDS,
} from "@/features/foods";

import {
  selectLibrarySlice,
  setIsSearching,
  setLibraryFoods,
} from "../../slice";

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

    try {
      dispatch(setIsSearching({ target: "foods", value: true }));
      const res = await fetchFoodsByIDS(favorites);
      if (res.result === "success") {
        dispatch(setLibraryFoods(res.data));
      } else {
        dispatch(setLibraryFoods({}));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsSearching({ target: "foods", value: false }));
    }
  };

  const sortFavorites = (foods: FoodHitsGroup | FoodGroup) => {
    return Object.values(foods).sort((a: FoodHit, b: FoodHit) => {
      return a.name!.localeCompare(b.name!);
    });
  };

  useEffect(() => {
    getLibraryFoods();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-10 w-10 m-auto" />;
  }

  return (
    <div className="custom-grid grid w-full max-w-screen-2xl select-none flex-col items-start justify-center gap-2 px-0 sm:px-0">
      {noData ? (
        <div className="m-auto">No Favorite Foods found.</div>
      ) : (
        sortFavorites(libraryFoods).map((food) => (
          <FoodCard food={food} key={food.id} />
        ))
      )}
    </div>
  );
};

export default LibraryFoods;
