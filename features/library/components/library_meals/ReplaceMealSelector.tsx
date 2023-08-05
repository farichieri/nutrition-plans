import {
  SavedMealCard,
  getSavedMeals,
  selectLibrarySlice,
  setLibraryMeals,
  setIsSearching,
} from "@/features/library";
import { DietMeal, Diet, DietMealGroupArr } from "@/features/plans";
import { FC, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  diet: Diet;
  handleClose: () => void;
  replaceMealID: string;
}

const ReplaceMealSelector: FC<Props> = ({
  handleClose,
  diet,
  replaceMealID,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const { libraryMeals, isSearching } = useSelector(selectLibrarySlice);
  const noData = Object.keys(libraryMeals).length < 1;
  const isSearchingFavoriteMeals = isSearching.meals;

  const fetchLibraryMeals = async () => {
    if (!user) return;
    const res = await getSavedMeals({ userID: user.id });
    if (res.result === "success") {
      dispatch(setLibraryMeals(res.data));
    } else {
      dispatch(setLibraryMeals({}));
    }
    dispatch(setIsSearching({ target: "meals", value: false }));
  };

  const sortDays = (foods: DietMealGroupArr) => {
    return foods.sort((a: DietMeal, b: DietMeal) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchLibraryMeals();
  }, []);

  if (noData && isSearchingFavoriteMeals) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-3xl  max-w-[95vw] flex-col gap-2 p-2 pt-3 ">
      <div className="flex items-center gap-1">
        <MdContentCopy className="h-5 w-5 text-blue-500" />
        <span className="font-semibold">Replace meal with:</span>
      </div>
      {noData ? (
        <div className="m-auto">No meals saved found 😔</div>
      ) : (
        sortDays(Object.values(libraryMeals)).map((meal) => (
          <SavedMealCard
            diet={diet}
            handleClose={handleClose}
            key={meal.id}
            meal={meal}
            replaceMealID={replaceMealID}
            isReplaceable={true}
          />
        ))
      )}
    </div>
  );
};

export default ReplaceMealSelector;
