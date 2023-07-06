import {
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
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  food: Food;
}

const AddToFavorite: FC<Props> = ({ food }) => {
  const dispatch = useDispatch();
  const [isFavoriting, setIsFavoriting] = useState(false);
  const { id: foodID } = food;
  const { isRating } = useSelector(selectFavoritesSlice);
  const { user } = useSelector(selectAuthSlice);

  if (!user || !foodID) return <></>;

  const { foodRating } = user.ratings;
  const isFavorite: boolean = foodRating.favorites.includes(foodID);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = (event.target as HTMLButtonElement).id;
      if (!foodRating) return;
      if (isRating) return;
      dispatch(setIsRating(true));

      id === "favorites" && setIsFavoriting(true);

      let favorites = [...foodRating["favorites"]];

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
      } else {
        await updateAction("favorites", "increment");
        favorites = [...favorites, foodID];
      }

      let fields = {
        ratings: {
          foodRating: {
            ...foodRating,
            favorites: favorites,
          },
        },
      };

      if (JSON.stringify(fields.ratings) !== JSON.stringify(user.ratings)) {
        const res = await updateUser({ user, fields });
        if (res.result === "success") {
          dispatch(setUpdateUser({ user, fields }));
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
      className={`flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full border  duration-300 hover:bg-slate-500/20 active:scale-90 ${
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

export default AddToFavorite;
