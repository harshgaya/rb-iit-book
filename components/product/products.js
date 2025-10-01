import { getProducts } from "@/lib/api/api";
import ProductTile from "./product-tile";
import { Book } from "lucide-react"; // Lucide icon for empty state

export default async function ProductsPage({ search }) {
  const products = await getProducts({ search });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Browse through our collection of books and resources. Click Add to Cart
        to start building your learning library.
      </p>

      {/* Products Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductTile key={product._id} book={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Book className="w-16 h-16 mb-4" /> {/* Lucide icon */}
          <p className="text-xl">No products found.</p>
        </div>
      )}
    </main>
  );
}
