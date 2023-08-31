import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { NextApiRequest, NextApiResponse } from "next";

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

    const docRef = collection(db, "email");
    await addDoc(docRef, {
      to: [emailAddress],
      message: {
        subject: "Welcome to nutritionplans.co!",
        html: `<p>Hi ${name},</p>
        <p>I'm Fabricio, Founder of <a href="https://www.nutritionplans.co" target="_blank">nutritionplans.co</a>. Just wanted to reach out and introduce myself.</p>
        <p>Would you like to tell me about your expectations with our website?</p>
        <p>Best regards</p>
        <br>
        <p>Fabricio Richieri</p>
        `,
      },
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
