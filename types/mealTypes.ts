import {
  NewFoodNutrients,
  NewFoodCompatiblePlans,
  NewFoodType,
} from "./initialTypes";
import {
  FoodGroup,
  FoodNutrients,
  FoodType,
  Ingredient,
  IngredientGroup,
} from "./foodTypes";
import { CompatiblePlans } from "./foodTypes";

export interface Meal {
  compatible_plans: CompatiblePlans;
  date_created: any | null;
  food_type: FoodType;
  foods: IngredientGroup;
  meal_description: string;
  meal_id: string;
  meal_name_lowercase: string;
  meal_name: string;
  nutrients: FoodNutrients;
  user_id: string;
  uploader: string;
}

// Initials
export const NewMeal: Meal = {
  compatible_plans: NewFoodCompatiblePlans,
  date_created: "",
  food_type: NewFoodType,
  foods: {},
  meal_description: "",
  meal_id: "",
  meal_name_lowercase: "",
  meal_name: "",
  nutrients: NewFoodNutrients,
  uploader: "",
  user_id: "",
};

// const MEAL_PLAN_DAY_EXAMPLE = {
//   date_created: "xxxxxxxxxxx",
//   plan_id: "balanced",
//   num_meals: 4,
//   meal_plan_id: "ASDKLXL7893425XM",
//   meals: {
//     1: {
//       meal_id: "ASKLDJALSKDJKAS",
//       foods: {
//         Cbgaj8C9KitFtWMFVSk1: {
//           food_id: "Cbgaj8C9KitFtWMFVSk1",
//           amount: 1,
//           weight_name: "serving",
//         },
//         F8gT3VIxiieQ0WP8Pt9u: {
//           meal_id: "F8gT3VIxiieQ0WP8Pt9u",
//           amount: 1,
//           weight_name: "serving",
//         },
//       },
//     },
//     2: {
//       meal_id: "ASKLDJALSK123123DJKAS",
//       foods: {
//         VxOrF4McQZOxGAJ1M9NF: {
//           meal_id: "VxOrF4McQZOxGAJ1M9NF",
//           amount: 1,
//           weight_name: "serving",
//         },
//       },
//     },
//     3: {
//       meal_id: "ASKLDJALSKDJKEEEEEAS",
//       foods: {
//         QMc305KQeDBWmgoQDd6y: {
//           food_id: "QMc305KQeDBWmgoQDd6y",
//           amount: 1,
//           weight_name: "serving",
//         },
//       },
//     },
//     4: {
//       meal_id: "ASKLDJALSKDJKAS",
//       foods: {
//         khjj4zFUJLb6on0bu8O4: {
//           food_id: "khjj4zFUJLb6on0bu8O4",
//           amount: 1,
//           weight_name: "serving",
//         },
//       },
//     },
//   },
// };
