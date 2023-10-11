import Script from "next/script";
import axios from "axios";
import { useRouter } from "next/router";

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

      <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white w-[300px] p-2 rounded-xl">
          <img src="logo.png" className="w-[100px] mx-auto" />
          <h2 className="text-xl mb-3 font-medium text-center">
            Buy Tickets for Mela
          </h2>
          <p className=" text-center text-sm mb-2 px-2 font-medium text-gray-500">
            Rotary Club Bareilly South welcomes you and your family to the
            Dusshera Mela. Use our secure gateway to buy your tickets and have a
            great time with your <br /> family and friends
          </p>
          <button
            onClick={handlePayment}
            className="w-full px-10 bg-blue-500 py-2.5 text-white rounded-xl font-medium"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </>
  );
}
