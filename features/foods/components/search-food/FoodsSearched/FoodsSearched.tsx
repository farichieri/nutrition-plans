import { AppRoutes } from "@/utils/routes";
import { FC } from "react";
import { FilterQueries } from "@/types";
import { Food, getFoodsFiltered, selectFoodsSlice } from "@/features/foods";
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

  const foodsToFilter =
    router.pathname === AppRoutes.search_my_creations
      ? myFoodsSearched
      : foodsSearched;

  const noData = Object.values(foodsToFilter).length === 0;

  if (isSearchingFoods) {
    return <Spinner customClass="h-6 w-6 m-auto" />;
  }
  if (noData) {
    return <div className="m-auto">No Foods found</div>;
  }

  const foods = getFoodsFiltered(foodsToFilter, queries);

  return (
    <div className="grid max-w-screen-2xl select-none grid-cols-fluid items-start justify-center gap-4 px-0 sm:px-0 lg:justify-start">
      {foods.map((food: Food) => {
        return <FoodCard food={food} key={food.food_id} />;
      })}
    </div>
  );
};

export default FoodsSearched;
