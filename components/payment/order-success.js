"use client";

import { CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function PaymentSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center  bg-gray-50 px-4 pt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center gap-6 max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-700">
          Thank you for shopping with us. Your order has been placed
          successfully.
        </p>
        <button
          onClick={() => window.location.replace("/")}
          className="mt-4 flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition font-semibold"
        >
          <ShoppingCart className="w-5 h-5" /> Keep Shopping
        </button>
      </div>
    </main>
  );
}

export function PaymentFailedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-10 bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center gap-6 max-w-md w-full text-center">
        <XCircle className="w-20 h-20 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
        <p className="text-gray-700">
          Oops! Your payment could not be processed.
          <br />
          If any amount was deducted, it will be refunded to your account.
        </p>
        <button
          onClick={() => window.location.replace("/")}
          className="mt-4 flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition font-semibold"
        >
          <ShoppingCart className="w-5 h-5" /> Keep Shopping
        </button>
      </div>
    </main>
  );
}
