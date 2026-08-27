import { listBooks } from "@/lib/server/bookService";
import { serialize } from "@/lib/server/serialize";
import ProductTile from "./product-tile";
import { Book } from "lucide-react";

// `slug` comes from /products/[slug] (Foundation nav -> exact class match).
// `search`, `subject`, `category` come from /products?search=...&subject=...
export default async function ProductsPage({ search, slug, subject, category }) {
  const { items } = await listBooks({
    class: slug || undefined,
    search: search || undefined,
    subject: subject || undefined,
    category: category || undefined,
  });
  const products = serialize(items);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Explore Our Books
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Browse premium academic books for Class 6–10. Perfect for students,
        schools & bulk orders.
      </p>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductTile key={product._id} book={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Book className="w-16 h-16 mb-4 opacity-40" />
          <p className="text-xl font-medium">No books found</p>
          <p className="text-sm mt-2">Try another class or search</p>
        </div>
      )}
    </main>
  );
}
