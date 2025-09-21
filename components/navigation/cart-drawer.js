import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShoppingCart, X, Package } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartDrawer({ cartItems = [] }) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const cartCount = cartItems.length;

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768); // md breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleCartClick = () => {
    if (isDesktop) {
      setOpen(true);
    } else {
      window.location.href = "/cart";
    }
  };

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={handleCartClick}
        className="relative flex items-center hover:text-yellow-500"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
          {cartCount}
        </span>
      </button>

      {/* Drawer (Desktop only) */}
      <Transition show={open}>
        <Dialog onClose={() => setOpen(false)} className="relative z-50">
          {/* Backdrop */}
          <TransitionChild
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/40" />
          </TransitionChild>

          {/* Drawer Panel */}
          <div className="fixed inset-0 flex justify-end text-black">
            <TransitionChild
              enter="transition transform ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition transform ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-full max-w-md bg-white shadow-xl h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cartCount === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <Package className="w-12 h-12 mb-2" />
                      <p>No items in your cart</p>
                      <Link
                        href="/products"
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                      >
                        Shop Now
                      </Link>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">
                              ₹{item.price}
                            </p>
                          </div>
                          <span className="text-sm text-gray-700">
                            x{item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer */}
                {cartCount > 0 && (
                  <div className="p-4 border-t">
                    <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition">
                      Checkout
                    </button>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
