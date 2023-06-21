import { formatISO, parse } from "date-fns";
import { ProgressArray } from "../types";

const sortProgress = (data: ProgressArray): ProgressArray => {
  return data.sort((a, b) => {
    const first = formatISO(parse(String(a.date), "MM-dd-yyyy", new Date()));
    const second = formatISO(parse(String(b.date), "MM-dd-yyyy", new Date()));
    return first.localeCompare(second);
  });
};

export { sortProgress };
