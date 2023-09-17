import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { getEmailToNewUser } from "@/features/emails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const emailAddress = req.body.emailAddress;
    const displayName = req.body.displayName;

    if (!requestMethod || requestMethod !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const name = displayName.split(" ")[0];
    const message = getEmailToNewUser(name);

    const docRef = collection(db, "email");
    await addDoc(docRef, {
      to: [emailAddress],
      message: message,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
