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
  { value: "anything", name: "Anything", includes: "", excludes: "Nothing" },
  {
    value: "gluten-free",
    name: "Gluten Free",
    includes: "",
    excludes:
      "gluten-containing foods such as wheat, oats, barley, rye, and triticale (a cross between wheat and rye).",
  },
  {
    value: "vegetarian",
    name: "Vegetarian",
    includes: "",
    excludes:
      "animal foods such as red beef, white meat such as chicken, pork, turkey and fish.",
  },
  {
    value: "flexitarian",
    name: "Flexitarian",
    includes:
      "plant foods (fruits, vegetables, whole grains, nuts, seeds) but, unlike vegetarians",
    excludes: "does not exclude meat and fish entirely.",
  },
  // { value: "ketogenic", name: "Ketogenic", includes: "", excludes: "" },
  {
    value: "mediterranean",
    name: "Mediterranean",
    includes:
      "foods such as vegetables and fruits, legumes, fish and shellfish, whole grains, white meat, and nuts, decreasing the amount of consumption of red meat and carbohydrates in favor of vegetables and monounsaturated fats such as Olive oil mainly.",
    excludes: "",
  },
  {
    value: "low-carb",
    name: "Low Carb",
    includes:
      "foods rich in protein and fat and limit the amount of refined carbohydrates you eat, favoring complex carbohydrates such as vegetables, fruits and some grains.",
    excludes: "",
  },
];

export { ACTIVITY_OPTIONS, GENDER_OPTIONS, GOAL_OPTIONS, FOOD_PREFERENCES };
