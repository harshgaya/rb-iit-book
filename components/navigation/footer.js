import { SOCIAL_LINKS } from "@/lib/utils/constants";
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Globe,
  Twitter,
  X,
} from "lucide-react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              {/* <BookOpen className="h-6 w-6 text-yellow-400" /> */}
              {/* <h2 className="text-xl font-semibold text-white">
                {SOCIAL_LINKS.FOOTER_TEXT1 || "RB Books"}
              </h2> */}
              <Image src={"/logo.jpeg"} alt="logo" height={80} width={80} />
            </div>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              {SOCIAL_LINKS.FOOTER_TEXT2 ||
                "Providing quality educational books and materials for students and institutions across India."}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <span>
                  TELANGANA GRAMEENA BANK, near Fever Hospital Main Road,
                  <br />
                  New Nallakunta, Hyderabad, Telangana 500044
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <a
                  href="tel:+919030565621"
                  className="hover:text-yellow-400 transition"
                >
                  +91 90305 65621
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-yellow-400" />
                <a
                  href="mailto:rbiitacademy@gmail.com"
                  className="hover:text-yellow-400 transition"
                >
                  rbiitacademy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-yellow-400" />
                <a
                  href="https://www.rbiitacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition"
                >
                  www.rbiitacademy.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Privacy + Terms */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Follow Us
            </h3>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              <a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <a
                href="/privacy-policy"
                className="hover:text-yellow-400 transition"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-yellow-400 transition">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            {SOCIAL_LINKS.FOOTER_COPYRIGHT ||
              `© ${new Date().getFullYear()} RP Books. All rights reserved.`}
          </p>
          <p className="mt-2">
            Developed by{" "}
            <a
              href="http://softplix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-500 font-medium"
            >
              Softplix.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
