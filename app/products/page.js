import ProductsPage from "@/components/product/products";

export default async function Products({ searchParams }) {
  const params = await searchParams;
  return (
    <ProductsPage
      search={params?.search || null}
      subject={params?.subject || null}
      category={params?.category || null}
    />
  );
}
