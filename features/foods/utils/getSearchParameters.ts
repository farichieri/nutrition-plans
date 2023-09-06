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
  } = queries;

  let curatedQ = isCurated ? `isCurated:true` : "";
  let uploader_idQ = uploaderID ? `uploaderID:${uploaderID}` : "";
  let kindQ = kind ? ` && kind:${kind}` : "";
  let planQ = plan ? ` && compatiblePlans.${plan}:true` : "";
  let categoryQ =
    category === "all" ? "" : category ? ` && category:${category}` : "";
  caloriesRange = caloriesRange
    ? ` && nutrients.calories:${getRange({ nutrientRange: caloriesRange })}`
    : "";
  carbsRange = carbsRange
    ? ` && nutrients.carbohydrates:${getRange({ nutrientRange: carbsRange })}`
    : "";
  fatsRange = fatsRange
    ? ` && nutrients.fats:${getRange({ nutrientRange: fatsRange })}`
    : "";
  proteinsRange = proteinsRange
    ? ` && nutrients.proteins:${getRange({ nutrientRange: proteinsRange })}`
    : "";
  sort =
    !sort || sort === "rating"
      ? "likes:desc"
      : sort === "higherCalories"
      ? "nutrients.calories:desc"
      : "nutrients.calories:asc";

  const searchParameters = {
    q: q || "",
    query_by: "name, description, ingredientsNames, ingredientsDescriptions",
    filter_by: `${uploader_idQ}${curatedQ}${kindQ}${planQ}${caloriesRange}${carbsRange}${fatsRange}${proteinsRange}${categoryQ}`,
    sort_by: sort,
    page: 1,
    per_page: 40,
  };

  console.log({ searchParameters });

  return searchParameters;
};

export default getSearchParameters;
