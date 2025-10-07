// app/components/Footer.tsx
import { SOCIAL_LINKS } from "@/lib/utils/constants";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  BookOpen,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">
                {SOCIAL_LINKS.FOOTER_TEXT1}
              </h2>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              {SOCIAL_LINKS.FOOTER_TEXT2}
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div> */}

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
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
                href={SOCIAL_LINKS.YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          {SOCIAL_LINKS.FOOTER_COPYRIGHT ||
            `© ${new Date().getFullYear()} RB Books. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
