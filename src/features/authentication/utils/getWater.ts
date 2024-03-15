import { MeasurementUnitsT } from "@/types";
import { ltsToFluidOnces } from "@/utils/calculations";

const getWater = ({
  weightInKg,
  measurement,
}: {
  weightInKg: number;
  measurement: MeasurementUnitsT;
}) => {
  if (measurement === "imperial") {
    // return floz.
    const lts = weightInKg * 0.03;
    return ltsToFluidOnces({ lts: lts });
  } else {
    // return lts.
    const lts = weightInKg * 0.03;
    return lts;
  }
};

export { getWater };
