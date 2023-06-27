import {
  FoodRating,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import {
  addFavoriteFood,
  removeFavoriteFood,
  selectFavoritesSlice,
  setIsRating,
  updateFoodRating,
} from "@/features/favorites";
import { FC, useState } from "react";
import { Food } from "@/features/foods";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";
import { MdFavorite } from "react-icons/md";

interface Props {
  food: Food;
}

const AddToFavorite: FC<Props> = ({ food }) => {
  const { food_id } = food;
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const { isRating } = useSelector(selectFavoritesSlice);
  if (!user || !food_id) return <></>;

  const food_rating: FoodRating = user.ratings.food_rating;
  const isFavorite = food_rating?.favorites.includes(food_id);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = (event.target as HTMLButtonElement).id;
      if (!food_rating) return;
      if (isRating) return;
      dispatch(setIsRating(true));

      id === "favorites" && setIsFavoriting(true);

      let favorites = [...food_rating["favorites"]];

      const favIndex = favorites.indexOf(food_id);
      const isAlreadyFavorite = favIndex > -1;

      const updateAction = async (field: string, action: string) => {
        const res = await updateFoodRating(food_id, field, action);
        if (res.result === "error") {
          throw new Error("Error updating food rating");
        }
      };

      if (isAlreadyFavorite) {
        await updateAction("num_favorites", "decrement");
        favorites.splice(favIndex, 1);
      } else {
        await updateAction("num_favorites", "increment");
        favorites = [...favorites, food_id];
      }

      let userUpdated = {
        ...user,
        ratings: {
          food_rating: {
            ...food_rating,
            favorites: favorites,
          },
        },
      };
      if (JSON.stringify(userUpdated) !== JSON.stringify(user)) {
        const res = await updateUser(userUpdated);
        if (res.result === "success") {
          dispatch(setUpdateUser(userUpdated));
          if (isAlreadyFavorite) {
            dispatch(removeFavoriteFood(food));
          } else {
            dispatch(addFavoriteFood(food));
          }
        }
      }
    } catch (error) {
      console.log({ error });
    }
    setIsFavoriting(false);
    dispatch(setIsRating(false));
  };

  return (
    <button
      onClick={handleRating}
      id="favorites"
      className={`flex h-9 w-9 min-w-[2.25rem] items-center justify-center rounded-full border  duration-300 hover:bg-slate-500/20 active:scale-90 ${
        isFavorite && "border-green-500"
      }`}
    >
      {isFavoriting ? (
        <Spinner customClass={` h-5 w-5  ${isFavorite && "text-green-500"}`} />
      ) : (
        <MdFavorite
          className={`pointer-events-none h-6 w-6  ${
            isFavorite ? "text-green-500" : "text-gray-400 dark:text-gray-300"
          }`}
        />
      )}
    </button>
  );
};

export default AddToFavorite;
