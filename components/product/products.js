"use client";

import ProductTile from "./product-tile";

// Dummy products data
const products = [
  {
    id: 1,
    title: "Physics Olympiad Guide",
    price: 499,
    cuttedPrice: 699,
    image: "/books/book-1.jpg",
  },
  {
    id: 2,
    title: "Chemistry for IIT",
    price: 599,
    cuttedPrice: 799,
    image: "/books/book-1.jpg",
  },
  {
    id: 3,
    title: "Biology NEET Prep",
    price: 399,
    cuttedPrice: 599,
    image: "/books/book-1.jpg",
  },
  {
    id: 4,
    title: "Math Olympiad Workbook",
    price: 450,
    cuttedPrice: 650,
    image: "/books/book-1.jpg",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Explore Our Products
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Browse through our collection of books and resources. Click Add to Cart
        to start building your learning library.
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductTile key={product.id} book={product} />
        ))}
      </div>
    </main>
  );
}
