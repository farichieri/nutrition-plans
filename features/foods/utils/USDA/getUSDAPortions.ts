import { FoodScales } from "../../types";

type FoodPortions = {
  amount: number;
  gramWeight: number;
  modifier: string;
  id: number;
  measureUnit: { name: string };
};

const getUSDAPortions = ({
  foodPortions,
}: {
  foodPortions: FoodPortions[];
}) => {
  const scales: FoodScales = [];

  if (!foodPortions || foodPortions.length < 1) return scales;

  foodPortions.forEach((portion) => {
    const { amount, gramWeight, modifier, id, measureUnit } = portion;

    scales.push({
      id: id,
      isDefault: false,
      scaleAmount: 1,
      scaleGrams: gramWeight,
      scaleName: `${amount > 1 ? amount : ""} ${modifier || measureUnit.name}`,
      isCreationScale: false,
    });
  });

  return scales;
};

export { getUSDAPortions };
