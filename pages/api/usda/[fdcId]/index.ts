import { NextApiRequest, NextApiResponse } from "next";

// Get request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { fdcId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const response = await fetch(
          `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${process.env.USDA_API_KEY}`
        );
        const data = await response.json();
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
