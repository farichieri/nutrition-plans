import { db } from "@/services/firebase/firebase.config";
import { Diet, DietMealGroup } from "@/features/plans";
import { doc, setDoc } from "firebase/firestore";
import { getToday } from "@/utils/dateFormat";
import { PlansEnum, Result } from "@/types";
import { User } from "@/features/authentication";

const postDietToUserDiets = async ({
  diet,
  planID,
  date,
  user,
}: {
  diet: Diet;
  planID: PlansEnum;
  date: string;
  user: User;
}): Promise<Result<Diet, unknown>> => {
  try {
    const docRef = doc(db, "users", user.id, "diets", date);
    const dietID = docRef.id;

    let dietMeals: DietMealGroup = {};
    for (let key in diet.meals) {
      dietMeals[key] = {
        ...diet.meals[key],
        dietID: dietID,
      };
    }

    let newDiet: Diet = {
      ...diet,
      date: date,
      planID: planID,
      id: dietID,
      userID: user.id,
      dateCreated: getToday(),
      meals: dietMeals,
      nutrients: { ...diet.nutrients },
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
    if (!diet.userID || !diet.id) throw new Error("Invalid diet fields");
    const docRef = doc(db, "users", diet.userID, "diets", diet.id);

    diet = {
      ...diet,
      nutrients: { ...diet.nutrients },
    };
    await setDoc(docRef, diet);

    return { result: "success", data: diet };
  } catch (error) {
    console.log({ error });
    return { result: "error", error };
  }
};

export { postDietToUserDiets, updateDiet };
