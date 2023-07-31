import {
  getFavoritePlans,
  selectFavoritesSlice,
  setFavoritePlans,
  setIsSearchingFavoritePlans,
} from "@/features/favorites";
import { Diet, DietGroupArray } from "@/features/plans";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Loader/Spinner";
import PlanCard from "@/features/plans/components/common/PlanCard";

interface Props {}

const FavoritePlans: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const plansRating = user?.ratings.plansRating;
  const favorites = plansRating?.favorites;

  const { favoritePlans, isSearchingFavoriteFoods } =
    useSelector(selectFavoritesSlice);
  const noData = Object.keys(favoritePlans).length < 1;

  const fetchFavoritePlans = async () => {
    if (!favorites || !user) return;
    const res = await getFavoritePlans({ ids: favorites, userID: user.id });
    if (res.result === "success") {
      dispatch(setFavoritePlans(res.data));
    } else {
      dispatch(setFavoritePlans({}));
    }
    dispatch(setIsSearchingFavoritePlans(false));
  };

  const sortFavorites = (foods: DietGroupArray) => {
    return foods.sort((a: Diet, b: Diet) => {
      return a.date!.localeCompare(b.date!);
    });
  };

  useEffect(() => {
    fetchFavoritePlans();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="grid w-full gap-10 sm:grid-cols-fluid_lg sm:gap-5 ">
      {noData ? (
        <div className="m-auto">No favorites found 😔</div>
      ) : (
        sortFavorites(Object.values(favoritePlans)).map((diet) => (
          <PlanCard key={diet.id} diet={diet} />
        ))
      )}
    </div>
  );
};

export default FavoritePlans;
