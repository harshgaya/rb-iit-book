import { getProductByClass, getProducts } from "@/lib/api/api";
import ProductTile from "./product-tile";
import { Book } from "lucide-react"; // Lucide icon for empty state

export default async function ProductsPage({ search, slug }) {
  console.log("ProductsPage received - search:", search, "slug:", slug);
  let products = [];
  if (slug) {
    products = await getProductByClass({ className: slug });
  } else {
    products = await getProducts({ search });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Explore Our Books
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Browse premium academic books for Class 6–10. Perfect for students,
        schools & bulk orders.
      </p>

      {/* IF PRODUCTS EXIST */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductTile key={product._id} book={product} />
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Book className="w-16 h-16 mb-4 opacity-40" />
          <p className="text-xl font-medium">No books found</p>
          <p className="text-sm mt-2">Try another class or search</p>
        </div>
      )}
    </main>
  );
}
