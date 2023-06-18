import { UserActivities } from "@/features/authentication/types";

const ACTIVITY_OPTIONS = [
  {
    value: UserActivities.little_or_not_exercise,
    name: "Little or no exercise",
    description: "little to no exercise",
  },
  {
    value: UserActivities.light_exercise,
    name: "Light exercise (1 to 3 days per week)",
    description: "light exercise 1 to 3 days per week",
  },
  {
    value: UserActivities.moderate_exercise,
    name: "Moderate exercise (3 to 5 days per week)",
    description: "moderate exercise 6 to 7 days per week)",
  },
  {
    value: UserActivities.very_active,
    name: "Very active (6 to 7 days per week)",
    description: "hard exercise every day, or exercising twice a day",
  },
  {
    value: UserActivities.extra_active,
    name: "Extra active (very hard exercise and physical)",
    description: "very hard exercise, training, or a physical job",
  },
];

const KCALS_TO_GAIN = 500;
const KCALS_TO_LOSE = -500;

export { ACTIVITY_OPTIONS, KCALS_TO_GAIN, KCALS_TO_LOSE };
