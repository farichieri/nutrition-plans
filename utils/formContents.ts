const ACTIVITY_OPTIONS = [
  {
    name: "Little or no exercise",
    value: 1.2,
    description: "little to no exercise",
  },
  {
    name: "Light exercise (1 to 3 days per week)",
    value: 1.375,
    description: "light exercise 1 to 3 days per week",
  },
  {
    name: "Moderate exercise (3 to 5 days per week)",
    value: 1.55,
    description: "moderate exercise 6 to 7 days per week)",
  },
  {
    name: "Very active (6 to 7 days per week)",
    value: 1.725,
    description: "hard exercise every day, or exercising twice a day",
  },
  {
    name: "Extra active (very hard exercise and physical)",
    value: 1.9,
    description: "very hard exercise, training, or a physical job",
  },
];
const GENDER_OPTIONS = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
];
const GOAL_OPTIONS = [
  { value: "Lose Weight", name: "Lose weight" },
  { value: "Maintain", name: "Maintain" },
  { value: "Build Muscle", name: "Build Muscle" },
];

const FOOD_PREFERENCES = [
  { value: "anything", name: "Anything" },
  { value: "gluten-free", name: "Gluten Free" },
  { value: "vegetarian", name: "Vegetarian" },
  { value: "flexitarian", name: "Flexitarian" },
  { value: "ketogenic", name: "Ketogenic" },
  { value: "mediterranean", name: "Mediterranean" },
  { value: "low-carb", name: "Low Carb" },
];

export { ACTIVITY_OPTIONS, GENDER_OPTIONS, GOAL_OPTIONS, FOOD_PREFERENCES };
