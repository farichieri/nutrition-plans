import { Diet } from "@/features/plans";
import { adminDB } from "@/services/firebase/firebaseAdmin";
import { Result } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Diet, unknown>>
) {
  const { date, userID } = req.query;
  try {
    const docRes = await adminDB
      .collection("users")
      .doc(userID as string)
      .collection("diets")
      .doc(date as string)
      .get();

    const dietData = docRes.data();
    const diet: Diet = (dietData as Diet) || {};
    return res.status(200).json({ result: "success", data: diet });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ result: "error", error });
  }
}
