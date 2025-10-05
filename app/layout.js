import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/navigation/footer";
import TopHeader from "@/components/navigation/top-header";
import Navbar from "@/components/navigation/navbar";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RB IIT-NEET Books",
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
          <Navbar />
          {children}
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
