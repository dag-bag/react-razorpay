import Script from "next/script";
import axios from "axios";
import { useRouter } from "next/router";
import { writeToGoogleSheet } from "@/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const { query } = useRouter();
  console.log(query);
  const getDataFromServer = async () => {
    const { data } = await axios.post("/api/payment", query);
    return data;
  };

  const handlePayment = () => {
    getDataFromServer().then((data) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: "Sample Transaction",
        description: "Test Transaction",
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="items-center lg:p-20 p-5 justify-center">
        <div className="border h-full flex lg:flex-row flex-col">
          <div className="p-10 prose prose-sm max-w-none w-full lg:w-1/2 h-full flex flex-col">
            <button
              className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePayment}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
