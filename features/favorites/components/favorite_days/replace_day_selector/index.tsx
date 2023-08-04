import {
  getSavedDays,
  selectFavoritesSlice,
  setFavoritePlans,
  setIsSearchingFavoritePlans,
} from "@/features/favorites";
import { Diet, DietGroupArray } from "@/features/plans";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import PlanCard from "@/features/plans/components/common/PlanCard";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  date: string;
}

const ReplaceDaySelector: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const { favoritePlans, isSearchingFavoriteFoods } =
    useSelector(selectFavoritesSlice);
  const noData = Object.keys(favoritePlans).length < 1;

  const fetchFavoritePlans = async () => {
    if (!user) return;
    const res = await getSavedDays({ userID: user.id });
    if (res.result === "success") {
      dispatch(setFavoritePlans(res.data));
    } else {
      dispatch(setFavoritePlans({}));
    }
    dispatch(setIsSearchingFavoritePlans(false));
  };

  const sortDays = (foods: DietGroupArray) => {
    return foods.sort((a: Diet, b: Diet) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchFavoritePlans();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-3xl  max-w-[95vw] flex-col gap-2 p-2 ">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortDays(Object.values(favoritePlans)).map((diet) => (
          <PlanCard replaceDate={date} key={diet.id} diet={diet} />
        ))
      )}
    </div>
  );
};

export default ReplaceDaySelector;
