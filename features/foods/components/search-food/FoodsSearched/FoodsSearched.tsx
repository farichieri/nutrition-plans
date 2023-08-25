import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { FilterQueries } from "@/types";
import {
  Food,
  FoodHit,
  getFoodsSorted,
  selectFoodsSlice,
} from "@/features/foods";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  queries: FilterQueries;
}

const FoodsSearched: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const { foodsSearched, isSearchingFoods, myFoodsSearched } =
    useSelector(selectFoodsSlice);

  const foodsToSort =
    router.pathname === AppRoutes.search_my_creations
      ? myFoodsSearched
      : foodsSearched;

  const noData = Object.values(foodsToSort).length === 0;

  if (isSearchingFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }
  if (noData) {
    return <div className="m-auto">No Creations found</div>;
  }

  const foods = getFoodsSorted(foodsToSort, queries);

  return (
    <div className="custom-grid grid w-full max-w-screen-2xl select-none flex-col items-start justify-center gap-2 px-0 sm:px-0">
      {foods.map((food: FoodHit, index) => {
        return (
          <div key={food.id} id={index === 0 ? "tour-search-5" : ""}>
            <FoodCard food={food} />
          </div>
        );
      })}
    </div>
  );
};

export default FoodsSearched;
