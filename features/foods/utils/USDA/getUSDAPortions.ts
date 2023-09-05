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

    let realGrams = gramWeight;

    if (amount !== 1) {
      realGrams = gramWeight / amount;
    }

    scales.push({
      id: id,
      isDefault: false,
      scaleAmount: 1,
      scaleGrams: realGrams,
      scaleName: `${modifier || measureUnit.name}`,
      isCreationScale: false,
    });
  });

  return scales;
};

export { getUSDAPortions };
