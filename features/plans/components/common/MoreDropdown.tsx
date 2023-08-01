import {
  MdContentCopy,
  MdDelete,
  MdFavorite,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import {
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { addFavoritePlan, removeFavoritePlan } from "@/features/favorites";
import { deleteDiet } from "../../services";
import { Diet } from "../..";
import { FC, useState } from "react";
import { setDeleteDiet } from "../../slice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "@/components/DropDown/DropDown";
import Spinner from "@/components/Loader/Spinner";

const optionStyle =
  "flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100";

interface Props {
  diet: Diet;
}

const MoreDropdown: FC<Props> = ({ diet }) => {
  const dispatch = useDispatch();
  const [closeDrop, setCloseDrop] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const [isLoading, setIsLoading] = useState({
    favorite: false,
    replace: false,
    delete: false,
  });

  if (!user || !diet.id) return <></>;

  const isFavorite: boolean = user.ratings.plansRating.favorites.includes(
    diet.id
  );

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-1">
          <span>
            Confirm <b>Delete</b>
          </span>
          <div className="flex gap-1">
            <button
              className="flex items-center gap-1 rounded-md border border-red-500 bg-red-500/20 px-3 py-1 hover:bg-red-500/50 active:bg-red-500"
              onClick={async () => {
                toast.dismiss(t.id);
                setIsLoading({ ...isLoading, delete: true });
                const res = await deleteDiet(diet);
                if (res.result === "success") {
                  dispatch(setDeleteDiet({ id: diet.id! }));
                  toast.success("Diet deleted successfully.");
                } else {
                  toast.error("Error deleting diet. Please try again.");
                }
                setIsLoading({ ...isLoading, delete: false });
              }}
            >
              Confirm
            </button>
            <button
              className="flex items-center gap-1 rounded-md border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const handleFavoriteDiet = async () => {
    const favIndex = user.ratings.plansRating.favorites.indexOf(diet.id!);
    const isAlreadyFavorite = favIndex > -1;
    const { plansRating } = user.ratings;

    try {
      setIsLoading({ ...isLoading, favorite: true });

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
        if (res.result === "success") {
          dispatch(setUpdateUser({ user, fields }));
          if (isAlreadyFavorite) {
            dispatch(removeFavoritePlan(diet));
          } else {
            dispatch(addFavoritePlan(diet));
          }
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
      setIsLoading({ ...isLoading, favorite: false });
    }
  };

  const OPTIONS = [
    {
      text: "Favorite Day",
      icon: (
        <MdFavorite
          className={`pointer-events-none h-5 w-5  ${
            isFavorite ? "text-green-500" : "text-gray-400 dark:text-gray-300"
          }`}
        />
      ),
      onClick: handleFavoriteDiet,
      isLoading: isLoading.favorite,
    },
    {
      text: "Replace Day",
      icon: <MdContentCopy className="h-5 w-5 text-blue-500" />,
      onClick: () => {},
      isLoading: isLoading.replace,
    },
    {
      text: "Delete Day",
      icon: <MdDelete className="h-5 w-5 text-red-500" />,
      onClick: handleDelete,
      isLoading: isLoading.delete,
    },
  ];

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={
        <MdOutlineMoreHoriz className="h-6 w-6 cursor-pointer text-gray-500" />
      }
    >
      <div className=" py-2">
        {OPTIONS.map((option, index) => (
          <div key={index} className={optionStyle} onClick={option.onClick}>
            <>
              {option.isLoading ? (
                <Spinner customClass="h-5 w-5" />
              ) : (
                <>{option.icon}</>
              )}
            </>
            <span>{option.text}</span>
          </div>
        ))}
      </div>
    </DropDown>
  );
};

export default MoreDropdown;
