import { FoodScales } from "../../types";

type FoodPortions = {
  amount: number;
  gramWeight: number;
  modifier: string;
  id: number;
};

const getUSDAPortions = ({
  foodPortions,
}: {
  foodPortions: FoodPortions[];
}) => {
  const scales: FoodScales = [];

  foodPortions.forEach((portion) => {
    const { amount, gramWeight, modifier, id } = portion;

    scales.push({
      id: id,
      isDefault: false,
      scaleAmount: amount,
      scaleGrams: gramWeight,
      scaleName: modifier,
    });
  });

  return scales;
};

export { getUSDAPortions };
