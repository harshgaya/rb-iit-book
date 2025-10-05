import CheckoutPage from "@/components/checkout/checkout";
import { getUserAddress, getProductById, getCart } from "@/lib/api/api";

export default async function Checkout({ searchParams }) {
  const address = await getUserAddress();
  const search = await searchParams;

  // ✅ Validate incoming params
  const type = typeof search.type === "string" ? search.type : null;
  const productId =
    typeof search.productId === "string" && search.productId.length === 24
      ? search.productId
      : null;
  const qty = search.qty && !isNaN(Number(search.qty)) ? Number(search.qty) : 1;

  let product = null;
  let cart = null;

  if (type === "single" && productId) {
    try {
      product = await getProductById({ product_id: productId });
      if (!product) {
        console.warn("Invalid productId, product not found:", productId);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  } else if (type === "cart") {
    try {
      cart = await getCart();
      if (!cart || cart.length === 0) {
        console.warn("Cart is empty or could not be fetched");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }

  // ✅ Build safe object to pass
  const safeSearch = {
    type: type || "unknown",
    productId: productId || null,
    qty,
    product,
    cart,
  };

  return <CheckoutPage addresses={address} search={safeSearch} />;
}
