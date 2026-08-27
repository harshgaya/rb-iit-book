import Product from "@/components/product/product";
import { getBookById } from "@/lib/server/bookService";
import { serialize } from "@/lib/server/serialize";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getBookById(slug);

  return <Product book={product ? serialize(product) : null} />;
}
