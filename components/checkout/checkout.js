"use client";

import Image from "next/image";
import { useState } from "react";
import AddressesPage from "../address/address-page";
import { getRazorpayOrderId } from "@/lib/api/api";

export default function CheckoutPage({ addresses, search }) {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const payWithRazorpay = async () => {
    const order = await getRazorpayOrderId({
      checkout_type: "single",
      product_id: search.product._id,
      quantity:
        search.search?.qty &&
        !isNaN(Number(search.qty)) &&
        Number(search.qty) > 0
          ? Number(search.qty)
          : 1,
    });
    console.log("Razorpay Order:", order);
    // order object from backend
    // { order_id, amount, currency, customerName, customerEmail, customerPhone }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key id
      amount: order.amount, // in paise
      currency: order.currency || "INR",
      name: "RB IIT-NEET Book",
      description: "Complete your purchase",
      order_id: order.order_id, // from backend
      handler: function (response) {
        // payment successful
        console.log("Payment Success:", response);
        // response.razorpay_payment_id
        // response.razorpay_order_id
        // response.razorpay_signature
        // TODO: Send these to your backend to verify signature
      },
      prefill: {
        name: order.customerName,
        email: order.customerEmail,
        contact: order.customerPhone,
      },
      theme: { color: "#FACC15" }, // yellow
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const validAddresses = Array.isArray(addresses) ? addresses : [];
  const qty =
    search?.qty && !isNaN(Number(search.qty)) && Number(search.qty) > 0
      ? Number(search.qty)
      : 1;

  // ✅ Build cartItems safely
  let cartItems = [];

  if (search?.type === "single") {
    if (search?.product) {
      cartItems = [
        {
          id: search.product._id || "unknown",
          title: search.product.title || "Untitled Product",
          price: Number(search.product.selling_price) || 0,
          quantity: qty,
          image: search.product.cover_image || "/books/default.jpg",
        },
      ];
    }
  } else if (search?.type === "cart") {
    if (Array.isArray(search?.cart) && search.cart.length > 0) {
      cartItems = search.cart.map((item) => ({
        id: item._id || "unknown",
        title: item.title || "Untitled Product",
        price: Number(item.selling_price) || 0,
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        image: item.cover_image || "/books/default.jpg",
      }));
    }
  }

  // ✅ Compute total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Payment method state
  const [paymentMethod, setPaymentMethod] = useState("online");

  // 🚨 Handle invalid cases
  if (!search?.type) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Invalid checkout request.
      </div>
    );
  }

  if (search.type === "single" && !search.productId) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Invalid product. Cannot proceed to checkout.
      </div>
    );
  }

  if (search.type === "cart" && cartItems.length === 0) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Your cart is empty.
      </div>
    );
  }

  if (validAddresses.length === 0) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        No addresses found. Please add a shipping address before checkout.
      </div>
    );
  }

  // ✅ Render checkout page if all valid
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Shipping Address */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Shipping Address
          </h2>
          <AddressesPage addresses={validAddresses} />
        </div>

        {/* Order Summary */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col gap-6 text-gray-900">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-4 border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm">x{item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold mt-4 border-t pt-4">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>

          {/* Payment Method */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="flex flex-col gap-2">
              {/* Online Payment */}
              <label className="flex items-center gap-2 text-gray-900">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-yellow-500"
                />
                <span>Online Payment</span>
              </label>

              {/* COD disabled */}
              <label className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  disabled
                  className="accent-gray-400"
                />
                <span>Cash on Delivery (Unavailable)</span>
              </label>
            </div>
          </div>

          {/* Place Order */}
          <button
            className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition text-lg font-semibold"
            onClick={() => {
              if (paymentMethod === "online") {
                payWithRazorpay();
              }
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
