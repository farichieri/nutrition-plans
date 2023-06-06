import { FC, useState } from "react";
import { FoodRating } from "@/features/authentication";
import { selectAuthSlice, setUpdateUser } from "@/features/authentication";
import {
  selectFavoritesSlice,
  setIsRating,
  updateFoodRating,
} from "@/features/favorites";
import { updateUser } from "@/features/authentication/services";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  foodID: string;
}

const FoodActions: FC<Props> = ({ foodID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const { isRating } = useSelector(selectFavoritesSlice);
  if (!user) return <></>;

  const food_rating: FoodRating = user.ratings.food_rating;
  const isLiked = food_rating?.likes.includes(foodID);
  const isDisliked = food_rating?.dislikes.includes(foodID);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = (event.target as HTMLButtonElement).id;
      if (!food_rating) return;
      if (isRating) return;
      dispatch(setIsRating(true));

      id === "likes" ? setIsLiking(true) : setIsDisliking(true);

      let likes = [...food_rating["likes"]];
      let dislikes = [...food_rating["dislikes"]];

      const likeIndex = likes.indexOf(foodID);
      const dislikeIndex = dislikes.indexOf(foodID);

      const updateAction = async (field: string, action: string) => {
        const res = await updateFoodRating(foodID, field, action);
        if (res.result === "error") {
          throw new Error("Error updating food rating");
        }
      };

      switch (id) {
        case "likes":
          if (likeIndex > -1) {
            await updateAction("num_likes", "decrement");
            likes.splice(likeIndex, 1);
          } else {
            likes = [...likes, foodID];
            await updateAction("num_likes", "increment");
            if (dislikeIndex > -1) {
              await updateAction("num_dislikes", "decrement");
              dislikes.splice(dislikeIndex, 1);
            }
          }
          break;
        case "dislikes":
          if (dislikeIndex > -1) {
            dislikes.splice(dislikeIndex, 1);
            await updateAction("num_dislikes", "decrement");
          } else {
            dislikes = [...dislikes, foodID];
            await updateAction("num_dislikes", "increment");
            if (likeIndex > -1) {
              await updateAction("num_likes", "decrement");
              likes.splice(likeIndex, 1);
            }
          }
          break;
        default:
          break;
      }

      let userUpdated = {
        ...user,
        ratings: {
          food_rating: {
            ...food_rating,
            likes: likes,
            dislikes: dislikes,
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
    setIsLiking(false);
    setIsDisliking(false);
    dispatch(setIsRating(false));
  };

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={handleRating}
        id="likes"
        className={`flex h-10 w-10 items-center justify-center rounded-full border  duration-300 hover:bg-slate-500/20 active:scale-90 ${
          isLiked && "border-green-500"
        }`}
      >
        {isLiking ? (
          <Spinner customClass={` h-5 w-5  ${isLiked && "text-green-500"}`} />
        ) : (
          <span
            className={`material-icons md-18 pointer-events-none m-auto ${
              isLiked && "text-green-500"
            }`}
          >
            thumb_up
          </span>
        )}
      </button>
      <button
        onClick={handleRating}
        id="dislikes"
        className={`flex h-10 w-10 items-center justify-center rounded-full border  duration-300 hover:bg-slate-500/20 active:scale-90 ${
          isDisliked && "border-green-500"
        }`}
      >
        {isDisliking ? (
          <Spinner
            customClass={` h-5 w-5  ${isDisliked && "text-green-500"}`}
          />
        ) : (
          <span
            className={`material-icons md-18 pointer-events-none m-auto ${
              isDisliked && "text-green-500"
            }`}
          >
            thumb_down
          </span>
        )}
      </button>
    </div>
  );
};

export default FoodActions;
