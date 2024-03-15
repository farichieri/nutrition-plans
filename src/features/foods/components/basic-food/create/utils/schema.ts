import { FoodTypesEnum } from "@/features/foods/types";
import { PlansEnum } from "@/types";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Food Name is required"),
  // description: yup.string().required("Food Description is required"),
  servingName: yup.string().required("Scale Name is required"),
  servingGrams: yup
    .number()
    .typeError("Amount must be a number")
    .required("Equivalent Weight In Grams is required")
    .positive("Please enter a value greater than 0"),
  category: yup.string().required("Food Category is required"),
  nutrients: yup.object().shape({
    calories: yup
      .number()
      .typeError("Amount must be a number")
      .required("Calories are required")
      .min(0, "Please enter a positive value"),
    fats: yup
      .number()
      .typeError("Amount must be a number")
      .required("Fats are required")
      .min(0, "Please enter a positive value"),
    carbohydrates: yup
      .number()
      .typeError("Amount must be a number")
      .required("Carbohydrates are required")
      .min(0, "Please enter a positive value"),
    proteins: yup
      .number()
      .typeError("Amount must be a number")
      .required("Proteins are required")
      .min(0, "Please enter a positive value"),
  }),
  imageURL: yup.string().required("Please choose an image for this food"),
  type: yup
    .object()
    .test(
      "oneOfRequired",
      "Please Select at least one Food Type",
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
});

export { schema };
