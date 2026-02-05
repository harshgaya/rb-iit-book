"use client";

import ContactForm from "@/components/modal/contact-form";
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="w-full bg-gradient-to-br from-yellow-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Book orders, school bulk enquiries & distributor contact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT INFO */}
          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
            <div className="flex gap-4">
              <MapPin className="text-yellow-500 w-6 h-6 mt-1" />
              <p className="text-gray-700">
                TELANGANA GRAMEENA BANK, near Fever Hospital Main Road,
                <br />
                New Nallakunta, Hyderabad, Telangana 500044
              </p>
            </div>

            <div className="flex gap-4">
              <Phone className="text-yellow-500 w-6 h-6 mt-1" />
              <p className="font-semibold text-gray-800">+91 90305 65621</p>
            </div>

            <a href={SOCIAL_LINKS.EMAIL} className="flex gap-4">
              <Mail className="text-yellow-500 w-6 h-6 mt-1" />
              <p className="text-gray-700">rbiitacademy@gmail.com</p>
            </a>
            <a href={SOCIAL_LINKS.WHATSAPP} className="flex gap-4">
              <MessageCircle className="text-yellow-500 w-6 h-6 mt-1" />
              <p className="text-gray-700">+91 90305 65621</p>
            </a>

            {/* CTA */}
            <div className="bg-yellow-400 text-white rounded-2xl p-6 mt-6">
              <h3 className="text-xl font-bold mb-2">
                Bulk Orders for Schools
              </h3>
              <p className="text-sm opacity-95">
                Contact us for school & distributor bulk pricing for Class 6–10
                books.
              </p>
            </div>
          </div>

          {/* RIGHT FORM (same as modal form) */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
