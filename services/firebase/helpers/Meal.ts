// import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
// import { db } from "../firebase.config";
// import { UserAccount } from "@/features/authentication";

// const addMeal = async (meal: Meal, user: UserAccount) => {
//   try {
//     const docRef = doc(collection(db, "foods"));
//     const newmeal: Meal = {
//       ...meal,
//       date_created: serverTimestamp(),
//       meal_id: docRef.id,
//       meal_name_lowercase: meal.meal_name.toLowerCase(),
//       nutrients: { ...meal.nutrients },
//       uploader: user.user_id,
//       // num_meals:
//     };
//     console.log({ newmeal });
//     await setDoc(docRef, newmeal);
//     console.log("Meal created: ", newmeal);
//     return { food_id: docRef.id };
//   } catch (error) {
//     console.log({ error });
//     return { error: `Error creating Food: ${error}` };
//   }
// };

// export { addMeal };
