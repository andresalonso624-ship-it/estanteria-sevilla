import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BottomFeatures from "@/components/home/BottomFeatures";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>

        <Hero />

        <FeaturedProducts />

        <BottomFeatures />

        <ContactSection />

      </main>

      <Footer />

    </>
  );
}