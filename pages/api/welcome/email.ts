import { db } from "@/services/firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
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

    const docRef = collection(db, "email");
    await addDoc(docRef, {
      to: [emailAddress],
      message: {
        subject: "Welcome to Nutrition Plans!",
        text: "This is the plaintext section of the email body.",
        html: "Thanks for signing up for Nutrition Plans, the app that helps you to achieve your nutrition goals!",
      },
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
