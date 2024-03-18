import { ArticlePlan } from "@/types";

import { getPlansContent } from "./mds";

const getPlansAvailable = (): any[] => {
  const allPlans: ArticlePlan[] = getPlansContent();
  const plansAvailable: ArticlePlan[] = allPlans.filter(
    (plan: ArticlePlan) => plan.metadata.isAvailable
  );
  return plansAvailable;
};

export { getPlansAvailable };
