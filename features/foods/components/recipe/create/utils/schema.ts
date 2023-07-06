import { FoodTypesEnum } from "@/features/foods/types";
import { PlansEnum } from "@/types";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Recipe Name is required"),
  description: yup.string().required("Recipe Description is required"),
  category: yup.string().required("Recipe Category is required"),
  dishType: yup.string().required("Recipe Category is required"),
  image: yup.string().required("Please choose an image for this food"),
  prepTime: yup
    .number()
    .typeError("Amount must be a number")
    .required("Prep Time is required")
    .min(0, "Please enter a positive value"),
  cookTime: yup
    .number()
    .typeError("Amount must be a number")
    .required("Cook Time is required")
    .min(0, "Please enter a positive value"),
  servingAmount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Yields are required")
    .min(0, "Please enter a positive value"),
  type: yup
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
  compatiblePlans: yup
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
