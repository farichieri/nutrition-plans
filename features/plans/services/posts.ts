import { db } from "@/services/firebase/firebase.config";
import { Diet, DietMealGroup } from "@/features/plans";
import { doc, setDoc } from "firebase/firestore";
import { getToday } from "@/utils/dateFormat";
import { PlansEnum, Result } from "@/types";
import { UserAccount } from "@/features/authentication";

const postDietToUserDiets = async ({
  diet,
  planID,
  date,
  user,
}: {
  diet: Diet;
  planID: PlansEnum;
  date: string;
  user: UserAccount;
}): Promise<Result<Diet, unknown>> => {
  try {
    const docRef = doc(db, "users", user.user_id, "diets", date);
    const dietID = docRef.id;

    let dietMeals: DietMealGroup = {};
    for (let key in diet.diet_meals) {
      dietMeals[key] = {
        ...diet.diet_meals[key],
        diet_id: dietID,
      };
    }

    let newDiet: Diet = {
      ...diet,
      plan_date: date,
      plan_id: planID,
      diet_id: dietID,
      user_id: user.user_id,
      date_created: getToday(),
      diet_meals: dietMeals,
      diet_nutrition: { ...diet.diet_nutrition },
    };

    await setDoc(docRef, newDiet);

    return { result: "success", data: newDiet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

const updateDiet = async ({
  diet,
}: {
  diet: Diet;
}): Promise<Result<Diet, unknown>> => {
  try {
    if (!diet.user_id || !diet.diet_id) throw new Error("Invalid diet fields");
    const docRef = doc(db, "users", diet.user_id, "diets", diet.diet_id);

    diet = {
      ...diet,
      diet_nutrition: { ...diet.diet_nutrition },
    };
    await setDoc(docRef, diet);

    return { result: "success", data: diet };
  } catch (error) {
    return { result: "error", error };
  }
};

export { postDietToUserDiets, updateDiet };
