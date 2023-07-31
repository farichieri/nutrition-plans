import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebase.config";
import { Food } from "@/features/foods";
import { NextApiRequest, NextApiResponse } from "next";
import { getScalesWithPrimaryScales } from "@/features/foods/utils/scalesUtils";
import { User } from "@/features/authentication";

// Custom function to make changes to the database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach(async (snapShot) => {
    //   const data = snapShot.data() as User;
    //   updateDoc(doc(db, "users", snapShot.id), {
    //     ratings: {
    //       foodsRating: {
    //         favorites: [],
    //         likes: [],
    //         dislikes: [],
    //       },
    //       mealsRating: {
    //         favorites: [],
    //         likes: [],
    //         dislikes: [],
    //       },
    //       plansRating: {
    //         favorites: [],
    //         likes: [],
    //         dislikes: [],
    //       },
    //     },
    //   });
    // });
    // return res.status(200).json({ message: "success" });
    return res.redirect(307, "/app");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
