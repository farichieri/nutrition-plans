import { Plan, allPlans } from "@/.contentlayer/generated";

const getPlansAvailable = (): Plan[] => {
  const plansAvailable: Plan[] = allPlans.filter(
    (plan: any) => plan.isAvailable
  );
  return plansAvailable;
};

export { getPlansAvailable };
