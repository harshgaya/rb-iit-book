import OrdersPage from "@/components/order/orders";
import { getOrders } from "@/lib/api/api";

export const dynamic = "force-dynamic";
export default async function Orders() {
  const orders = await getOrders();
  return <OrdersPage orders={orders} />;
}
