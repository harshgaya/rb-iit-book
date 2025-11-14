"use client";
import Image from "next/image";
import { useState } from "react";
import ModalHeadlessUi from "../modal/headless-ui-modal";
import EnrollForm from "./enroll-form";

export default function AboutUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEnrollClick() {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#FFDD57] text-gray-900 py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide">
          About Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          “Dreams are not what we sleep and perceive, but those that we perceive
          wide awake.”
        </p>
      </section>

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 py-16">
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl font-bold text-white">
            Welcome to The RB IIT Academy
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A wise person once observed, “Dreams are not what we sleep and
            perceive, but those that we perceive wide awake.” There is just one
            name to remember for anyone planning to make their ambitions come
            true: The RB IIT Academy. We wholeheartedly welcome all aspiring IIT
            students to participate in our proven educational pedagogy, reap the
            rewards, and gain recognition for themselves, their parents, and
            their mentors.
          </p>
        </div>

        <div className="md:w-1/2">
          <Image
            src="/about/rbiit-photo-1.jpg"
            alt="RB IIT Academy"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
      </section>

      {/* Academy Overview */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 bg-gray-50 px-6 md:px-20 py-16">
        <div className="md:w-1/2 space-y-5">
          <p className="text-gray-700 leading-relaxed">
            Today’s student body faces a slew of academic problems that call
            into question their ability to rise to the occasion even in the most
            dire of circumstances. The IIT fever has permeated the academic
            mainstream to such an extent that there is a gate-crashing rush
            among students anxious to get into the IIT. RB IIT Academy, with its
            result-oriented background and time-tested experience, is fully
            equipped to meet those aspirations.
            <br />
            <br />
            For over two decades, our faculty has skillfully catered to the
            demands of IIT hopefuls who wish to make it big in life.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/about/class.webp"
            alt="Students at RB IIT Academy"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
      </section>

      {/* Founder Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 py-16">
        <div className="md:w-1/2">
          <Image
            src="/about/founder.jpg"
            alt="Mr. Ram Brahmam"
            width={500}
            height={500}
            className="rounded-lg shadow-xl object-cover w-full"
          />
        </div>
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl font-bold text-white">About the Founder</h2>
          <p className="text-gray-400 leading-relaxed">
            Mr. Ram Brahmam is a highly accomplished mathematician, holding a
            Post-Graduate degree in Mathematics from the prestigious Hyderabad
            Central University. With over two decades of teaching experience,
            he’s revered for his ability to simplify complex mathematical
            concepts through innovative methods.
          </p>
          <p className="text-gray-400 leading-relaxed">
            His career highlights include guiding multiple top state and
            national rankers, authoring acclaimed books like{" "}
            <i>Contemporary College Mathematics</i> and
            <i> Conquering Mathematics</i>, and nurturing a student-friendly
            environment that inspires academic excellence.
          </p>
          <blockquote className="border-l-4 border-[#FFDD57] pl-4 italic text-gray-500">
            “I take great joy in teaching physics and mathematics, helping
            students strengthen their problem-solving skills and achieve top
            results in exams like Mains, Advanced, and NEET.”
          </blockquote>
        </div>
      </section>

      {/* Rankers Section */}
      <section className="bg-gray-50 px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Meet Our Best Rankers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              img: "/about/rank-img1.jpeg",
              name: "P. Anurag Reddy",
              rank: "All India IIT Advanced Rank 36",
            },
            {
              img: "/about/rank-img2.jpeg",
              name: "Nikhil",
              rank: "All India 1 Rank in Amrita Engineering Entrance Exam",
            },
            {
              img: "/about/rank-img3.jpeg",
              name: "Asif Khan",
              rank: "Scored 987/1000 in TS BOARD IPE Exam",
            },
            {
              img: "/about/rank-img4.jpeg",
              name: "Siddharth",
              rank: "JEE Mains 4th Rank",
            },
          ].map((ranker, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={ranker.img}
                alt={ranker.name}
                width={200}
                height={200}
                className="rounded-full mx-auto border-4 border-[#FFDD57] object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {ranker.name}
              </h3>
              <p className="text-gray-600">{ranker.rank}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFDD57] py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Join the Best?
        </h2>
        <p className="mt-4 text-gray-800 max-w-xl mx-auto">
          Join thousands of students who have trusted RB IIT Academy for their
          IIT & NEET journey.
        </p>
        <button
          onClick={handleEnrollClick}
          className="mt-6 px-8 py-3 bg-gray-900 text-[#FFDD57] font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Enroll Now
        </button>
        <ModalHeadlessUi isOpen={isModalOpen} onClose={handleCloseModal}>
          <EnrollForm onClose={handleCloseModal} />
        </ModalHeadlessUi>
      </section>
    </div>
  );
}
