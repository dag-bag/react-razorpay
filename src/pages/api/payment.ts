import { NextApiRequest, NextApiResponse } from "next";
import shortid from "shortid";
import Razorpay from "razorpay";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const paymentCapture = 1;
  const [amount, currency] = [req.body.qty * 50, "INR"];

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture: paymentCapture,
  };

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    const response = await razorpay.orders.create(options);
    console.log(response);
    if (!response) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      mobile: req.body.mobile,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
