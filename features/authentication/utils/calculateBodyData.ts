import { KCALS_TO_GAIN, KCALS_TO_LOSE } from "@/constants/user-constants";
import { UserGenders, UserGoals, UserActivities } from "../types";

const calculateBMR = ({
  kgs,
  cms,
  age,
  gender,
}: {
  kgs: number;
  cms: number;
  age: number;
  gender: UserGenders;
}): number => {
  const standard = 10 * Number(kgs) + 6.25 * Number(cms) - 5 * Number(age);
  return Number(gender === UserGenders.male ? standard + 5 : standard - 161);
};

const calculateKCALSRecommended = ({
  BMR,
  goal,
  activity,
}: {
  BMR: number;
  goal: UserGoals;
  activity: UserActivities;
}): number => {
  const goalCalories =
    goal === UserGoals.lose_weight
      ? KCALS_TO_LOSE
      : goal === UserGoals.build_muscle
      ? KCALS_TO_GAIN
      : 0;
  return Math.round(Number(BMR) * Number(activity) + goalCalories);
};

const calculateBMI = ({ kgs, cms }: { kgs: number; cms: number }): number => {
  return parseFloat((Number(kgs) / Math.pow(Number(cms) / 100, 2)).toFixed(2));
};

const BMISignificance = (BMI: number): string => {
  if (BMI < 18.5) {
    return "Underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return "Normal";
  } else if (BMI >= 25 && BMI <= 29.9) {
    return "Overweight";
  } else if (BMI >= 30) {
    return "Obesity";
  } else {
    return "";
  }
};

export {
  calculateBMR,
  calculateKCALSRecommended,
  calculateBMI,
  BMISignificance,
};
