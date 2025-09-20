// app/components/TopHeader.tsx
import { Facebook, Instagram, Youtube, MessageSquare } from "lucide-react";
import { SOCIAL_LINKS } from "@/utils/constants";

export default function TopHeader() {
  return (
    <div className="bg-[#FFDD57] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Left text */}
          <div className="hidden sm:block text-sm font-medium">
            {SOCIAL_LINKS.TOP_HEADER_TEXT}
          </div>

          {/* Right social icons */}
          <div className="flex space-x-4">
            <a
              href={SOCIAL_LINKS.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
            >
              <Youtube size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors"
            >
              <MessageSquare size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
