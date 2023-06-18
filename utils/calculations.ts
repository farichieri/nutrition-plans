import { FEET_TO_CM, INCHES_TO_CM, LIB_TO_KG } from "@/constants/measurements";
import { MeasurementUnits, WeightUnits } from "@/types";

const cmsToFeet = ({ cms }: { cms: number }) => {
  let totalInches = cms / INCHES_TO_CM;
  let feet = Math.floor(Number(totalInches) / 12);
  return feet;
};

const cmsToInches = ({ cms }: { cms: number }): number => {
  let totalInches = cms / INCHES_TO_CM;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - 12 * feet);
  return inches;
};

const kgsToLbs = ({ kgs }: { kgs: number }): number => {
  let pounds = Math.round(kgs / LIB_TO_KG);
  return pounds;
};

const lbsToKgs = ({ pounds }: { pounds: number }): number => {
  return Math.round(pounds * LIB_TO_KG);
};

const feetAndInchesToCMS = ({
  feet,
  inches,
}: {
  feet: number;
  inches: number;
}) => {
  return feet * FEET_TO_CM + inches * INCHES_TO_CM;
};

const getWeight = ({
  to,
  weight,
}: {
  to: MeasurementUnits;
  weight: number;
}): number => {
  const { metric, imperial } = MeasurementUnits;
  switch (to) {
    case imperial:
      return kgsToLbs({ kgs: weight });
    case metric:
      return weight;
    default:
      return weight;
  }
};

const getWeightInKg = ({
  from,
  weight,
}: {
  from: MeasurementUnits;
  weight: number;
}): number => {
  const { metric, imperial } = MeasurementUnits;
  switch (from) {
    case imperial:
      return lbsToKgs({ pounds: weight });
    case metric:
      return weight;
    default:
      return weight;
  }
};

const getWeightText = ({
  weight,
  from,
}: {
  weight: number;
  from: MeasurementUnits;
}): string => {
  const { metric, imperial } = MeasurementUnits;
  const { lbs, kgs } = WeightUnits;
  switch (from) {
    case metric:
      return `${weight} ${kgs}`;
    case imperial:
      return `${weight} ${lbs}`;
    default:
      return `${weight}`;
  }
};

const getWeightUnit = ({ from }: { from: MeasurementUnits }): string => {
  if (from === MeasurementUnits.imperial) return WeightUnits.lbs;
  else if (from === MeasurementUnits.metric) return WeightUnits.kgs;
  else return "";
};

export {
  cmsToFeet,
  cmsToInches,
  kgsToLbs,
  feetAndInchesToCMS,
  lbsToKgs,
  getWeight,
  getWeightText,
  getWeightUnit,
  getWeightInKg,
};
