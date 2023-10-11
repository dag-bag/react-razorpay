import { NextApiRequest, NextApiResponse } from "next";
import { writeToGoogleSheet } from "@/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await writeToGoogleSheet({
    id: "order_Mmt8covrFqRbtZ",
    entity: "order",
    amount: 50000,
    amount_paid: 0,
    amount_due: 50000,
    currency: "INR",
    receipt: "-NLJDR0CT",
    offer_id: null,
    status: "created",
    attempts: 0,
    notes: [],
    created_at: 1697024807,
  });
  res.status(200).json({ message: "success" });
}
