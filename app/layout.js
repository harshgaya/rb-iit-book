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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RP IIT-NEET Books",
  description: "The best books for IIT and NEET preparation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
