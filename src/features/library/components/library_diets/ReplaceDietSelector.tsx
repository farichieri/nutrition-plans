"use client";

import { FC, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "@/components/Loader/Spinner";
import { selectAuthSlice } from "@/features/authentication";
import {
  getSavedDays,
  selectLibrarySlice,
  setIsSearching,
  setLibraryDiets,
} from "@/features/library";
import { Diet, DietGroupArray } from "@/features/plans";
import PlanCard from "@/features/plans/components/common/PlanCard";

interface Props {
  date: string | null;
  dates: string[] | null;
  handleClose: () => void;
  setDoneGeneratingPlan: (value: boolean) => void;
}

const ReplaceDietSelector: FC<Props> = ({
  date,
  dates,
  handleClose,
  setDoneGeneratingPlan,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);

  const { libraryDiets, isSearching } = useSelector(selectLibrarySlice);
  const noData = Object.keys(libraryDiets).length < 1;
  const isSearchingFavoriteFoods = isSearching.diets;

  const fetchLibraryDiets = async () => {
    if (!user) return;
    const res = await getSavedDays({ userID: user.id });
    if (res.result === "success") {
      dispatch(setLibraryDiets(res.data));
    } else {
      dispatch(setLibraryDiets({}));
    }
    dispatch(setIsSearching({ target: "diets", value: false }));
  };

  const sortDays = (foods: DietGroupArray) => {
    return foods.sort((a: Diet, b: Diet) => {
      return a.dateCreated!.localeCompare(b.dateCreated!);
    });
  };

  useEffect(() => {
    fetchLibraryDiets();
  }, []);

  if (noData && isSearchingFavoriteFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }

  return (
    <div className="flex w-3xl max-w-[95vw] flex-col gap-2 px-3 pb-5 pt-3 ">
      <div className="flex items-center gap-1">
        <MdContentCopy className="h-5 w-5 text-blue-500" />
        <span className="font-semibold">Replace day with:</span>
      </div>
      {noData ? (
        <div className="m-auto">No days saved found 😔</div>
      ) : (
        sortDays(Object.values(libraryDiets)).map((diet) => (
          <PlanCard
            replaceDate={date}
            replaceDates={dates}
            key={diet.id}
            diet={diet}
            handleClose={handleClose}
            setDoneGeneratingPlan={setDoneGeneratingPlan}
          />
        ))
      )}
    </div>
  );
};

export default ReplaceDietSelector;
