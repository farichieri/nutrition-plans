import { NextApiRequest, NextApiResponse } from "next";

// Custom function to make changes to the database
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach(async (userDoc) => {
    //   updateDoc(doc(db, "users", userDoc.id), {
    //     newsletter: NewsletterChoices.yes,
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
