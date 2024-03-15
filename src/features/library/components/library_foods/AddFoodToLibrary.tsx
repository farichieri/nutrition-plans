"use client";

import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "@/components/Loader/Spinner";
import {
  selectAuthSlice,
  useUpdateUserMutation,
} from "@/features/authentication";
import { Food, FoodHit } from "@/features/foods";
import {
  addFoodToLibrary,
  removeFoodFromLibrary,
  selectLibrarySlice,
  setIsRating,
  updateFoodRating,
} from "@/features/library";

interface Props {
  food: FoodHit | Food;
}

const AddFoodToLibrary: FC<Props> = ({ food }) => {
  const dispatch = useDispatch();
  const [isFavoriting, setIsFavoriting] = useState(false);
  const { id: foodID } = food;
  const { isRating } = useSelector(selectLibrarySlice);
  const { user } = useSelector(selectAuthSlice);
  const [updateUser] = useUpdateUserMutation();

  if (!user || !foodID) return <></>;

  const { foodsRating } = user.ratings;
  const isFavorite: boolean = foodsRating.favorites.includes(foodID);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (!foodsRating) return;
      if (isRating) return;
      dispatch(setIsRating(true));

      setIsFavoriting(true);

      let favorites = [...foodsRating["favorites"]];

      const favIndex = favorites.indexOf(foodID);
      const isAlreadyFavorite = favIndex > -1;

      const updateAction = async (field: string, action: string) => {
        const res = await updateFoodRating({ foodID, field, action });
        if (res.result === "error") {
          throw new Error("Error updating food rating");
        }
      };

      if (isAlreadyFavorite) {
        await updateAction("favorites", "decrement");
        favorites.splice(favIndex, 1);
        toast.success("Removed from favorites");
      } else {
        await updateAction("favorites", "increment");
        favorites = [...favorites, foodID];
        toast.success("Added to favorites");
      }

      let fields = {
        ratings: {
          ...user.ratings,
          foodsRating: {
            ...foodsRating,
            favorites: favorites,
          },
        },
      };

      if (JSON.stringify(fields.ratings) !== JSON.stringify(user.ratings)) {
        const res = await updateUser({ user, fields });
        if (!("error" in res)) {
          if (isAlreadyFavorite) {
            dispatch(removeFoodFromLibrary(food));
          } else {
            dispatch(addFoodToLibrary(food));
          }
        } else {
          throw new Error("Error updating user");
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsFavoriting(false);
    dispatch(setIsRating(false));
  };

  return (
    <button
      onClick={handleRating}
      id="tour-food-3"
      className={`flex items-center justify-center rounded-full   duration-300  active:scale-90 ${
        isFavorite && "border-green-500"
      }`}
    >
      {isFavoriting ? (
        <Spinner customClass={` h-5 w-5  ${isFavorite && "text-green-500"}`} />
      ) : (
        <MdFavorite
          className={`pointer-events-none h-5 w-5  ${
            isFavorite ? "text-green-500" : "text-gray-400 dark:text-gray-300"
          }`}
        />
      )}
    </button>
  );
};

export default AddFoodToLibrary;
