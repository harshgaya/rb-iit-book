"use client";

import Image from "next/image";
import dayjs from "dayjs";

export default function OrderItem({ order }) {
  const renderProduct = (product) => (
    <div
      key={product.product_id}
      className="flex items-center gap-4 mb-2 last:mb-0"
    >
      <div className="relative w-16 h-16">
        <Image
          src={product.image || "/placeholder.png"} // fallback image
          alt={product.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{product.name}</p>
        <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
        <p className="text-gray-700 font-medium">
          ₹{product.price * product.quantity}
        </p>
      </div>
    </div>
  );

  // Determine delivery status
  const deliveryStatus =
    order.delivery_status === null || order.delivery_status === undefined
      ? "Processing"
      : order.delivery_status;

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      {/* Order header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
        <p className="text-gray-600 text-sm">
          {dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}
        </p>
      </div>

      {/* Render products */}
      <div className="mb-4">
        {order.checkout_type === "single"
          ? renderProduct(order.product)
          : order.cart_items.map((item) => renderProduct(item))}
      </div>

      {/* Order summary */}
      <div className="flex justify-between items-center pt-2 border-t">
        <p className="font-medium text-gray-800">
          Delivery Status: {deliveryStatus}
        </p>
        <p className="font-bold text-gray-800">Total: ₹{order.amount}</p>
      </div>
    </div>
  );
}
