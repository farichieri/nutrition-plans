import { getThisWeekInterval } from "@/utils/dateFormat";
import { DietGroup } from "../types";
import { getDiets } from "./getDiets";
import { Result } from "@/types";
import { User } from "@/features/authentication";

const getThisWeekDiets = async ({
  user,
}: {
  user: User;
}): Promise<Result<DietGroup, unknown>> => {
  try {
    const { startOfWeek, id } = user;
    const dates = getThisWeekInterval({ userStartOfWeek: startOfWeek });
    const res = await getDiets({ dates, userID: id });

    if (res.result === "error") throw res.error;

    return { result: "success", data: res.data };
  } catch (error) {
    console.error(error);
    return { result: "error", error };
  }
};

export { getThisWeekDiets };
