import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { getMessageToNewsletterSubscriber } from "@/features/emails";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const emailAddress = req.body.emailAddress;

    if (!requestMethod || requestMethod !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const message = getMessageToNewsletterSubscriber();

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
