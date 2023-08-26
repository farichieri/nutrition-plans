import {
  FEET_TO_CM,
  INCHES_TO_CM,
  LIB_TO_KG,
  L_TO_FO,
} from "@/constants/measurements";
import { WaterUnits, WeightUnits, MeasurementUnitsT } from "@/types";
import { formatTwoDecimals } from "./format";

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
  let pounds = kgs / LIB_TO_KG;
  return formatTwoDecimals(pounds);
};

const lbsToKgs = ({ pounds }: { pounds: number }): number => {
  let kgs = pounds * LIB_TO_KG;
  return formatTwoDecimals(kgs);
};

const ltsToFluidOnces = ({ lts }: { lts: number }): number => {
  let fluidOnces = lts * L_TO_FO;
  return formatTwoDecimals(fluidOnces);
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
  to: MeasurementUnitsT;
  weight: number;
}): number => {
  switch (to) {
    case "imperial":
      return kgsToLbs({ kgs: weight });
    case "metric":
      return weight;
    default:
      return weight;
  }
};

const getWeightInKg = ({
  from,
  weight,
}: {
  from: MeasurementUnitsT;
  weight: number;
}): number => {
  switch (from) {
    case "imperial":
      return lbsToKgs({ pounds: weight });
    case "metric":
      return weight;
    default:
      return weight;
  }
};

const getWeightUnit = ({ from }: { from: MeasurementUnitsT }): string => {
  if (from === "imperial") return WeightUnits.Lbs;
  else if (from === "metric") return WeightUnits.Kgs;
  else return "";
};

const getWeightAndText = ({
  to,
  weightInKg,
}: {
  to: MeasurementUnitsT;
  weightInKg: number;
}): { weight: number; weightText: string } => {
  const weight = getWeight({ to, weight: weightInKg });
  const weightText = getWeightUnit({ from: to });
  return { weight, weightText };
};

const getWeightText = ({
  weight,
  from,
}: {
  weight: number;
  from: MeasurementUnitsT;
}): string => {
  const { Lbs, Kgs } = WeightUnits;
  switch (from) {
    case "metric":
      return `${formatTwoDecimals(weight)} ${Kgs}`;
    case "imperial":
      return `${formatTwoDecimals(weight)} ${Lbs}`;
    default:
      return `${formatTwoDecimals(weight)}`;
  }
};

const convertWater = ({
  to,
  lts,
}: {
  to: MeasurementUnitsT;
  lts: number;
}): number => {
  switch (to) {
    case "imperial":
      return ltsToFluidOnces({ lts: lts });
    case "metric":
      return lts;
    default:
      return lts;
  }
};

const getWaterInLts = ({
  from,
  value,
}: {
  from: MeasurementUnitsT;
  value: number;
}): number => {
  switch (from) {
    case "imperial":
      return value * L_TO_FO;
    case "metric":
      return value;
    default:
      return value;
  }
};

const getWaterUnit = ({ from }: { from: MeasurementUnitsT }): string => {
  if (from === "imperial") return WaterUnits.FlOz;
  else if (from === "metric") return WaterUnits.Lts;
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
  ltsToFluidOnces,
  convertWater,
  getWaterUnit,
  getWaterInLts,
  getWeightAndText,
};
