import * as yup from "yup";

const schema = yup.object({
  goalSelected: yup.string().required("Please select your goal"),
});

export { schema };
