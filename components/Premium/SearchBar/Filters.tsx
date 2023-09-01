import {
  FilterQueries,
  FiltersEnum,
  PlansEnum,
  FilterSortTypes,
} from "@/types";
import { FC, useState } from "react";
import { FoodKind } from "@/features/foods";
import { MdArrowRight, MdClose, MdTune } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  queries: FilterQueries;
  updateRoute: boolean;
  setLocalQueries: Function;
  fixedQueries?: FilterQueries;
}

interface Nuts {
  caloriesRange: {
    min: number;
    max: number;
  };
  proteinsRange: {
    min: number;
    max: number;
  };
  carbsRange: {
    min: number;
    max: number;
  };
  fatsRange: {
    min: number;
    max: number;
  };
}

const Filters: FC<Props> = ({
  queries,
  updateRoute,
  setLocalQueries,
  fixedQueries,
}) => {
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState(false);
  const [nutrients, setNutrients] = useState<Nuts>({
    caloriesRange: {
      min: 0,
      max: 0,
    },
    proteinsRange: {
      min: 0,
      max: 0,
    },
    carbsRange: {
      min: 0,
      max: 0,
    },
    fatsRange: {
      min: 0,
      max: 0,
    },
  });

  const NUTRIENTS_OPTIONS = [
    {
      name: "Calories",
      filterEnum: FiltersEnum.CaloriesRange,
      min: nutrients.caloriesRange.min,
      max: nutrients.caloriesRange.max,
    },
    {
      name: "Proteins",
      filterEnum: FiltersEnum.ProteinsRange,
      min: nutrients.proteinsRange.min,
      max: nutrients.proteinsRange.max,
    },
    {
      name: "Carbs",
      filterEnum: FiltersEnum.CarbsRange,
      min: nutrients.carbsRange.min,
      max: nutrients.carbsRange.max,
    },
    {
      name: "Fats",
      filterEnum: FiltersEnum.FatsRange,
      min: nutrients.fatsRange.min,
      max: nutrients.fatsRange.max,
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

    if (fixedQueries && fixedQueries[name as keyof FilterQueries]) {
      toast.error("You can't change this filter here.");
      return;
    }

    let query;
    if (
      name === FiltersEnum.CaloriesRange ||
      name === FiltersEnum.ProteinsRange ||
      name === FiltersEnum.FatsRange ||
      name === FiltersEnum.CarbsRange
    ) {
      let min = nutrients[name as keyof Nuts].min;
      let max = nutrients[name as keyof Nuts].max;
      if (!min && !max) return;
      if (!min) min = 0;
      if (!max) max = Infinity;
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
    if (updateRoute) {
      router.replace({
        pathname: router.pathname,
        query,
      });
    } else {
      setLocalQueries(query);
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;

    if (fixedQueries && fixedQueries[name as keyof FilterQueries]) {
      toast.error("You can't change this filter here.");
      return;
    }

    delete queries[name as keyof FilterQueries];
    if (updateRoute) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...queries,
        },
      });
    } else {
      setLocalQueries({ ...queries });
    }
    if (
      name === FiltersEnum.CaloriesRange ||
      name === FiltersEnum.ProteinsRange ||
      name === FiltersEnum.FatsRange ||
      name === FiltersEnum.CarbsRange
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
    <div className="flex w-full flex-col items-start justify-center gap-1 border-b pb-2">
      <RoundButton
        id="tour-search-2"
        onClick={handleOpenFilters}
        customClass={`px-3 py-1.5 ${openFilters && "!border-slate-500/30"}`}
      >
        <MdTune className="pointer-events-none mr-1 h-6 w-6" /> Filters
      </RoundButton>
      {openFilters && (
        <div className="flex w-full flex-wrap justify-between ">
          <div className="flex w-1/2 flex-col items-start gap-2 p-2 sm:w-auto">
            <span className="font-semibold">Plan</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(PlansEnum).map((plan) => (
                <div key={plan} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.Plan}
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
                      name={FiltersEnum.Plan}
                      value={plan}
                      className="flex items-center"
                    >
                      <MdClose className="pointer-events-none h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-1/3 flex-col items-start gap-2 p-2 sm:w-auto">
            <span className="font-semibold">Kind</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(FoodKind).map((kind) => (
                <div key={kind} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.Kind}
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
                      name={FiltersEnum.Kind}
                      value={kind}
                      className="flex items-center"
                    >
                      <MdClose className="pointer-events-none h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-auto flex-col items-start gap-2 p-2 ">
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
                        <MdArrowRight className="pointer-events-none h-5 w-5 " />
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
                        <MdClose className="pointer-events-none h-4 w-4 " />
                      </RoundButton>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex w-1/3 flex-col items-start gap-2 p-2 sm:w-auto">
            <span className="font-semibold">Sort By</span>
            <div className="flex flex-col items-start gap-1">
              {Object.keys(FilterSortTypes).map((sort) => (
                <div key={sort} className="flex items-center gap-2">
                  <button
                    onClick={handleSelect}
                    name={FiltersEnum.Sort}
                    value={sort}
                    className={`text-left text-sm font-light capitalize ${
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
