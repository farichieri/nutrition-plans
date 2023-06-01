import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebase.config";
import { Diet } from "@/features/plans";
import { Food, FoodGroupArray } from "@/features/foods";
import { maxComplexity } from "../components/utils";
import { PlansEnum, Result } from "@/types";
import { UserAccount } from "@/features/authentication";
import { UserMeal } from "@/features/meals";

const createDiet = async (diet: Diet, user: UserAccount) => {
  try {
    if (!diet.diet_name) return;
    const docRef = doc(collection(db, "diets"));

    const newDiet: Diet = {
      ...diet,
      date_created: serverTimestamp(),
      diet_id: docRef.id,
      diet_name_lowercase: diet.diet_name.toLowerCase(),
      diet_nutrients: { ...diet.diet_nutrients },
      uploader: user.user_id,
    };
    console.log({ newDiet });
    await setDoc(docRef, newDiet);
    console.log("Diet created: ", newDiet);
    return { diet_id: docRef.id };
  } catch (error) {
    console.log({ error });
    return { error: `Error creating Food: ${error}` };
  }
};

const fetchDietByPlanAndDate = async ({
  date,
  planID,
  user,
}: {
  date: string;
  planID: PlansEnum;
  user: UserAccount;
}) => {
  console.log(`Fetching Diet by date: '${date}' for user ${user.user_id}`);
  try {
    const docRef = doc(
      db,
      "users",
      user.user_id,
      "plans",
      planID,
      "diets",
      date
    );
    const querySnapshot = await getDoc(docRef);
    const data: any = querySnapshot.data();
    console.log({ data });
    return data;
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return null;
  }
};

const fetchRandomDietByPlan = async ({ plan }: { plan: PlansEnum }) => {
  console.log(`Fetching Random Diet by plan: '${plan}'`);
  try {
    let data: Diet | null = null;
    const dietsRef = collection(db, "diets");
    let q = query(
      dietsRef,
      where(`compatible_plans.${plan}`, "==", true),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((food: any) => {
      data = food.data();
    });
    console.log({ data });
    return data;
  } catch (error) {
    console.log({ error: `Error fetching Food: ${error}` });
    return null;
  }
};

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
}) => {
  try {
    console.log("postDietToUserDiets");
    if (!diet.diet_id) return { error: "No diet_id provided" };
    const docRef = doc(
      db,
      "users",
      user.user_id,
      "plans",
      planID,
      "diets",
      date
    );

    const newDiet: Diet = {
      ...diet,
      plan_date: date,
      plan_id: planID,
    };
    await setDoc(docRef, newDiet);
    console.log("Diet posted: ", newDiet);
    return { newDiet };
  } catch (error) {
    console.log({ error });
    return { error: `Error creating Food: ${error}` };
  }
};

const fetchRandomFoodByPlan = async (
  plan: PlansEnum,
  userMeal: UserMeal
): Promise<Result<Food, unknown>> => {
  try {
    let data: Food | null = null;
    const docRef = collection(db, "foods");
    const complexity = userMeal.complexity;
    const max_complexity = maxComplexity(complexity);

    let q = query(
      docRef,
      where(`compatible_plans.${plan}`, "==", true),
      where("complexity", ">=", complexity),
      where("complexity", "<", max_complexity),
      orderBy("complexity")
    );

    const fetchMatchingFoods = async (q_selected: any) => {
      const matchingFoods: FoodGroupArray = [];
      const querySnapshot = await getDocs(q_selected);
      querySnapshot.forEach((food: any) => {
        const res = food.data();
        if (res) {
          matchingFoods.push(res);
        }
      });
      return matchingFoods;
    };

    const filterMatchingFoods = (
      matchingFoods: FoodGroupArray
    ): FoodGroupArray => {
      let foodsFiltered = matchingFoods;
      // cook
      if (!userMeal.cook) {
        foodsFiltered = matchingFoods.filter((food) => {
          if (food.cook_time < 1) return food;
        });
      }
      // time
      foodsFiltered = foodsFiltered.filter((food) => {
        const available_time = food.prep_time + food.cook_time;
        if (available_time < userMeal.time) return food;
      });
      // size
      return foodsFiltered;
    };

    const chooseOne = (foodsFiltered: FoodGroupArray): Food => {
      const length = foodsFiltered.length;
      const randomIndex = Math.floor(length * Math.random());
      return foodsFiltered[randomIndex];
    };

    const matchingFoods = await fetchMatchingFoods(q);
    const matchingFoodsFiltered = filterMatchingFoods(matchingFoods);
    const matchingFood = chooseOne(matchingFoodsFiltered);
    if (!matchingFood) {
      data = chooseOne(matchingFoods);
    } else {
      data = matchingFood;
    }

    if (!data) throw new Error("No foods fetched");
    return { result: "success", data };
  } catch (error) {
    console.log(`Error fetching Food: ${error}`);
    return { result: "error", error };
  }
};

export {
  createDiet,
  fetchDietByPlanAndDate,
  fetchRandomDietByPlan,
  postDietToUserDiets,
  fetchRandomFoodByPlan,
};
