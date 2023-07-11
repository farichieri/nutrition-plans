import { Result } from "@/types";
import { User } from "../types";

const getUserData = async ({
  userID,
}: {
  userID: string;
}): Promise<Result<User, unknown>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
      }
    );
    const data = await res.json();
    return { result: "success", data };
  } catch (error) {
    return { result: "error", error };
  }
};

export { getUserData };
