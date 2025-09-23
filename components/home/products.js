import { getHomepageProducts } from "@/lib/api/api";
import ProductTile from "../product/product-tile";

export default async function ProductsHome() {
  const popularBooks = await getHomepageProducts();
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Popular Books</h1>
        <p className="text-gray-600 text-lg">
          Explore our carefully curated collection of books for Olympiad,
          IIT-JEE, and NEET preparation. High quality, affordable, and designed
          to boost your success.
        </p>
      </section>

      {/* Books Grid */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {popularBooks.map((book) => (
            <div
              key={book._id}
              className="transform hover:scale-105 transition duration-300"
            >
              <ProductTile book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center mt-16 bg-yellow-50 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Get Your Books Today
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of students who trust RB Books for their preparation.
          Buy now and start learning immediately!
        </p>
        <button className="bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Explore All Books
        </button>
      </section>
    </main>
  );
}
