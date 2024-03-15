import * as yup from "yup";

const schema = yup.object({
  planSelected: yup.string().required("Please select 1 Plan"),
});

export { schema };
