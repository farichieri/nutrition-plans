import { NewFood } from "@/types/initialTypes";

const getNutrientKeys = () => {
  let nutrientsKeys: any = {};
  Object.keys(NewFood.nutrients).forEach((key) => {
    nutrientsKeys[key] = key;
  });
  return nutrientsKeys;
};

export { getNutrientKeys };
