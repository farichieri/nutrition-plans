import {
  selectAuthSlice,
  useUpdateUserMutation,
} from "@/features/authentication";
import { MdFavorite } from "react-icons/md";
import { addDietToLibrary, removeDietFromLibrary } from "@/features/library";
import { Diet } from "../..";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  diet: Diet;
}

const AddPlanToFavorites: FC<Props> = ({ diet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  if (!user || !diet.id) return <></>;

  const isFavorite: boolean = user.ratings.plansRating.favorites.includes(
    diet.id
  );

  const handleFavoriteDiet = async () => {
    const favIndex = user.ratings.plansRating.favorites.indexOf(diet.id!);
    const isAlreadyFavorite = favIndex > -1;
    const { plansRating } = user.ratings;

    try {
      setIsFavoriting(true);

      let favorites = [...plansRating["favorites"]];

      if (isAlreadyFavorite) {
        favorites.splice(favIndex, 1);
      } else {
        favorites = [...favorites, diet.id!];
      }

      let fields = {
        ratings: {
          ...user.ratings,
          plansRating: {
            ...user.ratings.plansRating,
            favorites: favorites,
          },
        },
      };

      if (JSON.stringify(fields.ratings) !== JSON.stringify(user.ratings)) {
        const res = await updateUser({ user, fields });
        if (!("error" in res)) {
          if (isAlreadyFavorite) {
            dispatch(removeDietFromLibrary(diet));
          } else {
            dispatch(addDietToLibrary(diet));
          }
        } else {
          throw new Error("Error updating user");
        }
      }
      toast.success(
        `Diet ${isAlreadyFavorite ? "removed from" : "added to"} favorites.`
      );
    } catch (error) {
      console.log({ error });
      toast.error(
        `
        Error ${isAlreadyFavorite ? "removing from" : "adding to"} favorites.`
      );
    } finally {
      setIsFavoriting(false);
    }
  };

  return (
    <button
      onClick={handleFavoriteDiet}
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

export default AddPlanToFavorites;
