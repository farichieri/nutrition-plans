import { Result } from "@/types";
import { db } from "@/services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Tours, User } from "@/features/authentication";

const postSeenTour = async ({
  user,
  tour,
}: {
  user: User;
  tour: keyof Tours;
}): Promise<Result<User, unknown>> => {
  try {
    const userRef = doc(db, "users", user.id);
    const fields = {
      tours: {
        ...user.tours,
        [tour]: true,
      },
    };
    await updateDoc(userRef, fields);
    return { result: "success", data: user };
  } catch (error) {
    console.log("postSeenTour", { error });
    return { result: "error", error };
  }
};

export default postSeenTour;
