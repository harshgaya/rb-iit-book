import Product from "@/components/product/product";
import { getProductById } from "@/lib/api/api";

export default async function ProductPage({ params }) {
  const product = await getProductById({ product_id: params.slug });

  return <Product book={product} />;
}
