import {
  FilterQueries,
  FiltersEnum,
  PlansEnum,
  FilterSortTypes,
} from "@/types";
import { FoodKind } from "@/features/foods/types";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  queries: FilterQueries;
}

interface Nuts {
  calories_range: {
    min: number;
    max: number;
  };
  proteins_range: {
    min: number;
    max: number;
  };
  carbs_range: {
    min: number;
    max: number;
  };
  fats_range: {
    min: number;
    max: number;
  };
}

const Filters: FC<Props> = ({ queries }) => {
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState(false);
  const [nutrients, setNutrients] = useState<Nuts>({
    calories_range: {
      min: 0,
      max: 0,
    },
    proteins_range: {
      min: 0,
      max: 0,
    },
    carbs_range: {
      min: 0,
      max: 0,
    },
    fats_range: {
      min: 0,
      max: 0,
    },
  });

  const NUTRIENTS_OPTIONS = [
    {
      name: "Calories",
      filterEnum: FiltersEnum.calories_range,
      min: nutrients.calories_range.min,
      max: nutrients.calories_range.max,
    },
    {
      name: "Proteins",
      filterEnum: FiltersEnum.proteins_range,
      min: nutrients.proteins_range.min,
      max: nutrients.proteins_range.max,
    },
    {
      name: "Carbs",
      filterEnum: FiltersEnum.carbs_range,
      min: nutrients.carbs_range.min,
      max: nutrients.carbs_range.max,
    },
    {
      name: "Fats",
      filterEnum: FiltersEnum.fats_range,
      min: nutrients.fats_range.min,
      max: nutrients.fats_range.max,
    },
  ];

  const handleOpenFilters = async (event: React.MouseEvent) => {
    event.preventDefault();
    setOpenFilters(!openFilters);
  };

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;

    let query;
    if (
      name === FiltersEnum.calories_range ||
      name === FiltersEnum.proteins_range ||
      name === FiltersEnum.fats_range ||
      name === FiltersEnum.carbs_range
    ) {
      const min = nutrients[name as keyof Nuts].min;
      const max = nutrients[name as keyof Nuts].max;
      if (!min && !max) return;
      query = {
        ...queries,
        [name]: `${min}-${max}`,
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
    if (
      name === FiltersEnum.calories_range ||
      name === FiltersEnum.proteins_range ||
      name === FiltersEnum.fats_range ||
      name === FiltersEnum.carbs_range
    ) {
      setNutrients({
        ...nutrients,
        [name]: {
          min: 0,
          max: 0,
        },
      });
    }
  };

  const handleNutrient = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const value = (event.target as HTMLButtonElement).value;
    const id = (event.target as HTMLButtonElement).id;

    const nutrient = { ...nutrients[id as keyof Nuts] };

    const newNutrient = {
      ...nutrient,
      [name]: Number(value),
    };
    setNutrients({
      ...nutrients,
      [id]: newNutrient,
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
            <span className="font-semibold">Nutrients</span>
            {NUTRIENTS_OPTIONS.map((nutrient) => {
              const min = nutrient.min;
              const max = nutrient.max;
              const filterEnum = nutrient.filterEnum;
              const value = queries[filterEnum];

              return (
                <div
                  key={filterEnum}
                  className="flex w-full items-center justify-between gap-1"
                >
                  <span className={`text-sm ${value && "text-green-500"}`}>
                    {nutrient.name}:
                  </span>
                  {!value ? (
                    <div className="flex items-center gap-1">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          onChange={handleNutrient}
                          name={"min"}
                          id={filterEnum}
                          min="0"
                          placeholder="Min"
                          value={min > 0 ? min : ""}
                          className="w-12 basis-1/2 border-b bg-transparent text-right  text-xs outline-none"
                        />
                        <input
                          type="number"
                          onChange={handleNutrient}
                          name={"max"}
                          id={filterEnum}
                          min="0"
                          placeholder="Max"
                          value={max > 0 ? max : ""}
                          className=" w-12 basis-1/2 border-b bg-transparent text-right  text-xs outline-none"
                        />
                      </div>
                      <RoundButton
                        onClick={handleSelect}
                        name={filterEnum}
                        customClass="h-5 w-5"
                      >
                        <span className="material-icons-outlined md-18 pointer-events-none">
                          arrow_right
                        </span>
                      </RoundButton>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 ">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={
                            Number(value.split("-")[0]) > 0
                              ? value.split("-")[0]
                              : "-"
                          }
                          readOnly
                          className="w-12 basis-1/2 cursor-not-allowed border-b border-green-500 bg-transparent text-right text-xs  text-green-500 outline-none"
                        />
                        <input
                          type="number"
                          value={
                            Number(value.split("-")[1]) > 0
                              ? value.split("-")[1]
                              : "-"
                          }
                          readOnly
                          className="w-12 basis-1/2 cursor-not-allowed border-b border-green-500 bg-transparent text-right text-xs  text-green-500 outline-none"
                        />
                      </div>
                      <RoundButton onClick={handleRemove} name={filterEnum}>
                        <span className="material-icons-outlined md-14 pointer-events-none">
                          close
                        </span>
                      </RoundButton>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
