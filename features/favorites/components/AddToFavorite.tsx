import {
  FoodRating,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { FC, useState } from "react";
import { updateFoodRating } from "../services";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  foodID: string;
}

const AddToFavorite: FC<Props> = ({ foodID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isFavoriting, setIsFavoriting] = useState(false);
  if (!user) return <></>;

  const food_rating: FoodRating = user.ratings.food_rating;
  const isFavorite = food_rating?.favorites.includes(foodID);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = (event.target as HTMLButtonElement).id;
      if (!food_rating) return;
      if (isFavoriting) return;

      id === "favorites" && setIsFavoriting(true);

      let favorites = [...food_rating["favorites"]];

      const favIndex = favorites.indexOf(foodID);

      const updateAction = async (field: string, action: string) => {
        const res = await updateFoodRating(foodID, field, action);
        if (res.result === "error") {
          throw new Error("Error updating food rating");
        }
      };

      if (favIndex > -1) {
        await updateAction("num_favorites", "decrement");
        favorites.splice(favIndex, 1);
      } else {
        await updateAction("num_favorites", "increment");
        favorites = [...favorites, foodID];
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
        }
      }
    } catch (error) {
      console.log({ error });
    }
    setIsFavoriting(false);
  };

  return (
    <button
      onClick={handleRating}
      id="favorites"
      className={`mr-5 flex h-10 w-10 min-w-[2.5rem] items-center justify-center rounded-full border  duration-300 hover:bg-slate-500/20 active:scale-90 ${
        isFavorite && "border-green-500"
      }`}
    >
      {isFavoriting ? (
        <Spinner customClass={` h-5 w-5  ${isFavorite && "text-green-500"}`} />
      ) : (
        <span
          className={`material-icons-outlined md-20 pointer-events-none mr-[0.05rem] ${
            isFavorite && "text-green-500"
          }`}
        >
          favorite
        </span>
      )}
    </button>
  );
};

export default AddToFavorite;
