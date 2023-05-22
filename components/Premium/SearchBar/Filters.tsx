import {
  FilterQueries,
  FiltersEnum,
  PlansEnum,
  FilterSortTypes,
} from "@/types/types";
import { FoodKind } from "@/types/foodTypes";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

interface Props {
  queries: FilterQueries;
}

const Filters: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState(false);
  const [calories, setCalories] = useState({
    min: 0,
    max: 0,
  });

  const handleOpenFilters = async (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenFilters(!openFilters);
  };

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;

    let query;
    if (name === FiltersEnum.calories_range) {
      if (!calories.min && !calories.max) return;
      query = {
        ...queries,
        [name]: `${calories.min}-${calories.max}`,
      };
    } else {
      query = {
        ...queries,
        [name]: value,
      };
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    delete queries[name as keyof FilterQueries];
    router.replace({
      pathname: router.pathname,
      query: {
        ...queries,
      },
    });
  };

  const handleCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;
    setCalories({
      ...calories,
      [name]: value,
    });
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-5 border-b pb-5">
      <button
        onClick={handleOpenFilters}
        className="ml-[-0.75rem] flex items-center justify-center gap-1 rounded-full border border-transparent px-3 py-1.5 active:bg-slate-500/30 sm:hover:bg-slate-500/20 sm:active:border-black/10 sm:dark:active:border-white/10"
      >
        <span className="material-icons-outlined">tune</span> Filters
      </button>
      {openFilters && (
        <div className="flex w-full flex-wrap justify-between gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold">Plan</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(PlansEnum).map((plan) => (
                <div key={plan} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.plan}
                    value={plan}
                    className={`text-sm font-light capitalize ${
                      queries.plan === plan && "text-green-500"
                    }`}
                  >
                    {plan.replaceAll("_", " ")}
                  </button>
                  {queries.plan === plan && (
                    <button
                      onClick={handleRemove}
                      name={FiltersEnum.plan}
                      value={plan}
                      className="flex items-center"
                    >
                      <span className="material-icons md-14 pointer-events-none ">
                        close
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold">Kind</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(FoodKind).map((kind) => (
                <div key={kind} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.kind}
                    value={kind}
                    className={`text-sm font-light capitalize ${
                      queries.kind === kind && "text-green-500"
                    }`}
                  >
                    {kind.replaceAll("_", " ")}
                  </button>
                  {queries.kind === kind && (
                    <button
                      onClick={handleRemove}
                      name={FiltersEnum.kind}
                      value={kind}
                      className="flex items-center"
                    >
                      <span className="material-icons md-14 pointer-events-none ">
                        close
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold">Calories</span>
            {!queries.calories_range ? (
              <>
                <div className="flex w-full items-center gap-2 text-sm ">
                  <span className="basis-1/2">Min:</span>
                  <input
                    type="number"
                    onChange={handleCalories}
                    name={"min"}
                    min="0"
                    value={calories.min > 0 ? calories.min : ""}
                    className="w-16 basis-1/2 border-b bg-transparent  text-right outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="basis-1/2">Max:</span>
                  <input
                    type="number"
                    onChange={handleCalories}
                    name={"max"}
                    min="0"
                    value={calories.max > 0 ? calories.max : ""}
                    className="w-16 basis-1/2 border-b bg-transparent  text-right outline-none"
                  />
                </div>
                <button
                  onClick={handleSelect}
                  name={FiltersEnum.calories_range}
                  className="mx-auto rounded-md border px-2 py-1 text-sm"
                >
                  Apply
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1">
                <div className="flex flex-col gap-1">
                  <div className="flex w-full items-center gap-2 text-sm text-green-500">
                    <span className="basis-1/2">Min:</span>
                    <span className="basis-1/2 text-right">
                      {Number(queries.calories_range.split("-")[0]) > 0
                        ? queries.calories_range.split("-")[0]
                        : "-"}
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2 text-sm text-green-500">
                    <span className="basis-1/2">Max:</span>
                    <span className="basis-1/2 text-right">
                      {Number(queries.calories_range.split("-")[1]) > 0
                        ? queries.calories_range.split("-")[1]
                        : "-"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  name={FiltersEnum.calories_range}
                  className="flex items-center"
                >
                  <span className="material-icons md-14 pointer-events-none ">
                    close
                  </span>
                </button>
              </div>
            )}
          </div>
          {/* <div>By Macros min/max</div> */}
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold">Sort By</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(FilterSortTypes).map((sort) => (
                <div key={sort} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.sort}
                    value={sort}
                    className={`text-sm font-light capitalize ${
                      (queries.sort === sort ||
                        (!queries.sort && sort === FilterSortTypes.rating)) &&
                      "text-green-500"
                    }`}
                  >
                    {sort.replaceAll("_", " ")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
