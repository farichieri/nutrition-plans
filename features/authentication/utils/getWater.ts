import { MeasurementUnits } from "@/types";
import { ltsToFluidOnces } from "@/utils/calculations";

const getWater = ({
  weightInKg,
  measurement,
}: {
  weightInKg: number;
  measurement: MeasurementUnits;
}) => {
  if (measurement === MeasurementUnits.imperial) {
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
