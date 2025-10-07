import ImageSlider from "@/components/home/image-slider";
import TestimonialsPage from "@/components/home/testimonials";
import WhyRBBooksPage from "@/components/home/why-rb-books";
import ProductsHome from "@/components/home/products";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="">
      <ImageSlider />
      <WhyRBBooksPage />
      <TestimonialsPage />
      <ProductsHome />
    </div>
  );
}
