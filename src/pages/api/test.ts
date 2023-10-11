import { NextApiRequest, NextApiResponse } from "next";
import { writeToGoogleSheet } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await writeToGoogleSheet({
    mobile: req.body.mobile,
    tickets: req.body.tickets,
  });
  res.status(200).json({ message: "success" });
}
