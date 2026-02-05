export default function WhyRPBooksPage() {
  const features = [
    {
      title: "Trusted by Students",
      desc: "Over 2 million students and parents trust RP Books for Olympiad, IIT, and NEET preparation.",
      icon: "✅",
    },
    {
      title: "Expertly Curated Content",
      desc: "All books are written and reviewed by top educators and subject matter experts.",
      icon: "📘",
    },
    {
      title: "Affordable & Accessible",
      desc: "Quality education should not be expensive. Our books are priced for every student.",
      icon: "💰",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver books quickly and reliably across India, wherever you are.",
      icon: "🚚",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Why RP Books?</h1>
        <p className="text-gray-600 text-lg">
          RP Books is your trusted partner for Olympiad, IIT, and NEET
          preparation. Here’s why students, parents, and teachers choose us:
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-8 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Closing Note */}
      <section className="max-w-3xl mx-auto text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          More than just books
        </h2>
        <p className="text-gray-600">
          At RP Books, we believe in empowering students with the right
          resources at the right time. Whether it’s Olympiad, IIT, or NEET, our
          mission is to make your preparation smooth, affordable, and effective.
        </p>
      </section>
    </main>
  );
}
