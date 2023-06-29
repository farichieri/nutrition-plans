import { FilterQueries } from "@/types";

const getRange = ({ nutrientRange }: { nutrientRange: string }): string => {
  const splitted = nutrientRange.split("-");
  return `[${splitted[0]}..${splitted[1]}]`;
};

const getSearchParameters = ({
  queries,
  curated,
  uploader_id,
}: {
  queries: FilterQueries;
  curated?: boolean;
  uploader_id?: string;
}) => {
  let {
    q,
    kind,
    plan,
    calories_range,
    carbs_range,
    fats_range,
    proteins_range,
    sort,
  } = queries;

  let curatedQ = curated ? `curated:true` : "";
  let uploader_idQ = uploader_id ? `uploader_id:${uploader_id}` : "";
  kind = kind ? ` && kind:${kind}` : "";
  plan = plan ? ` && compatible_plans.${plan}:true` : "";
  calories_range = calories_range
    ? ` && nutrients.calories:${getRange({ nutrientRange: calories_range })}`
    : "";
  carbs_range = carbs_range
    ? ` && nutrients.carbohydrates:${getRange({ nutrientRange: carbs_range })}`
    : "";
  fats_range = fats_range
    ? ` && nutrients.fats:${getRange({ nutrientRange: fats_range })}`
    : "";
  proteins_range = proteins_range
    ? ` && nutrients.proteins:${getRange({ nutrientRange: proteins_range })}`
    : "";
  sort =
    !sort || sort === "rating"
      ? "num_likes:desc"
      : sort === "higher_calories"
      ? "nutrients.calories:desc"
      : "nutrients.calories:asc";

  const searchParameters = {
    q: q || "",
    query_by:
      "food_name, food_description, ingredients_names, ingredients_descriptions",
    filter_by: `${uploader_idQ}${curatedQ}${kind}${plan}${calories_range}${carbs_range}${fats_range}${proteins_range}`,
    sort_by: sort,
    page: 1,
    per_page: 40,
  };

  return searchParameters;
};

export default getSearchParameters;
