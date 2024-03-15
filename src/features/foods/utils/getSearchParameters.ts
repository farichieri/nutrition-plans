import { HITS_PER_PAGE } from "@/constants/search";
import { FilterQueries } from "@/types";

const getRange = ({ nutrientRange }: { nutrientRange: string }): string => {
  const splitted = nutrientRange.split("-");
  return `[${splitted[0]}..${splitted[1]}]`;
};

const getSearchParameters = ({
  queries,
  isCurated,
  uploaderID,
}: {
  queries: FilterQueries;
  isCurated?: boolean;
  uploaderID?: string;
}) => {
  let {
    q,
    kind,
    plan,
    caloriesRange,
    carbsRange,
    fatsRange,
    proteinsRange,
    sort,
    category,
    page,
  } = queries;

  let curated_uploader_Q = isCurated
    ? `isCurated:true || uploaderID:${uploaderID}`
    : uploaderID
    ? `uploaderID:${uploaderID}`
    : "";
  let kindQ = kind ? `kind:${kind} ` : "";
  let planQ = plan ? `compatiblePlans.${plan}:true` : "";
  let categoryQ =
    category === "all" ? "" : category ? `category:${category}` : "";
  caloriesRange = caloriesRange
    ? `nutrients.calories:${getRange({ nutrientRange: caloriesRange })}`
    : "";
  carbsRange = carbsRange
    ? `nutrients.carbohydrates:${getRange({ nutrientRange: carbsRange })}`
    : "";
  fatsRange = fatsRange
    ? `nutrients.fats:${getRange({ nutrientRange: fatsRange })}`
    : "";
  proteinsRange = proteinsRange
    ? `nutrients.proteins:${getRange({ nutrientRange: proteinsRange })}`
    : "";
  sort =
    !sort || sort === "rating"
      ? "likes:desc"
      : sort === "higherCalories"
      ? "nutrients.calories:desc"
      : "nutrients.calories:asc";

  const filterQueries = [
    curated_uploader_Q,
    kindQ,
    planQ,
    categoryQ,
    caloriesRange,
    carbsRange,
    fatsRange,
    proteinsRange,
  ]
    .filter((q) => q)
    .join(" && ");

  const searchParameters = {
    q: q || "",
    query_by: "name, description, ingredientsNames, ingredientsDescriptions",
    filter_by: filterQueries,
    sort_by: sort,
    page: page ? Number(page) : 1,
    per_page: HITS_PER_PAGE,
    preset: "",
  };

  return searchParameters;
};

export default getSearchParameters;
