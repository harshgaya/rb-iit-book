import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/footer";
import TopHeader from "@/components/navigation/top-header";
import Navbar from "@/components/navigation/navbar";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "react-hot-toast";
import FloatingWhatsAppButton from "@/components/navigation/floating_whatsapp_button";
import ClientTracker from "@/components/navigation/client-track";
import FloatingContactButtons from "@/components/navigation/floating-button";
import PixelInit from "@/components/home/pixel-init";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://iitneetbooks.com/"),
  title: "IIT NEET Books | Best Books for IIT-JEE & NEET Preparation",
  description:
    "Buy the best IIT-JEE and NEET preparation books with structured content, expert-designed material, and proven results. IIT NEET Books provides high-quality study resources for JEE, NEET & EAMCET aspirants. Start your preparation with the right books today.",
  keywords:
    "IIT NEET Books, JEE Books, NEET Books, Best Books for IIT JEE, NEET Preparation Books, EAMCET Books, IIT Study Material, Medical Entrance Books, Engineering Entrance Books, Competitive Exam Books India",
  authors: [{ name: "IIT NEET Books", url: "https://iitneetbooks.com/" }],
  creator: "IIT NEET Books",

  openGraph: {
    title: "IIT NEET Books | Best Books for IIT-JEE & NEET Preparation",
    description:
      "Get top-quality IIT-JEE, NEET & EAMCET preparation books with expert-curated content. Start your success journey with IIT NEET Books.",
    url: "https://iitneetbooks.com/",
    type: "website",
    siteName: "IIT NEET Books",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "IIT NEET Books Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@iitneetbooks",
    title: "IIT NEET Books | IIT-JEE & NEET Study Material",
    description:
      "Best books for IIT-JEE, NEET & EAMCET preparation. Structured content, expert material, and proven results.",
    images: ["/logo.jpeg"],
  },

  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },

  alternates: {
    canonical: "https://iitneetbooks.com/",
    languages: {
      en: "https://iitneetbooks.com/",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PixelInit />
        <CartProvider>
          <TopHeader />
          <ClientTracker />
          <Navbar />
          {children}
          <FloatingContactButtons />
          <Toaster
            position="bottom-center"
            reverseOrder={false} // newer toasts appear below older ones
          />
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
