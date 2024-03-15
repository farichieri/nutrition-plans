import { getPlansContent } from "./mds";

const getPlansAvailable = (): any[] => {
  const allPlans = getPlansContent();
  console.log(JSON.stringify(allPlans, null, 2));
  const plansAvailable: any[] = allPlans.filter(
    (plan: any) => plan.isAvailable
  );
  return plansAvailable;
};

export { getPlansAvailable };
