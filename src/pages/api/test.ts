import { NextApiRequest, NextApiResponse } from "next";
import { writeToGoogleSheet } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await writeToGoogleSheet({
    mobile: 8766203976,
    tickets: ["www.h.com"],
  });
  res.status(200).json({ message: "success" });
}
