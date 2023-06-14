import { FoodTypesEnum } from "@/features/foods/types";
import { PlansEnum } from "@/types";
import * as yup from "yup";

const schema = yup.object({
  food_name: yup.string().required("Recipe Name is required"),
  food_description: yup.string().required("Recipe Description is required"),
  food_category: yup.string().required("Recipe Category is required"),
  dish_type: yup.string().required("Recipe Category is required"),
  image: yup.string().required("Please choose an image for this food"),
  prep_time: yup
    .number()
    .typeError("Amount must be a number")
    .required("Prep Time is required")
    .min(0, "Please enter a positive value"),
  cook_time: yup
    .number()
    .typeError("Amount must be a number")
    .required("Cook Time is required")
    .min(0, "Please enter a positive value"),
  serving_amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Yields are required")
    .min(0, "Please enter a positive value"),
  food_type: yup
    .object()
    .test(
      "oneOfRequired",
      "Please Select at least one Recipe Type",
      (item: any) => {
        let result = false;
        Object.keys(FoodTypesEnum).forEach((type) => {
          if (item[type] === true) {
            result = true;
          }
        });
        return result;
      }
    ),
  compatible_plans: yup
    .object()
    .test(
      "oneOfRequired",
      "Please Select at least one Compatible Plan",
      (item: any) => {
        let result = false;
        Object.keys(PlansEnum).forEach((type) => {
          if (item[type] === true) {
            result = true;
          }
        });
        return result;
      }
    ),
  ingredients: yup
    .object()
    .test(
      "ingredientsRequired",
      "Please Add at least one Ingredient",
      (items: any) => {
        let result = false;
        if (Object.keys(items).length > 1) {
          result = true;
        }
        return result;
      }
    ),
});

export { schema };
