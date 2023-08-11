import {
  getSavedDays,
  selectLibrarySlice,
  setIsSearching,
  setLibraryDiets,
} from "@/features/library";
import { Diet, DietGroupArray } from "@/features/plans";
import { FC, useEffect } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import PlanCard from "@/features/plans/components/common/PlanCard";
import Spinner from "@/components/Loader/Spinner";

interface Props {}

const LibraryDiets: FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const { libraryDiets, isSearching } = useSelector(selectLibrarySlice);
  const noData = Object.keys(libraryDiets).length < 1;
  const isSearchingFavoriteFoods = isSearching.diets;

  const fetchLibraryDays = async () => {
    if (!user) return;
    try {
      dispatch(setIsSearching({ target: "diets", value: true }));
      const res = await getSavedDays({ userID: user.id });
      if (res.result === "success") {
        dispatch(setLibraryDiets(res.data));
      } else {
        dispatch(setLibraryDiets({}));
      }
    } catch (error) {
      console.log({ error });
    } finally {
      dispatch(setIsSearching({ target: "diets", value: false }));
    }
  };

  const sortDays = (foods: DietGroupArray) => {
    return foods.sort((a: Diet, b: Diet) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchLibraryDays();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-10 w-10 m-auto" />;
  }

  return (
    <div className="flex w-full max-w-[95vw] flex-col gap-2 p-2 ">
      {noData ? (
        <div className="m-auto">No Days saved found.</div>
      ) : (
        sortDays(Object.values(libraryDiets)).map((diet) => (
          <PlanCard
            key={diet.id}
            diet={diet}
            handleClose={() => {}}
            replaceDate={null}
            replaceDates={null}
            setDoneGeneratingPlan={() => {}}
          />
        ))
      )}
    </div>
  );
};

export default LibraryDiets;
