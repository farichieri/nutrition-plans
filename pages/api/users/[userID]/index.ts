import { User } from "@/features/authentication";
import { adminDB } from "@/services/firebase/firebaseAdmin";
import { Result } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<User, unknown>>
) {
  const { userID } = req.query;
  try {
    const userRes = await adminDB
      .collection("users")
      .doc(userID as string)
      .get();
    const userData = userRes.data();
    const userAccount: User = (userData as User) || {};
    return res.status(200).json({ result: "success", data: userAccount });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ result: "error", error });
  }
}
