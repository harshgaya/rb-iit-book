import ProductsPage from "@/components/product/products";

export default async function Page({ params }) {
  const slug = await params.slug;
  return <ProductsPage slug={slug} />;
}
