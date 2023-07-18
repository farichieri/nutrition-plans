import { PlansType } from "@/types";
import { MDDirectories, getSortedData } from "@/utils/mds";

const getPlansAvailable = (): PlansType => {
  const allPlansData = getSortedData(MDDirectories.plans);
  const plansAvailable: PlansType = allPlansData.filter(
    (plan: any) => plan.isAvailable
  );
  return plansAvailable;
};

export { getPlansAvailable };
