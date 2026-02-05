import ProductsPage from "@/components/product/products";

export default async function Products({ searchParams }) {
  const search = (await searchParams?.search) || null;

  return <ProductsPage search={search} />;
}
