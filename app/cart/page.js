import CartPage from "@/components/cart/cart";
import { getCart } from "@/lib/api/api";
export const dynamic = "force-dynamic";

export default async function Cart() {
  const cart = await getCart();
  return <CartPage cart={cart} />;
}
