import { Options } from "@/types";

const generateOptions = (array: string[]): Options => {
  return array.map((val) => {
    return { value: val, text: val };
  });
};

export { generateOptions };
