import ImageSlider from "@/components/home/image-slider";
import TestimonialsPage from "@/components/home/testimonials";
import WhyRBBooksPage from "@/components/home/why-rb-books";
import ProductsHome from "@/components/home/products";
import BulkOrder from "@/components/home/bulk-order";
import Hero from "@/components/home/hero";
import IITFoundation from "@/components/home/about-iit-neet-foundation";
import HeroNew from "@/components/home/hero-new";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="">
      {/* <ImageSlider /> */}
      {/* <Hero /> */}
      <HeroNew />
      <IITFoundation />
      <WhyRBBooksPage />
      <BulkOrder />
      <TestimonialsPage />
      <ProductsHome />
    </div>
  );
}
