// Create a new file, e.g., webhook.js, in your Next.js API routes directory
// For example: pages/api/webhook.js

import { writeToGoogleSheet } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Parse the JSON payload received from the webhook
      const data = req.body;
      try {
        // await writeToGoogleSheet({
        //   mobile: req.body.mobile,
        //   tickets: req.body.tickets,
        // });
      } catch (error) {
        throw new Error("Something went wrong");
      }

      // Perform any additional verification or validation of the webhook data here
      // Verify the authenticity of the webhook event (e.g., using Razorpay's signature)

      // Handle the webhook event
      if (data.event === "payment.captured") {
        // Payment has been successfully captured
        // You can perform any additional actions here (e.g., updating the order status)

        console.log("Payment successfully captured:", data);

        // Respond with a 200 OK status to acknowledge receipt of the webhook
        res.status(200).end();
      } else {
        // Handle other types of webhook events as needed
        console.log("Received a webhook event:", data);

        // Respond with a 200 OK status to acknowledge receipt of the webhook
        res.status(200).end();
      }
    } catch (error) {
      console.error("Error handling webhook:", error);
      res.status(500).json({ message: "Error handling webhook" });
    }
  } else {
    // Handle non-POST requests (if any)
    res.status(405).json({ message: "Method not allowed" });
  }
}
