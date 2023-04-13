import { db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, deleteUser } from "firebase/auth";
import { UserAccount } from "@/types/types";

const createNewUser = async (user: User) => {
  try {
    const newUserRef = doc(db, "users", user.uid);
    const newUser: UserAccount = {
      created_at: user.metadata.creationTime,
      display_name: user.displayName || "",
      email_address: user.email,
      gender: null,
      height: null,
      is_premium: false,
      lang: "en",
      photo_url: user.photoURL,
      plan_selected: null,
      premium_plan: "free",
      user_id: user.uid,
      weight_goal: null,
      weight: null,
    };
    await setDoc(newUserRef, newUser);
  } catch (error) {
    await deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
    throw Error("Error creating user");
  }
};

const generateUserObject = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    console.log('getDoc: doc(db, "users", user.uid)');
    const querySnapshot = await getDoc(userRef);
    const userData = querySnapshot.data();
    if (userData) {
      // If I need to add something else from the User (google) object, I can add it here.
      const userAccount: UserAccount = {
        created_at: userData.created_at,
        display_name: userData.display_name,
        email_address: userData.email_address,
        gender: userData.gender,
        height: userData.height,
        is_premium: userData.is_premium,
        lang: userData.lang,
        photo_url: userData.photo_url,
        premium_plan: userData.premium_plan,
        user_id: userData.user_id,
        weight_goal: userData.weight_goal,
        weight: userData.weight,
        plan_selected: userData.plan_selected,
      };
      return userAccount || null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createNewUser, generateUserObject };
