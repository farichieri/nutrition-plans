import * as yup from "yup";

const schema = yup.object({
  gender: yup.string().required("Gender is required"),
  centimeters: yup
    .number()
    .typeError("Height must be a number")
    .required("Height is required")
    .positive("Please enter a value greater than 0")
    .max(249, "Please enter a valid height in centimeters"),
  kilograms: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Please enter a value greater than 0")
    .max(500, "Please enter a valid weight in kilograms"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Please enter a value greater than 0")
    .max(100, "Please enter a valid age"),
  activity: yup.string().required("Activity is required"),
  pounds: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Please enter a value greater than 0")
    .max(500, "Please enter a valid weight in Pounds"),
  feet: yup
    .number()
    .typeError("Feet must be a number")
    .required("Feet is required")
    .positive("Please enter a value greater than 0")
    .max(8, "Please enter a valid height"),
  inches: yup
    .number()
    .typeError("Inches must be a number")
    .required("Inches are required")
    .min(0, "Please enter a positive number")
    .max(12, "Please enter a valid height"),
});

export { schema };
