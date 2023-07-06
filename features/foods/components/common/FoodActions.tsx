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
import { MdThumbDown, MdThumbUp } from "react-icons/md";

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

  const foodRating: FoodRating = user.ratings.foodRating;
  const isLiked = foodRating?.likes.includes(foodID);
  const isDisliked = foodRating?.dislikes.includes(foodID);

  const handleRating = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const id = (event.target as HTMLButtonElement).id;
      if (!foodRating) return;
      if (isRating) return;
      dispatch(setIsRating(true));

      id === "likes" ? setIsLiking(true) : setIsDisliking(true);

      let likes = [...foodRating["likes"]];
      let dislikes = [...foodRating["dislikes"]];

      const likeIndex = likes.indexOf(foodID);
      const dislikeIndex = dislikes.indexOf(foodID);

      const updateAction = async (field: string, action: string) => {
        const res = await updateFoodRating({ foodID, field, action });
        if (res.result === "error") {
          throw new Error("Error updating food rating");
        }
      };

      switch (id) {
        case "likes":
          if (likeIndex > -1) {
            await updateAction("likes", "decrement");
            likes.splice(likeIndex, 1);
          } else {
            likes = [...likes, foodID];
            await updateAction("likes", "increment");
            if (dislikeIndex > -1) {
              await updateAction("dislikes", "decrement");
              dislikes.splice(dislikeIndex, 1);
            }
          }
          break;
        case "dislikes":
          if (dislikeIndex > -1) {
            dislikes.splice(dislikeIndex, 1);
            await updateAction("dislikes", "decrement");
          } else {
            dislikes = [...dislikes, foodID];
            await updateAction("dislikes", "increment");
            if (likeIndex > -1) {
              await updateAction("likes", "decrement");
              likes.splice(likeIndex, 1);
            }
          }
          break;
        default:
          break;
      }

      let fields = {
        ratings: {
          foodRating: {
            ...foodRating,
            likes: likes,
            dislikes: dislikes,
          },
        },
      };
      if (JSON.stringify(fields.ratings) !== JSON.stringify(user.ratings)) {
        const res = await updateUser({ user, fields });
        if (res.result === "success") {
          dispatch(setUpdateUser({ user, fields }));
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
          <MdThumbUp
            className={`pointer-events-none m-auto h-5 w-5 ${
              isLiked && "text-green-500"
            }`}
          />
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
          <MdThumbDown
            className={`pointer-events-none m-auto h-5 w-5 ${
              isDisliked && "text-green-500"
            }`}
          />
        )}
      </button>
    </div>
  );
};

export default FoodActions;
