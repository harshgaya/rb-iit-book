import Image from "next/image";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "NEET Aspirant",
      message:
        "RP Books has been a game changer in my preparation. The biology material is so well structured and easy to revise!",
      image: "/home/img.jpg",
    },
    {
      name: "Priya Singh",
      role: "Parent of IIT Student",
      message:
        "Affordable and high-quality books. My son used RP Books for IIT-JEE and scored excellent marks.",
      image: "/home/parent-img.jpeg",
    },
    {
      name: "Rahul Mehta",
      role: "Olympiad Gold Medalist",
      message:
        "The Olympiad books are concise, challenging, and exactly what I needed to practice. Highly recommend RP Books!",
      image: "/home/rahul-mehta.jpg",
    },
    {
      name: "Sneha Verma",
      role: "NEET Student",
      message:
        "Best investment I made! The question banks helped me clear my doubts and improve my confidence.",
      image: "/home/sneha verma.png",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50 py-16 px-6">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          What Our Students & Parents Say
        </h1>
        <p className="text-gray-700 text-lg">
          Hear from those who trusted RP Books for their Olympiad, IIT, and NEET
          preparation.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={t.image}
                alt={t.name}
                fill
                sizes="96px"
                className="rounded-full object-cover border-4 border-yellow-400"
              />
            </div>
            <p className="text-gray-700 italic mb-4">“{t.message}”</p>
            <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </section>

      {/* Closing Note */}
      <section className="max-w-3xl mx-auto text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Success, Our Mission
        </h2>
        <p className="text-gray-700 text-lg">
          Join thousands of students and parents who have chosen RP Books for
          their preparation journey. Start today and experience the difference.
        </p>
      </section>
    </main>
  );
}
